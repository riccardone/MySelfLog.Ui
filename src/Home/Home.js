import React, { Component } from 'react';
import NavBarTop from '../navbar.top';
import Footer from '../footer';

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
          <h1 className="page-title">MySelfLog</h1>
          <div className="border-left">
            <h3 className="page-subtitle">Free service to keep track of your glucose values, terapies, calories and share with family or doctors.<br /> This service can be used freely and anonymously by anyone with diabetes.</h3>
            <h3 className="page-subtitle">Easy, fast, minimal</h3>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
