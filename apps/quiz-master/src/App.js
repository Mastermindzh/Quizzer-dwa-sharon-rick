import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import OpenQuizznightComponent from './components/OpenQuizznightComponent.jsx'
import DashboardComponent from './components/DashboardComponent.jsx'
import ViewAppliedTeams from "./components/ViewAppliedTeamsComponent";
import CurrentQuestionComponent from "./components/CurrentQuestionComponent";
import AddRoundComponent from "./components/AddRoundComponent";
import EditRoundsComponent from "./components/EditRoundsComponent";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={DashboardComponent}/>
        <Route path='/createQuiz' component={OpenQuizznightComponent}/>
        <Route path='/appliedTeams' component={ViewAppliedTeams}/>
        <Route path='/editQuizz' component={EditRoundsComponent}/>
        <Route path='/addRound' component={AddRoundComponent}/>
        <Route path='/currentQuestion' component={CurrentQuestionComponent} />
      </Switch>
    );
  }
}

export default App;
