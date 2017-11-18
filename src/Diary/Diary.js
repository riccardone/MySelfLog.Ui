import React, { Component } from 'react';
import { Button, Grid, Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
//import Fetch from 'react-fetch';
import Bus from '../bus';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../App.css';
//const uuidv4 = require('uuid/v4');
//var moment = require('moment');
var bus = Bus();

bus.subscribe("LogErroed", function(err){
  toast.error(err.message);
});

bus.subscribe("LogSucceed", function(msg){
  toast.info(msg);
});

// deterministic
// const uuidv5 = require('uuid/v5');
//const MY_NAMESPACE = '<UUID fbf4a1a1-b4a3-4dfe-a01f-ec52c34e16e5>';
//uuidv5('Hello, World!', MY_NAMESPACE); // -> '90123e1c-7512-523e-bb28-76fab9f2f73d'

class Diary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      mmolvalue: '',
      slowTerapy: '',
      fastTerapy: '',
      calories: '',
      comment: ''
    };
    this.getValidationState = this.getValidationState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    // fetch('/users')
    //   .then(res => res.json())
    //   .then(users => this.setState({ users }));
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value
    });
  }

  getValidationState() {
    var isValid = true;
    const fastTerapy = this.state.value.length;

    if (this.state.value > 0 && this.state.value < 20) return 'warning: value is very low';
    else if (this.state.value < 10) return 'error: value is too low';
    else if (this.state.value > 800) return 'error: value is too high';

    if (this.state.value > 0 && this.state.mmolvalue < 2) return 'warning: mmolvalue is very low';
    else if (this.state.mmolvalue < 1) return 'error: mmolvalue is too low';
    else if (this.state.mmolvalue > 35) return 'error: mmolvalue is too high';

    if (this.state.value > 0 && this.state.slowTerapy < 3) return 'warning: slow terapy is very low';
    else if (this.state.slowTerapy < 2) return 'error: slow terapy is too low';
    else if (this.state.slowTerapy > 150) return 'error: slow terapy is too high';

    if (this.state.value > 0 && this.state.fastTerapy < 2) return 'warning: fast terapy is very low';
    else if (this.state.fastTerapy < 1) return 'error: fast terapy is too low';
    else if (this.state.fastTerapy > 60) return 'error: fast terapy is too high';

    return isValid;
  }

  handleSubmit(event) {
    event.preventDefault();
    // var isValid = this.getValidationState();
    // if (isValid !== true) {
    //   console.error(isValid);
    //   toast(isValid);
    //   return;
    // }
    //var profileId = localStorage.getItem('profileId');

    var _this = this;
    // TODO use react redux instead of your silly bus (it's already configured in routes...)
    bus.publish("LogFormFilled", _this.state).then((response) => {      
      this.myFormRef.reset();
    });
  }
  // https://stackoverflow.com/a/40635229

  // redux action
  addLog(log) {
    return { type: 'LogValue', title: log.title };
  }

  login() {
    this.props.auth.login();
  }

  // https://github.com/react-bootstrap/react-bootstrap/issues/77
  // https://stackoverflow.com/questions/39047130/react-bootstrap-importing-modules

  render() {
    const { isAuthenticated } = this.props.auth;
    const divStyle = {
      // borderColor: 'black',
      // borderStyle: 'solid',
      // borderWidth: '1px'
    };

    return (
      <div className="container">
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
        />
        {
          isAuthenticated() && (
            <form onSubmit={this.handleSubmit} ref={(el) => this.myFormRef = el}>
              <h2>Diary</h2>
              {/* <FormGroup controlId="formBasicText" validationState={this.getValidationState()}> */}
              <FormGroup controlId="formBasicText">
                <Grid>
                  <Row className="show-grid">
                    <Col xs={9} md={6} lg={6} style={divStyle}>
                      <ControlLabel>value</ControlLabel>
                      <FormControl type="number" name="value" value={this.state.value} onChange={this.handleInputChange} placeholder="value" /></Col>
                    <Col xs={9} md={6} lg={6} style={divStyle}>
                      <ControlLabel>mmol value</ControlLabel>
                      <FormControl type="number" name="mmolvalue" value={this.state.mmolvalue} onChange={this.handleInputChange} placeholder="mmol value" /></Col>
                  </Row>
                  <Row className="show-grid">
                    <Col xs={9} md={6} lg={6} style={divStyle}>
                      <ControlLabel>Slow terapy number</ControlLabel>
                      <FormControl type="number" name="slowTerapy" value={this.state.slowTerapy} onChange={this.handleInputChange} placeholder="slow terapy number" /></Col>
                    <Col xs={9} md={6} lg={6} style={divStyle}>
                      <ControlLabel>Fast terapy number</ControlLabel>
                      <FormControl type="number" name="fastTerapy" value={this.state.fastTerapy} onChange={this.handleInputChange} placeholder="fast terapy number" /></Col>
                  </Row>
                  <Row className="show-grid">
                    <Col xs={9} md={6} lg={6} style={divStyle}>
                      <ControlLabel>Calories</ControlLabel>
                      <FormControl type="number" name="calories" value={this.state.calories} onChange={this.handleInputChange} placeholder="calories" /></Col>
                    <Col xs={9} md={6} lg={6} style={divStyle}>
                      <ControlLabel>Comment</ControlLabel>
                      <FormControl name="comment" componentClass="textarea" value={this.state.comment} onChange={this.handleInputChange} placeholder="comment" maxLength="400" />
                    </Col>
                  </Row>
                  <Row className="show-grid">
                    <br />
                    <Col xs={9} md={6} lg={6} style={divStyle}>
                      <Button bsStyle="primary" type="submit">Submit</Button>
                    </Col>
                    <Col xs={9} md={6} lg={6} style={divStyle}>
                      <Button bsStyle="warning">Reset</Button>
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
      // <div className="App">
      //   <h1>Users</h1>
      //   {this.state.users.map(user =>
      //     <div key={user.id}>{user.username}</div>
      //   )}
      // </div>
    );
  }
}

export default Diary;