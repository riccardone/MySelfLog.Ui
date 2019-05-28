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

class DiaryReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    // preserve the initial state in a new object
    this.baseState = this.state;
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.getSelectedDate = this.getSelectedDate.bind(this);
    this.subscribeForEvents();
  }

  handlePrev = () => {
    this.changeDay("prev");
  };

  handleNext = () => {
    this.changeDay("next");
  };

  changeDay(direction) {
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

  sevenDays = () => {
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
  };

  setAll = () => {
    var _this = this;
    _this.setState({ diaryType: "all" });
  };

  setTerapies = () => {
    var _this = this;
    _this.setState({ diaryType: "terapies" });
  };

  setValues = () => {
    var _this = this;
    _this.setState({ diaryType: "values" });
  };

  setCalories = () => {
    var _this = this;
    _this.setState({ diaryType: "calories" });
  };

  mmol = () => {
    var _this = this;
    _this.setState({ diaryFormat: "mmol" });
  };

  mgdl = () => {
    var _this = this;
    _this.setState({ diaryFormat: "mgdl" });
  };

  subscribeForEvents = () => {
    bus.subscribe("DiaryCreated", this.handleDiaryCreated);
  };

  getSelectedDate = () => {
    var _this = this;
    var locale = window.navigator.userLanguage || window.navigator.language;
    return _this.state.from.locale(locale).format("YYYY-MM-DD"); //'LL');
  };

  getDiaryDays = (from, to, diaryName, diaryType, diaryFormat) => {
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
  };

  render() {
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
                    onClick={this.handlePrev}
                  >
                    <Glyphicon glyph="chevron-left" />
                  </Button>
                  <Button>
                    <span id="selectedDate">{this.getSelectedDate()}</span>
                  </Button>
                  <Button
                    id="nextDate"
                    bsStyle="info"
                    onClick={this.handleNext}
                  >
                    <Glyphicon glyph="chevron-right" />
                  </Button>
                  <Button
                    onClick={this.sevenDays}
                    className={
                      this.state.period === "7days" ? "selected" : "unselected"
                    }
                  >
                    7 days
                  </Button>
                </ButtonGroup>

                <ButtonGroup>
                  <Button
                    onClick={this.mmol}
                    className={
                      this.state.diaryFormat === "mmol"
                        ? "selected"
                        : "unselected"
                    }
                  >
                    mmol/L
                  </Button>
                  <Button
                    onClick={this.mgdl}
                    className={
                      this.state.diaryFormat === "mgdl"
                        ? "selected"
                        : "unselected"
                    }
                  >
                    mg/dL&nbsp;
                  </Button>
                </ButtonGroup>

                <ButtonGroup>
                  <Button
                    onClick={this.setAll}
                    className={
                      this.state.diaryType === "all" ? "selected" : "unselected"
                    }
                  >
                    All
                  </Button>
                  <Button
                    onClick={this.setTerapies}
                    className={
                      this.state.diaryType === "terapies"
                        ? "selected"
                        : "unselected"
                    }
                  >
                    Terapies
                  </Button>
                  <Button
                    onClick={this.setCalories}
                    className={
                      this.state.diaryType === "calories"
                        ? "selected"
                        : "unselected"
                    }
                  >
                    Cals
                  </Button>
                  <Button
                    onClick={this.setValues}
                    className={
                      this.state.diaryType === "values"
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
          <DiaryDays days={this.state.days} iframeHeigh={700} series={[{'name': 'Glucose Level', 'data': chartData}, {'name': 'Terapies', 'data': chartData2}]} />
        </Grid>
      </div>
    );
  }
}

export default DiaryReport;
