import React from "react";
import {
  Grid,
  Row,
  Col,
  ButtonGroup,
  Button,
  Glyphicon,
  ButtonToolbar
} from "react-bootstrap";
import Bus from "../bus";
import moment from "moment";
import DiaryDays from "./DiaryDays";
import DataReader from "./dataReader";
import "react-toggle-switch/dist/css/switch.min.css";
var bus = Bus();
// TODO import the elasticSearch repo and inject to subcomponent or import in a subcomponent?
var reader = new DataReader();

const chartData = [
  { value: 14, time: 1503617297689 },
  { value: 15, time: 1503616962277 },
  { value: 15, time: 1503616882654 },
  { value: 20, time: 1503613184594 },
  { value: 15, time: 1503611308914 }
];

const chartData2 = [
  { value: 5, time: 1503617297689 },
  { value: 7, time: 1503616962277 },
  { value: 10, time: 1503616882654 },
  { value: 6, time: 1503613184594 },
  { value: 3, time: 1503611308914 }
];

export default function DiaryReport(props) {
  var state = {
    isAvailable: false,
    switched: true,
    from: moment().startOf("day"),
    to: moment().endOf("day"),
    diaryName: this.props.diaryName,
    diaryFormat: "mgdl",
    diaryType: "all",
    days: this.getDiaryDays(
      moment().startOf("day"),
      moment().endOf("day"),
      this.props.diaryName,
      "all",
      "mgdl"
    )
  };

  subscribeForEvents();

  function handlePrev() {
    changeDay("prev");
  }

  function handleNext() {
    changeDay("next");
  }

  function changeDay(direction) {
    var _this = this;
    var day =
      direction === "prev"
        ? moment(this.state.from).subtract(1, "days")
        : moment(this.state.from).add(1, "days");
    _this.setState({
      from: day.startOf("day"),
      to: day.endOf("day"),
      days: _this.getDiaryDays(
        day.startOf("day"),
        day.endOf("day"),
        _this.state.diaryName,
        _this.state.diaryType,
        _this.state.diaryFormat
      )
    });
  }

  function sevenDays() {
    var _this = this;
    var from = moment().subtract(7, "days");
    var to = moment();
    _this.setState({
      from: from.startOf("day"),
      to: to.endOf("day"),
      days: _this.getDiaryDays(
        from,
        to,
        _this.state.diaryName,
        _this.state.diaryType,
        _this.state.diaryFormat
      )
    });
  }

  function setAll() {
    var _this = this;
    _this.setState({ diaryType: "all" });
  }

  function setTerapies() {
    var _this = this;
    _this.setState({ diaryType: "terapies" });
  }

  function setValues() {
    var _this = this;
    _this.setState({ diaryType: "values" });
  }

  function setCalories() {
    var _this = this;
    _this.setState({ diaryType: "calories" });
  }

  function mmol() {
    var _this = this;
    _this.setState({ diaryFormat: "mmol" });
  }

  function mgdl() {
    var _this = this;
    _this.setState({ diaryFormat: "mgdl" });
  }

  function subscribeForEvents() {
    bus.subscribe("DiaryCreated", this.handleDiaryCreated);
  }

  function getSelectedDate() {
    var _this = this;
    var locale = window.navigator.userLanguage || window.navigator.language;
    return _this.state.from.locale(locale).format("YYYY-MM-DD"); //'LL');
  }

  function getDiaryDays(from, to, diaryName, diaryType, diaryFormat) {
    var diaryDays = [];
    var day = from;
    addLink(day, diaryName, diaryType, diaryFormat);
    do {
      if (day.isSame(to, "day")) {
        break;
      }
      day.add(1, "day");
      addLink(day, diaryName, diaryType, diaryFormat);
    } while (!day.isSame(to, "day"));

    return diaryDays;

    function addLink(day, diaryName, diaryType, diaryFormat) {
      diaryDays.push({
        from: day.startOf("day").format("YYYY-MM-DD HH:mm:ss"),
        to: day.endOf("day").format("YYYY-MM-DD HH:mm:ss"),
        diaryName: diaryName,
        diaryType: diaryType,
        diaryFormat: diaryFormat
      });
    }
  }

  return (
    <div>
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={12}>
            <ButtonToolbar>
              <ButtonGroup>
                <Button
                  id="previousDate"
                  bsStyle="info"
                  onClick={handlePrev}
                >
                  <Glyphicon glyph="chevron-left" />
                </Button>
                <Button>
                  <span id="selectedDate">{getSelectedDate()}</span>
                </Button>
                <Button
                  id="nextDate"
                  bsStyle="info"
                  onClick={handleNext}
                >
                  <Glyphicon glyph="chevron-right" />
                </Button>
                <Button
                  onClick={sevenDays}
                  className={
                    state.period === "7days" ? "selected" : "unselected"
                  }
                >
                  7 days
                  </Button>
              </ButtonGroup>

              <ButtonGroup>
                <Button
                  onClick={mmol}
                  className={
                    state.diaryFormat === "mmol"
                      ? "selected"
                      : "unselected"
                  }
                >
                  mmol/L
                  </Button>
                <Button
                  onClick={mgdl}
                  className={
                    state.diaryFormat === "mgdl"
                      ? "selected"
                      : "unselected"
                  }
                >
                  mg/dL&nbsp;
                  </Button>
              </ButtonGroup>

              <ButtonGroup>
                <Button
                  onClick={setAll}
                  className={
                    state.diaryType === "all" ? "selected" : "unselected"
                  }
                >
                  All
                  </Button>
                <Button
                  onClick={setTerapies}
                  className={
                    state.diaryType === "terapies"
                      ? "selected"
                      : "unselected"
                  }
                >
                  Terapies
                  </Button>
                <Button
                  onClick={setCalories}
                  className={
                    state.diaryType === "calories"
                      ? "selected"
                      : "unselected"
                  }
                >
                  Cals
                  </Button>
                <Button
                  onClick={setValues}
                  className={
                    state.diaryType === "values"
                      ? "selected"
                      : "unselected"
                  }
                >
                  Glucose Level
                  </Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Col>
        </Row>
        <DiaryDays days={state.days} iframeHeigh={700} series={[{ 'name': 'Glucose Level', 'data': chartData }, { 'name': 'Terapies', 'data': chartData2 }]} />
      </Grid>
    </div>
  );
}
