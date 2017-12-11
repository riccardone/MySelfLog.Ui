import React, { Component } from 'react';
import { Button, Grid, Row, Col, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import Bus from '../bus';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import '../App.css';
var bus = Bus();

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

    // preserve the initial state in a new object
    this.baseState = this.state;
    this.subscribeForEvents();
  }

  subscribeForEvents = () => {
    var _this = this;

    bus.subscribe("LogSucceed", function (msg) {
      toast.info(msg);
      _this.setState(_this.baseState);
    });

    bus.subscribe("LogErroed", function (err) {
      toast.error(err);
    });
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
    bus.publish("LogFormFilled", this.state);
  }

  resetForm = () => {
    this.setState(this.baseState);
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
    const divStyle = {
      margin:'5px'
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
                  <Row>
                    <Col xs={9} md={6} lg={6}>
                      <FormControl style={divStyle} type="number" name="value" value={this.state.value} onChange={this.handleInputChange} placeholder="value" />
                    </Col>
                    <Col xs={9} md={6} lg={6}>
                      <FormControl style={divStyle} type="number" name="mmolvalue" value={this.state.mmolvalue} onChange={this.handleInputChange} placeholder="mmol value" />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={9} md={6} lg={6}>
                      <FormControl style={divStyle} type="number" name="slowTerapy" value={this.state.slowTerapy} onChange={this.handleInputChange} placeholder="slow terapy number" /></Col>
                    <Col xs={9} md={6} lg={6}>
                      <FormControl style={divStyle} type="number" name="fastTerapy" value={this.state.fastTerapy} onChange={this.handleInputChange} placeholder="fast terapy number" /></Col>
                  </Row>
                  <Row>
                    <Col xs={9} md={6} lg={6}>
                      <FormControl style={divStyle} type="number" name="calories" value={this.state.calories} onChange={this.handleInputChange} placeholder="calories" /></Col>
                    <Col xs={10} md={6} lg={6}>
                      <FormControl style={divStyle} name="comment" componentClass="textarea" value={this.state.comment} onChange={this.handleInputChange} placeholder="comment" maxLength="400" />
                    </Col>
                  </Row>
                  <Row>
                    <br />
                    <Col xs={10} md={3} lg={3}>
                      <Button bsStyle="primary" type="submit">Submit</Button>
                    </Col>
                    <Col xs={10} md={9} lg={9}>
                      <Button bsStyle="warning" onClick={this.resetForm}>Reset</Button>
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

export default Diary;