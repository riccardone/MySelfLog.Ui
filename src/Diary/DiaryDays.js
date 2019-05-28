import React from 'react';
import DiaryDay from "./DiaryDay";

export default function DiaryDays(props) {
  let key = 0;
  const urls = props.days.map(diaryDay => (
    <DiaryDay
      key={key++}
      day={diaryDay}
      iframeHeigh={props.iframeHeigh}
      series={props.series}
    />
  ));
  return (
    <ul className="list-group">{urls}</ul>
  );
}