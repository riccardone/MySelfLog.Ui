import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import Fetch from 'react-fetch';
import '../App.css';

class Diary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      mmolvalue: '',
      slowTerapy: '',
      fastTerapy: '',
      calories: '',
      foodType: ''
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
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  getValidationState() {
    // const length = this.state.value.length;
    // if (length > 10) return 'success';
    // else if (length > 5) return 'warning';
    // else if (length > 0) return 'error';
  }

  handleSubmit(event) {
    event.preventDefault();
    var _this = this;
    fetch('http://localhost:3001/api/v1/values', {  
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value: _this.state.value,
        mmolvalue: _this.state.mmolvalue,
        slowTerapy: _this.state.slowTerapy,
        fastTerapy: _this.state.fastTerapy,
        calories: _this.state.calories,
        foodType: _this.state.foodType
      })
    }).then((response) => console.log(response));
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
        {
          isAuthenticated() && (
            <form onSubmit={this.handleSubmit}>
              <h2>Diary</h2>
              <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
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
                      <ControlLabel>Food types</ControlLabel>
                      <FormGroup controlId="formControlsSelect">
                        <FormControl componentClass="select" name="foodType" value={this.state.foodType} onChange={this.handleInputChange} placeholder="select FoodType">
                          <option value="select">select</option>
                          <option value="other">Fruits</option>
                          <option value="other">Snack</option>
                          <option value="other">Lunch</option>
                          <option value="other">Dinner</option>
                        </FormControl>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row className="show-grid">
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