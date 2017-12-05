import Bus from '../bus';
const uuidv4 = require('uuid/v4');
var moment = require('moment');
var bus = Bus();
var bufferedLogs = [];
var interval = 3000;

bus.subscribe("LogFormFilled", saveLog);

function saveLog(state) {
  var messageBody = buildBody(state);
  return sendLog(messageBody).then(response => {
    bus.publish("LogSucceed", "Log sent correctly");
  }).catch(err => {
    bufferedLogs.push(messageBody);
    bus.publish("LogErroed", err.message + " - Retrying to send this log in " + interval/1000 + " seconds...");
  });
}

setInterval(function () {
  for (let [index, messageBody] of bufferedLogs.entries()) {
    if(!messageBody) continue;    
    sendLog(messageBody).then(response => {      
      bufferedLogs[index] = null;
      console.log("Log sent correctly");
    }).catch(err => {
      console.log("Fetch still not working! Retrying in " + interval/1000 + " seconds...");      
    });
  }  
}, interval);

function sendLog(body) {
  // return fetch('http://178.62.84.102:2113/streams/diary-input', {
    return fetch('http://localhost:2113/streams/diary-input', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/vnd.eventstore.events+json'
    },
    body: JSON.stringify(
      body
    )
  });
}

function buildBody(state) {
  // var profileName = localStorage.getItem('profileName');
  // var profileNickname = localStorage.getItem('profileNickname');
  return [
    {
      "eventId": uuidv4(),
      "eventType": "SelfLogValueReceived",
      "data": {
        value: state.value,
        mmolvalue: state.mmolvalue,
        slowTerapy: state.slowTerapy,
        fastTerapy: state.fastTerapy,
        calories: state.calories,
        comment: cleanString(state.comment)
        // profileName: profileName,
        // profileNickname: profileNickname
      },
      "metadata": {
        applies: moment.utc().toDate().toUTCString(),
        reverses: null,
        source: 'myselflog-ui',
        $correlationId: getCorrelationId()
      }
    }
  ];

  function cleanString(str) {
    // Remove uri's and illegal chars
    return str.replace(/(?:https?|ftp):\/\/[\n\S]+/g, "").replace(/[|&;$%@"<>()+,]/g, "");
  }

  function getCorrelationId() {
    return localStorage.getItem('profileId').replace("|", "_");
  }
}