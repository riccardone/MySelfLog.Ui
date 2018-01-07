import React, { Component } from 'react';
import { Button, Grid, Row, Col, FormGroup, } from 'react-bootstrap';
//import Bus from '../bus';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../App.css';
import Bus from '../bus';
var cfg = require('../config');
var bus = Bus();

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diaryId: null
    };
    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentDidMount() {
    
  }

  refreshLink = () => {
    bus.publish("RefreshSecurityLink")
  }

  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="container">
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
        />
        {
          isAuthenticated() && (
            <form onSubmit={this.handleSubmit} ref={(el) => this.myFormRef = el}>
              <h2>Settings</h2>
              <FormGroup controlId="formBasicText">
                <Grid>
                  <Row>
                    <Col xs={2} md={2} lg={2}>
                      Your Diary Link
                    </Col>
                    <Col xs={10} md={10} lg={10}>
                      <a>http://www.myselflog.com/diary/{this.state.diaryId}</a>
                    </Col>
                  </Row>
                  <Row>
                    <br />
                    <Col xs={10} md={3} lg={3}>
                      <Button bsStyle="primary" onClick={this.refreshLink}>Refresh Link</Button>
                    </Col>
                  </Row>
                </Grid>
              </FormGroup>
            </form>
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

export default Settings;