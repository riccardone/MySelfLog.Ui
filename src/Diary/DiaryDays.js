import React, { Component } from "react";
import DiaryDay from "./DiaryDay";

class DiaryDays extends Component {
  render() {
    let key = 0;
    const urls = this.props.days.map(diaryDay => (
      <DiaryDay
        key={key++}
        day={diaryDay}
        iframeHeigh={this.props.iframeHeigh}
      />
    ));
    return <ul className="list-group">{urls}</ul>;
  }
}

export default DiaryDays;
