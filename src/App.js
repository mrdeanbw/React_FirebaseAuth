import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router'

import './App.css';

import LoginPage from './containers/login'
import SignupPage from './containers/signup'
import Home from './containers/home'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={browserHistory}>
          <Route path="/" component={LoginPage} />
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignupPage} /> 
              <Route path="/home" component={Home} /> 
      </Router>
      </div>
    );
  }
}

export default App;
