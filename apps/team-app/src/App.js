import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import LoginComponent from './components/LoginComponent.jsx'
import RegisterComponent from './components/RegisterComponent.jsx'
import PlayComponent from './components/PlayComponent.jsx'
import socketIOClient from "socket.io-client";
import config from './config.js'
import actions from './reducers/actions.js'


class App extends Component {

  render() {

    return (
    <Switch>
      <Route exact path='/' component={LoginComponent}/>
      <Route path='/register' component={RegisterComponent}/>
      <Route path='/play' component={PlayComponent}/>
    </Switch>
    );
  }
}

export default App;
