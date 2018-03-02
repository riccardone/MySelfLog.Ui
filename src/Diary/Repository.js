import Bus from '../bus';
import { toast } from 'react-toastify';
var moment = require('moment');

var bus = Bus();
var bufferedLogs = [];
var interval = 3000;
var apiLink = "http://myselflog-api:5001";

bus.subscribe("LogFormFilled", saveLog);
bus.subscribe("CreateDiary", createDiary);
bus.subscribe("GetDiaryName", getDiaryName);
bus.subscribe("SearchForDuplicates", searchForDuplicates);

function createDiary(obj) {
  var messageBody = buildCreateDiaryBody(obj);
  return fetch(apiLink + "/api/v1/diary", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      messageBody
    )
  }).then((response) => {
    bus.publish("DiaryCreated", "Diary '" + obj.diaryName + "' created");
  }).catch(err => {
    bufferedLogs.push(messageBody);
    bus.publish("LogErroed", err.message + " - Retrying to send this log in " + interval / 1000 + " seconds...");
  });
}

function searchForDuplicates(diaryName) {
  return fetch(apiLink + "/api/v1/diary/check/" + diaryName, {
    method: 'GET'
  }).then((resp) => {
    if (resp.ok === false) {
      bus.publish("error", "network problem");
    } else {
      return resp.text();
    }
  }).then((a) => {
    if (a === "available") {
      bus.publish("DiaryNameIsAvailable", diaryName);
    } else {
      bus.publish("DiaryNameIsNotAvailable", diaryName);
    }
  }).catch(err => {
    //bus.publish("SecurityLinkNotFound", err);
    console.log(err);
  });
}

function getDiaryName() {
  return fetch(apiLink + "/api/v1/diary/" + localStorage.getItem('profileName'), {
    method: 'GET'
  }).then(res => {
    if (res.ok === false) { 
      bus.publish("DiaryNotFound", res.statusText);
    } else {
      return res.json();
    }
  }).then((d) => {
    if (d) {
      bus.publish("DiaryFound", d.DiaryName);
    }
  }).catch(err => {
    bus.publish("error", err);
  });
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
  return fetch(apiLink + "/api/v1/logs", {
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
    diaryName: obj.diaryName,
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