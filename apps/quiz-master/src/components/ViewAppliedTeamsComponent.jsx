import React, {Component} from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import TeamComponent from './TeamComponent.jsx';
import ButtonComponent from './shared/ButtonComponent'
import socketIOClient from "socket.io-client";
import store from "../store/RootStore";
import axios from "axios"
import config from '../config.js'
//import actions from '../reducers/actions.js'

class ViewAppliedTeamsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teams: [{name: "Team1", picture:"299b69670003c66511428d4ea2255c4e1509618791370.jpeg"},{name: "Team2", picture:"299b69670003c66511428d4ea2255c4e1509618791370.jpeg"}, {name: "Team3", picture:"299b69670003c66511428d4ea2255c4e1509618791370.jpeg"}],
    };
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    //this.updateState(store.getState());
    this.socket = socketIOClient(config.backend);
    this.socket.on("new-team", data => {
      console.log("websocket message received: "+data)
      // if(data.quizId == this.state.quizId){
      //   store.dispatch({ type: actions.CHANGE_CURRENT_QUESTION, payload: data.question })
      // }
    });
  }

  updateState(state) {
    this.setState({ teams: state.teams })
  }


  render() {

    return (

      <div className="container-full">
        <TitleComponent title="Quizzer - Team Applications"/>
          <BoxComponent>
            <TeamComponent teams={this.state.teams}/>
          </BoxComponent>
        <ButtonComponent path={"/"} text={"Back"}/>
        </div>

    );
  }
}

export default ViewAppliedTeamsComponent;
