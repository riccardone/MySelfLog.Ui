import React from "react";
import {
  Grid,
  Row,
  Col,
  ButtonGroup,
  Button,
  Glyphicon
} from "react-bootstrap";
import Switch from "react-toggle-switch";
import Bus from "../bus";
import moment from "moment";
import "react-toggle-switch/dist/css/switch.min.css";
var bus = Bus();

class DiaryReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAvailable: false,
      iframeKey: 0,
      iframeHeigh: 800,
      switched: true,
      intervalId: this.setAutoRefresh(),
      from: moment()
        .startOf("day")
        .format("YYYY-MM-DD HH:mm:ss"),
      to: moment()
        .endOf("day")
        .format("YYYY-MM-DD HH:mm:ss"),
      diaryName: this.props.diaryName,
      diaryFormat: "mgdl",
      diaryType: "all"
    };
    // preserve the initial state in a new object
    this.baseState = this.state;
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.getSelectedDate = this.getSelectedDate.bind(this);
    this.subscribeForEvents();
  }

  handlePrev() {
    var day = moment(this.state.from).subtract(1, "days");
    this.setState({
      from: day.startOf("day").format("YYYY-MM-DD HH:mm:ss"),
      to: day.endOf("day").format("YYYY-MM-DD HH:mm:ss")
    });
  }

  handleNext() {
    var day = moment(this.state.from).add(1, "days");
    this.setState({
      from: day.startOf("day").format("YYYY-MM-DD HH:mm:ss"),
      to: day.endOf("day").format("YYYY-MM-DD HH:mm:ss")
    });
  }

  mmol = () => {
    var _this = this;
    _this.setState({ diaryFormat: "mmol" });
  };

  mgdl = () => {
    var _this = this;
    _this.setState({ diaryFormat: "mgdl" });
  };

  toggleSwitch = () => {
    var _this = this;
    var switched = !_this.state.switched;
    if (!switched) {
      clearInterval(_this.state.intervalId);
    } else {
      _this.setState({
        intervalId: _this.setAutoRefresh()
      });
    }
    _this.setState({ switched: switched });
  };

  setAutoRefresh() {
    return setInterval(
      () => this.setState(s => ({ iframeKey: s.iframeKey + 1 })),
      10000
    );
  }

  subscribeForEvents = () => {
    bus.subscribe("DiaryCreated", this.handleDiaryCreated);
  };

  getSelectedDate = () => {
    var locale = window.navigator.userLanguage || window.navigator.language;
    return moment(this.state.from)
      .locale(locale)
      .format("LL"); //'YYYY-MM-DD');
  };

  render() {
    function getLink(diaryName, diaryType, diaryFormat, from, to) {
      return (
        "http://myselflog-reports:5005/diary/" +
        diaryName +
        "/" +
        diaryType +
        "/" +
        diaryFormat +
        "/from/" +
        from +
        "/to/" +
        to +
        ""
      );
    }

    var diaryLink = getLink(
      this.state.diaryName,
      this.state.diaryType,
      this.state.diaryFormat,
      this.state.from,
      this.state.to
    );

    const divStyle = {
      margin: "0px",
      border: "0px"
    };

    const styles = {
      horizontalUl: {
        listStyleType: "none",
        margin: "0",
        padding: "0"
      },
      horizontalLi: {
        display: "inline",
        textAlign: "center",
        margin: "2px"
      },
      divStyle: {
        margin: "0px",
        border: "0px"
      }
    };

    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col xs={4} md={4}>
              <ul id="dateSelector" style={styles.horizontalUl}>
                <li style={styles.horizontalLi}>
                  <Button
                    id="previousDate"
                    bsStyle="info"
                    onClick={this.handlePrev}
                  >
                    <Glyphicon glyph="chevron-left" />
                  </Button>
                </li>
                <li style={styles.horizontalLi}>
                  <span id="selectedDate">{this.getSelectedDate()}</span>
                </li>
                <li style={styles.horizontalLi}>
                  <Button
                    id="nextDate"
                    bsStyle="info"
                    onClick={this.handleNext}
                  >
                    <Glyphicon glyph="chevron-right" />
                  </Button>
                </li>
              </ul>
            </Col>
            <Col xs={4} md={4}>
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
                  mg/dL
                </Button>
              </ButtonGroup>
            </Col>
            <Col xs={4} md={4}>
              <div>
                <span>Autorefresh</span>
              </div>
              <div>
                <Switch onClick={this.toggleSwitch} on={this.state.switched} />
              </div>
            </Col>
          </Row>
          <Row className="show-grid">
            <Col>
              <iframe
                title="diary report"
                style={divStyle}
                key={this.state.iframeKey}
                src={diaryLink}
                height={this.state.iframeHeigh}
                width="100%"
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default DiaryReport;
