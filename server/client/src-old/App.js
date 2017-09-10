import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Diary from './diary/Diary';
import History from './history/History';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <Route exact path="/" component={Diary} />
            <Route path="/history" component={History} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;