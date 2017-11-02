import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import ButtonComponent from './shared/ButtonComponent'
import socketIOClient from "socket.io-client";
import store from "../store/RootStore"
import config from '../config.js'
import actions from '../reducers/actions.js'

class PlayComponent extends Component {

  constructor() {
    super();
    this.state = {
      question: 'No question yet',
      quizId: ''
    };

    this.socket = '';

    store.subscribe(() => {
      this.updateState(store.getState());
      console.log(JSON.stringify(store.getState()))
    })
    this.updateState = this.updateState.bind(this);
  }

  /**
   * update local state with global state
   * @param {*} state store state
   */
  updateState(state){
    this.setState({question: store.getState().currentQuestion, quizId: store.getState().quizId })
  }

  componentDidMount() {
    this.updateState(store.getState());
    this.socket = socketIOClient(config.backend);
    this.socket.on("new-question", data => store.dispatch({type: actions.CHANGE_CURRENT_QUESTION, payload: data}));
  }

  render() {

    return (
      <div className="container">
        <TitleComponent title="Quizzer - Team app" />
        <div className="col-lg-12 text-center">

          <div className="col-lg-3" />
          <BoxComponent size="6">
            <h2 className="header-distance">Question</h2>
            <p>{this.state.question.question}</p>

            <div className="col-lg-12">
              <div className="form-group">
                <input type="text" name="answer" className="form-control" id="answer" placeholder="Enter your answer" />
              </div>

            </div>
            <div className="col-lg-12" style={{ paddingTop: '40px' }}>
              <ButtonComponent path="/play" text="Submit answer" />
            </div>
          </BoxComponent>
        </div>
      </div>

    );
  }
}

export default PlayComponent;
