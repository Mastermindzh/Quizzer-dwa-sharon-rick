import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import LoginComponent from './components/LoginComponent.jsx'
import ScoreboardComponent from './components/ScoreboardComponent.jsx'
import WinnerComponent from './components/WinnerComponent.jsx'


class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={LoginComponent}/>
        <Route path='/scores' component={ScoreboardComponent}/>
        <Route path='/winner' component={WinnerComponent}/>
      </Switch>
    );
  }
}

export default App;
