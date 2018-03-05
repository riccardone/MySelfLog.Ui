import React, { Component } from 'react';
// import { Grid, Row, Col, ControlLabel } from 'react-bootstrap';
import NavBarTop from '../navbar.top';

class Home extends Component {
  constructor(props) {
    super(props);    
    // preserve the initial state in a new object
    this.baseState = this.state;    
  }

  render() {
    return (
      <div>
        <NavBarTop auth={this.props.auth} {...this.props} />
        <div className="container">
          <h1>MySelf Log</h1>
          <h4>Log your health</h4>
          <p>Free service to keep track of your glucose values, terapies, calories and share with family or doctors</p>          
        </div>
      </div>
    );
  }
}

export default Home;
