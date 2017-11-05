import React, {Component} from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import TeamComponent from './TeamComponent.jsx';
import store from "../store/RootStore";
import axios from "axios"
import config from '../config.js'
import {Redirect} from 'react-router'


class ViewAppliedTeamsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quizId: '',
      teams: [],
      approvedTeams: [],
      fireRedirect: false,
      redirectBack: false
    };
    this.socket = '';
    store.subscribe(() => {
      console.log("root state updated, update local accordingly   ")
      console.log(store.getState())
      this.updateState(store.getState());
    })
    this.updateState = this.updateState.bind(this);
    this.approvedTeamHandler = this.approvedTeamHandler.bind(this);
  }

  componentDidMount() {
    this.updateState(store.getState());
    console.log("root state: " + JSON.stringify(store.getState()))
  }

  /**
   * update local state with global state
   * @param {*} state store state
   */
  updateState(state) {
    this.setState({quizId: state.quizId, teams: state.teams})
  }

  startQuiz(event) {
    event.preventDefault()
    console.log("=====should be starting quizz now with id:" + this.state.quizId + " and teams: " + JSON.stringify(this.state.approvedTeams))
    axios.post(config.backend + '/quizzes/' + this.state.quizId + '/startQuiz', {
      body: this.state.approvedTeams

    }).then(response => {
      this.setState({fireRedirect: true})
    }).catch(error => {
      console.log("error: " + error);
      alert("something went wrong");
    })

  }

  approvedTeamHandler(event, teams) {
    event.preventDefault()
    console.log("in approved team handler")
    this.setState({approvedTeams: this.state.approvedTeams.concat(teams)})
  }

  redirectBack(event) {
    event.preventDefault()
    this.setState({redirectBack: true});
  }

  render() {
    console.log(this.state.approvedTeams)

    return (

      <div className="container-full">

        <p>QuizId: {this.state.quizId}</p>

        {/*check for redirect  */}
        {this.state.fireRedirect && (
          <Redirect to={'/addRound'}/>
        )}{this.state.redirectBack && (
        <Redirect to={'/'}/>
      )}
        <TitleComponent title="Quizzer - Team Applications"/>
        <BoxComponent>
          {this.state.teams.length > 0 && this.state.teams.map((team, i) => {
            return <TeamComponent team={team} key={i} approvedTeamHandler={this.approvedTeamHandler}/>;
          })}
        </BoxComponent>
        <button className='btn btn-large wobbly-border dashed thin' onClick={this.redirectBack.bind(this)}>back</button>
        <div className="text-center">
          <button onClick={this.startQuiz.bind(this)}>Start Quizz!</button>
        </div>
      </div>

    );
  }
}

export default ViewAppliedTeamsComponent;
