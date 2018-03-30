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
    const styles = {
      header: {             
        borderColor: 'transparent',
        borderBottomColor: '#CCC',
        borderBottomWidth: '3px'                  
      },
      title: {
        color: 'white'       
      }
  };

    return (
      <Navbar style={styles.header}>
      <div id="header">      
        <h1 id="title" style={styles.title}>Diary: {this.state.diaryName}</h1>
      </div>
      </Navbar>
    );
  }
}

export default NavBarTopNoAuth;
