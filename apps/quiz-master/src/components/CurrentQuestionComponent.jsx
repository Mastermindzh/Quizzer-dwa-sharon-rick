import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import ButtonComponent from './shared/ButtonComponent'
import TeamAnswerComponent from "./TeamAnswerComponent";
import QuestionComponent from "./QuestionComponent";
import config from '../config.js'
import socketIOClient from "socket.io-client";
import store from "../store/RootStore"
import axios from "axios"

class CurrentQuestionComponent extends Component {


  constructor() {
    super();
    this.state = {
      quizId: '',
      answers: [],
    }
    this.socket = '';

    store.subscribe(() => {
      this.updateState(store.getState());
    })

    this.updateState = this.updateState.bind(this);
    this.fetchAnswers = this.fetchAnswers.bind(this);
  }

   /**
* update local state with global state
* @param {*} state store state
*/
  updateState(state) {
    this.setState({ quizId: state.quizId })
    this.fetchAnswers(state.quizId)
  }

  componentDidMount() {
    this.socket = socketIOClient(config.backend);

    this.socket.on("new-answer", data => {
      if (data.quizId === this.state.quizId) {
        this.fetchAnswers(this.state.quizId)
      }
    });
  }

  fetchAnswers(quizId) {
    axios.get(config.backend + "/quizzes/" + quizId + '/answers').then(response => {
      this.setState({answers: response.data})
    }).catch(err => {
      console.log("no questions")
    })
  }

  render() {

    return (

      <div className="container-full">
        <TitleComponent title="Quizzer - Current Question" />
        <QuestionComponent question={"What is the answer to everything?"} answer={"42"}/>
        {/* For each team answer: */}
        <TeamAnswerComponent name={"Team1"} answer={"???"}/>
        <ButtonComponent path={"/"} text={"Back"}/>
      </div>

    );
  }
}

export default CurrentQuestionComponent;
