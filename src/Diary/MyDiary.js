import React from "react";
import {
  Glyphicon,
  Button,
  Grid,
  Row,
  Col,
  ButtonGroup
} from "react-bootstrap";
import Footer from "../footer";
import NavBarTopNoAuth from "../navbar.noauth.top";
import Switch from "react-toggle-switch";
import "react-toggle-switch/dist/css/switch.min.css";
import moment from "moment";
import "./mydiary.css";

class MyDiary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAvailable: false,
      iframeKey: 0,
      iframeHeigh: 700,
      switched: true,
      intervalId: this.setAutoRefresh(),
      from: moment()
        .startOf("day")
        .format("YYYY-MM-DD HH:mm:ss"),
      to: moment()
        .endOf("day")
        .format("YYYY-MM-DD HH:mm:ss"),
      diaryName: this.props.match.params.diaryname,
      diaryFormat: "mgdl",
      diaryType: "all"
    };
    // preserve the initial state in a new object
    this.baseState = this.state;
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.getSelectedDate = this.getSelectedDate.bind(this);
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

  toggleLogType = () => {
    // TODO
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

  getSelectedDate = () => {
    var locale = window.navigator.userLanguage || window.navigator.language;
    return moment(this.state.from)
      .locale(locale)
      .format("LL"); //'YYYY-MM-DD');
  };

  setAutoRefresh() {
    // https://stackoverflow.com/a/47897304
    return setInterval(
      () => this.setState(s => ({ iframeKey: s.iframeKey + 1 })),
      10000
    );
  }

  render() {
    function getLink(diaryName, diaryType, diaryFormat, from, to) {
      if (process.env.NODE_ENV === "production") {
        return (
          "http://api.myselflog.com:5005/diary/" +
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
      return (
        "http://localhost:5005/diary/" +
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
    var diaryName = this.state.diaryName;

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
        <NavBarTopNoAuth diaryName={diaryName} />
        <div className="container">
          <Grid fluid className="noPadding">
            <Row className="noMargin">
              <Col className="noPadding" xs={10} md={8} lg={8}>
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
                  <li style={styles.horizontalLi}>
                    <ButtonGroup>
                      <Button onClick={this.toggleLogType}>mmol/L</Button>
                      <Button onClick={this.toggleLogType}>mg/dL</Button>
                    </ButtonGroup>
                  </li>
                </ul>
              </Col>
              <Col className="noPadding" xs={2} md={4} lg={4}>
                <div>
                  <span>Auto Refresh</span>
                </div>
                <div>
                  <Switch
                    onClick={this.toggleSwitch}
                    on={this.state.switched}
                  />
                </div>
              </Col>
            </Row>
            <Row className="noMargin">
              <Col className="noPadding" xs={12} md={12} lg={12}>
                <iframe
                  title="diary report"
                  style={styles.divStyle}
                  key={this.state.iframeKey}
                  src={diaryLink}
                  height={this.state.iframeHeigh}
                  width="100%"
                />
              </Col>
            </Row>
          </Grid>
        </div>
        <Footer />
      </div>
    );
  }
}

export default MyDiary;
