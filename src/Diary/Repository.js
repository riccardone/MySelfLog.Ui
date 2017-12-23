import Bus from '../bus';
var cfg = require('../config');
const uuidv5 = require('uuid/v5');
const uuidv4 = require('uuid/v4');
var moment = require('moment');

// Save carefully this namespace as you'll need it in the future to get the same deterministic ids
const my_namespace = 'f11c5317-06bb-47ad-b589-2b8e8332decd';
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
    return fetch(cfg.eventstoreConnection + '/streams/' + cfg.publishTo, {
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
  
  var profileNickname = localStorage.getItem('profileNickname');
  return [
    {
      "eventId": uuidv4(),
      "eventType": "MySelfLogValueReceived",
      "data": {
        value: state.value,
        mmolvalue: state.mmolvalue,
        slowTerapy: state.slowTerapy,
        fastTerapy: state.fastTerapy,
        calories: state.calories,
        comment: cleanString(state.comment)       
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
    var profileName = localStorage.getItem('profileName');
    return uuidv5(profileName, my_namespace);
  }
}