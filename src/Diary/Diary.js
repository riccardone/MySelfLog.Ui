import React, { Component } from 'react';
import { Button, Grid, Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import Bus from '../bus';
import DiaryLog from './DiaryLog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../App.css';
var bus = Bus();

class Diary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      securityLink: ''
    };
    // preserve the initial state in a new object
    this.baseState = this.state;
    this.subscribeForEvents();
  }

  componentDidMount() {

  }

  subscribeForEvents = () => {
    var _this = this;
    bus.subscribe("SecurityLinkFound", (data) => {
      _this.setState({
        securityLink: data
      });
    });
    bus.subscribe("SecurityLinkNotFound", (data) => {
      toast.error("Security Link not found")
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
    const divStyleForSecurityLinkRow = {
      paddingTop: '40px'
    };

    function SecurityLink(props) {
      if (props.securityLink) {
        return
        <Grid>
          <Row>
            <Col xs={2} md={2} lg={2} style={divStyleForSecurityLinkRow}>
              Your Diary Link
          </Col>
            <Col xs={10} md={10} lg={10} style={divStyleForSecurityLinkRow}>
              <a>http://www.myselflog.com/diary/{props.securityLink}</a>
            </Col>
          </Row>
        </Grid>
      } else {
        return <p>Diary doesn't exist yet</p>;
      }
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
              <DiaryLog />
              <SecurityLink securityLink={this.state.securityLink} />
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