

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
          comment: this.cleanString(state.comment),
          profileName: profileName,
          profileNickname: profileNickname
        },
        "metadata": {  
          applies: moment.utc().toDate().toUTCString(),
          reverses: null,
          source: 'myselflog-ui',
          $correlationId: this.getCorrelationId()              
        }
      }
    ];
  }