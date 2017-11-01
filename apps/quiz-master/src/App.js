import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import OpenQuizznightComponent from './components/OpenQuizznightComponent.jsx'
import DashboardComponent from './components/DashboardComponent.jsx'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={DashboardComponent}/>
        <Route path='/createQuiz' component={OpenQuizznightComponent}/>
        <Route path='/appliedTeams' />
        <Route path='/editQuizz' />
        <Route path='/addRound' />
        <Route path='/currentQuestion' />
      </Switch>
    );
  }
}

export default App;
