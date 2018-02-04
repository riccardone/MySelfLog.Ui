import React, { Component } from 'react';
import { Grid, Row, Col, ControlLabel } from 'react-bootstrap';
import Bus from '../bus';
import DiaryLog from './DiaryLog';
import CreateDiary from './CreateDiary';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../App.css';
var bus = Bus();

class Diary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diaryName: ''
    };
    // preserve the initial state in a new object
    this.baseState = this.state;
    this.subscribeForEvents();
  }

  componentDidMount() {
    if (this.props.auth) {
      bus.publish("GetDiaryName");
    }
  }

  subscribeForEvents = () => {
    var _this = this;
    bus.subscribe("DiaryFound", (diaryName) => {
      _this.setState({
        diaryName: diaryName
      });
    });
    bus.subscribe("DiaryNotFound", (data) => {
      //toast.error("Diary not found " + data)
    });
    bus.subscribe("error", (err) => {
      if (err && err.message) {
        toast.error(err.message);
      } else {
        toast.error(err);
      }
    })
  }

  // redux action (TODO)
  addLog(log) {
    return { type: 'LogValue', title: log.title };
  }

  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const divStyleForLinkRow = {
      paddingTop: '40px'
    };

    function ShowDiaryLog(props) {
      if (props.diaryName) {
        return <DiaryLog />
      } else {
        return <p></p>;
      }
    }

    function ShowCreateDiary(props) {
      if (props.diaryName) {
        return <DiaryLink diaryName={props.diaryName} />
      } else {
        return <CreateDiary />
      }
    }

    function DiaryLink(props) {
      return <Grid>
        <Row>
          <Col xs={6} md={6} lg={6} style={divStyleForLinkRow}>            
            <ControlLabel>Link</ControlLabel><br />
            <a target="_blank" href={'http://api.myselflog.com/diary/' + props.diaryName + '/all/mgdl'}>Show '{props.diaryName}' diary</a>
          </Col>
        </Row>
      </Grid> 
    }

    return (
      <div className="container">
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
        />
        {
          isAuthenticated() && (
            <div>
              <ShowDiaryLog diaryName={this.state.diaryName} />
              <ShowCreateDiary diaryName={this.state.diaryName} />
            </div>
          )
        }
        {
          !isAuthenticated() && (
            <h4>
              You are not logged in! Please{' '}
              <a
                style={{ cursor: 'pointer' }}
                onClick={this.login.bind(this)}
              >
                Log In
                </a>
              {' '}to continue.
              </h4>
          )
        }
      </div>
    );
  }
}

export default Diary;