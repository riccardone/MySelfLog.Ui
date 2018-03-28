import React from 'react';
import { Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Home from './Home/Home';
import Diary from './Diary/Diary';
import DiaryReport from './Diary/DiaryReport';
import Repository from './Diary/Repository';
import History from './History/History';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

let store = createStore(function (event) {
  console.log("ciao");
});

export const makeMainRoutes = () => {
  return (
    <Provider store={store}>
      <Router history={history} component={Home}>
        <div>                    
          <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />
          <Route exact path="/home" render={(props) => <Home auth={auth} {...props} />} />
          <Route exact path="/diary/:diaryname" render={(props) => <DiaryReport {...props} />} />
          <Route path="/diary" render={(props) => <Diary auth={auth} {...props} />} />          
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }} />
          <Route path="/history" render={(props) => <History auth={auth} {...props} />} />
        </div>
      </Router>
    </Provider>
  );
};
