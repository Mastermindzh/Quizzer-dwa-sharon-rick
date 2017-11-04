import React, {Component} from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import TeamComponent from './TeamComponent.jsx';
import ButtonComponent from './shared/ButtonComponent'
import socketIOClient from "socket.io-client";
import store from "../store/RootStore";
import axios from "axios"
import config from '../config.js'
import { Redirect } from 'react-router'
import actions from '../reducers/actions.js'

class ViewAppliedTeamsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quizId: '',
      teams: [],
      approvedTeams:[],
      fireRedirect: false
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
    this.socket = socketIOClient(config.backend);
    this.socket.on("new-team", data => {
      console.log(`websocket message received:`)
      console.log(data)
      store.dispatch({type: actions.ADD_TEAM, payload: this.state.teams.concat(data.teamId)})

    });
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
    console.log("=====should be starting quizz now with id:"+this.state.quizId)
    axios.post(config.backend + '/startQuiz', {
      quizId: this.state.quizId,
      teams: this.state.approvedTeams
    }).then(response => {
      this.setState({ fireRedirect: true })
    }).catch(error => {
      console.log("error: "+error);
      alert("something went wrong");
    })

  }

  approvedTeamHandler(event, teams){
    event.preventDefault()
    console.log("in approved team handler")
    this.setState({approvedTeams: this.state.approvedTeams.concat(teams)})
  }


  render() {
    console.log(this.state.approvedTeams)

    return (

      <div className="container-full">

        <p>QuizId: {this.state.quizId}</p>

        {/*check for redirect  */}
        {this.state.fireRedirect && (
          <Redirect to={'/addRound'} />
        )}
        <TitleComponent title="Quizzer - Team Applications"/>
        <BoxComponent>
          {this.state.teams.map((team, i) => {
            return <TeamComponent team={team} key={i} approvedTeamHandler={this.approvedTeamHandler}/>;
          })}
        </BoxComponent>
        <ButtonComponent path={"/"} text={"Back"}/>
        <div className="text-center">
          <button onClick={this.startQuiz.bind(this)}>Start Quizz!</button>
        </div>
      </div>

    );
  }
}

export default ViewAppliedTeamsComponent;
