import Bus from '../bus';
const uuidv4 = require('uuid/v4');
var moment = require('moment');
var bus = Bus();

bus.subscribe("LogFormFilled", saveLog);

function saveLog(state) {
    return fetch('http://localhost:2113/streams/diary-input', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/vnd.eventstore.events+json'
        },
        body: JSON.stringify(
            buildBody(state)
        )
    }).then(response => {
      bus.publish("LogSucceed", "Logs sent correctly");
    }).catch(err => {
      bus.publish("LogErroed", err);
    });
}

function buildBody(state) {    
    var profileName = localStorage.getItem('profileName');
    var profileNickname = localStorage.getItem('profileNickname');
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
          comment: cleanString(state.comment),
          profileName: profileName,
          profileNickname: profileNickname
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