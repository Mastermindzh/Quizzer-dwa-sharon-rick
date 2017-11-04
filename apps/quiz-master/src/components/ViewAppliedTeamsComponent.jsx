import React, {Component} from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import TeamComponent from './TeamComponent.jsx';
import ButtonComponent from './shared/ButtonComponent'
import socketIOClient from "socket.io-client";
import store from "../store/RootStore";
//import axios from "axios"
import config from '../config.js'

import actions from '../reducers/actions.js'

class ViewAppliedTeamsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teams: [],
    };
    this.socket = '';
    this.updateState = this.updateState.bind(this);
    store.subscribe(() => {
      console.log("root state updated, update local accordingly   ")
      this.updateState(store.getState());
    })
  }

  componentDidMount() {
    this.updateState(store.getState());
    this.socket = socketIOClient(config.backend);
    this.socket.on("new-team", data => {
      console.log(`websocket message received:`)
      console.log(data)
      store.dispatch({type: actions.ADD_TEAM, payload: data.team})

    });
  }

  /**
   * update local state with global state
   * @param {*} state store state
   */
  updateState(state) {
    console.log("local state updated")
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
