import React, { Component } from 'react';
// import * as ReactBootstrap from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { ControlLabel } from 'react-bootstrap';
import './App.css';

class App extends Component {
  state = { users: [], value: 0 }

  getInitialState() {
    return {
      value: ''
    };
  }

  componentDidMount() {
    fetch('/users')
      .then(res => res.json())
      .then(users => this.setState({ users }));
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  // https://github.com/react-bootstrap/react-bootstrap/issues/77
  // https://stackoverflow.com/questions/39047130/react-bootstrap-importing-modules

  render() {

    const divStyle = {
      // borderColor: 'black',
      // borderStyle: 'solid',
      // borderWidth: '1px'
    };

    return (
      <div className="App">
        <h1>Diary</h1>       
        <form>
          <FormGroup controlId="formBasicText" validationState={this.getValidationState()}>
            <Grid>
              <Row className="show-grid">
                <Col xs={9} md={6} lg={6} style={divStyle}>
                  <ControlLabel>value</ControlLabel>
                  <FormControl type="number" value={this.state.value} placeholder="value" onChange={this.handleChange} /></Col>
                <Col xs={9} md={6} lg={6} style={divStyle}>
                  <ControlLabel>mmol value</ControlLabel>
                  <FormControl type="number" value={this.state.value} placeholder="mmol value" onChange={this.handleChange} /></Col>
              </Row>
              <Row className="show-grid">
                <Col xs={9} md={6} lg={6} style={divStyle}>
                  <ControlLabel>Slow terapy number</ControlLabel>
                  <FormControl type="number" value={this.state.value} placeholder="slow terapy number" onChange={this.handleChange} /></Col>
                <Col xs={9} md={6} lg={6} style={divStyle}>
                  <ControlLabel>Fast terapy number</ControlLabel>
                  <FormControl type="number" value={this.state.value} placeholder="fast terapy number" onChange={this.handleChange} /></Col>
              </Row>
              <Row className="show-grid">
                <Col xs={9} md={6} lg={6} style={divStyle}>
                  <ControlLabel>Calories</ControlLabel>
                  <FormControl type="number" value={this.state.value} placeholder="calories" onChange={this.handleChange} /></Col>
                <Col xs={9} md={6} lg={6} style={divStyle}>
                  <ControlLabel>Food types</ControlLabel>
                  <FormGroup controlId="formControlsSelect">
                    <FormControl componentClass="select" placeholder="select">
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
                  <Button bsStyle="primary">Submit</Button>
                </Col>
                <Col xs={9} md={6} lg={6} style={divStyle}>
                  <Button bsStyle="warning">Reset</Button>
                </Col>
              </Row>
            </Grid>
          </FormGroup>
        </form>
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

export default App;