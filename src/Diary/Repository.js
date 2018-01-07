import Bus from '../bus';
var cfg = require('../config');
var moment = require('moment');

var bus = Bus();
var bufferedLogs = [];
var interval = 3000;

bus.subscribe("LogFormFilled", saveLog);
bus.subscribe("CreateDiary", createDiary);
bus.subscribe("GetSecurityLink", getSecuritylink);

// module.exports = Repository;

// function Repository() { }

// Repository.prototype.getDiaryId = function (profile) {
//   return fetch(cfg.apiLink + cfg.path + "/" + profile, {
//     method: 'GET',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     }
//   });
// }

function createDiary(obj) {
  var messageBody = buildCreateDiaryBody(obj);
  return fetch(cfg.apiLink + "/api/v1/diary", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      messageBody
    )
  }).then((response) => {
    bus.publish("LogSucceed", "Log sent correctly");
  }).catch(err => {
    bufferedLogs.push(messageBody);
    bus.publish("LogErroed", err.message + " - Retrying to send this log in " + interval / 1000 + " seconds...");
  });
}

function getSecuritylink(profile) {
  return fetch(cfg.apiLink + "/api/v1/diary/securitylink/" + profile, {
    method: 'GET'
  }).then((resp) => {
      if (resp.status === 404) {
        bus.publish("SecurityLinkNotFound");
      }
      bus.publish("SecurityLinkFound", resp.text());
    });
    // .then(x => {
    //   this.setState({
    //     diaryId: x
    //   });
    // });
}

function saveLog(state) {
  var messageBody = buildBody(state);
  return sendLog(messageBody).then(response => {
    bus.publish("LogSucceed", "Log sent correctly");
  }).catch(err => {
    bufferedLogs.push(messageBody);
    bus.publish("LogErroed", err.message + " - Retrying to send this log in " + interval / 1000 + " seconds...");
  });
}

setInterval(function () {
  for (let [index, messageBody] of bufferedLogs.entries()) {
    if (!messageBody) continue;
    sendLog(messageBody).then(response => {
      bufferedLogs[index] = null;
      console.log("Log sent correctly");
    }).catch(err => {
      console.log("Fetch still not working! Retrying in " + interval / 1000 + " seconds...");
    });
  }
}, interval);

function sendLog(body) {
  return fetch(cfg.apiLink + cfg.path, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      body
    )
  });
}

function buildCreateDiaryBody(obj) {
  return {
    name: obj.value,
    profile: localStorage.getItem('profileName'),
    applies: moment.utc().toDate().toUTCString(),
    source: 'myselflog-ui'
  };

  function cleanString(str) {
    // Remove uri's and illegal chars
    return str.replace(/(?:https?|ftp):\/\/[\n\S]+/g, "").replace(/[|&;$%@"<>()+,]/g, "");
  }
}

function buildBody(state) {
  return {
    value: state.value,
    mmolvalue: state.mmolvalue,
    slowTerapy: state.slowTerapy,
    fastTerapy: state.fastTerapy,
    calories: state.calories,
    comment: cleanString(state.comment),
    profile: localStorage.getItem('profileName'),
    applies: moment.utc().toDate().toUTCString(),
    source: 'myselflog-ui'
  };

  function cleanString(str) {
    // Remove uri's and illegal chars
    return str.replace(/(?:https?|ftp):\/\/[\n\S]+/g, "").replace(/[|&;$%@"<>()+,]/g, "");
  }
}