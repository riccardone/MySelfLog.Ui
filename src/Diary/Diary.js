import React, { Component } from 'react';
import NavBarTop from '../navbar.top';
import Footer from '../footer';
import Bus from '../bus';
import DiaryLog from './DiaryLog';
import DiaryLink from './DiaryLink';
import DiaryReport from './DiaryReport';
import CreateDiary from './CreateDiary';
import { ToastContainer, toast } from 'react-toastify';
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
    });
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

    function ShowDiaryLog(props) {
      if (props.diaryName) {
        return <DiaryLog />;
      } else {
        return <p />;
      }
    }

    function ShowCreateDiary(props) {
      if (props.diaryName) {
        return (<div>
          <DiaryLink diaryName={props.diaryName} />
          <DiaryReport diaryName={props.diaryName} />
        </div>);
      } else {
        return <CreateDiary />;
      }
    }

    return (
      <div>
        <NavBarTop auth={this.props.auth} {...this.props} />
        <div className="container">
          <ToastContainer
              hideProgressBar
              newestOnTop
          />
          {
            isAuthenticated() &&
            <div>
              <ShowDiaryLog diaryName={this.state.diaryName} />
              <ShowCreateDiary diaryName={this.state.diaryName} />
              <br />
            </div>
          }
          {
            !isAuthenticated() &&
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
          }
        </div>
        <Footer />
      </div>
    );
  }
}

export default Diary;