import React, { Component } from 'react';
import { Nav, NavItem, Navbar } from 'react-bootstrap';
import './navbar.top.css';

class NavBarTopNoAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diaryName: this.props.diaryName
    };
  }

  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  render() {
    const brandStyle = {
      color: 'white'
    };

    const diaryTitleStyle = {
      color: 'white',
      fontWeight: 'bold',
      fontSize: '1.5em'
    };

    var diaryTitle = 'Diary: ' + this.state.diaryName;

    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand style={brandStyle}>
              MySelfLog
            </Navbar.Brand>
          </Navbar.Header>
          <Nav pullRight>
            <NavItem style={diaryTitleStyle} disabled>
              {diaryTitle}
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default NavBarTopNoAuth;
