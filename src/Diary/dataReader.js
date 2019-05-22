var apiLink =
  process.env.NODE_ENV === "production"
    ? "http://api.myselflog.com:5001"
    : "http://myselflog-api:5001";

module.exports = function() {
  function searchForADay(day) {
    var uri =
      apiLink +
      "/api/v1/diary/" +
      day.diaryName +
      "/" +
      day.diaryType +
      "/" +
      day.diaryFormat +
      "/from/" +
      day.from +
      "/to/" +
      day.to +
      "";
    return fetch(uri, {
      method: "GET"
    }).then(resp => {
      if (resp.ok === true) {
        return resp.json().then(body => {
          body["from"] = day.from;
          body["to"] = day.to;
          return body;
        });
      } else {
        console.log("response is not ok");
        return null;
      }
    });
  }

  return {
    searchForADay: searchForADay
  };
};
