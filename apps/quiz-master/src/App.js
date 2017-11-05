import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import OpenQuizznightComponent from './components/OpenQuizznightComponent.jsx'
import DashboardComponent from './components/DashboardComponent.jsx'
import ViewAppliedTeams from "./components/ViewAppliedTeamsComponent";
import CurrentQuestionComponent from "./components/CurrentQuestionComponent";
import AddRoundComponent from "./components/AddRoundComponent";
import EditRoundsComponent from "./components/EditRoundsComponent";
import LoginComponent from "./components/LoginComponent";
import socketIOClient from "socket.io-client";
import config from './config.js'
import actions from './reducers/actions.js'
import store from "./store/RootStore"


class App extends Component {

  componentDidMount(){
    this.socket = socketIOClient(config.backend);
    this.socket.on("new-team", data => {
      console.log(`websocket message received:`)
      console.log(data);
      store.dispatch({type: actions.ADD_TEAM, payload: data.teamId})
    })
  }


  render() {
    return (
      <Switch>
        <Route exact path='/' component={DashboardComponent}/>
        <Route path='/login' component={LoginComponent}/>
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
