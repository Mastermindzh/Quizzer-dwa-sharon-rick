import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import ButtonComponent from './shared/ButtonComponent'
import TeamAnswerComponent from "./TeamAnswerComponent";
import QuestionComponent from "./QuestionComponent";
import config from '../config.js'
import socketIOClient from "socket.io-client";
import store from "../store/RootStore"
import axios from "axios"
import {Redirect} from 'react-router'

class CurrentQuestionComponent extends Component {


  constructor() {
    super();
    this.state = {
      quizId: '',
      answers: [],
      question: '',
      answer: '',
      redirectBack: false
    }
    this.socket = '';

    store.subscribe(() => {
      this.updateState(store.getState());
    })

    this.updateState = this.updateState.bind(this);
    this.fetchAnswers = this.fetchAnswers.bind(this);
    this.fetchQuestion = this.fetchQuestion.bind(this);
    this.redirectBack = this.redirectBack.bind(this);
  }

  /**
* update local state with global state
* @param {*} state store state
*/
  updateState(state) {
    this.setState({ quizId: state.quizId })
    this.fetchAnswers(state.quizId)
    this.fetchQuestion(state.quizId)
  }

  componentDidMount() {
    this.socket = socketIOClient(config.backend);

    this.socket.on("new-answer", data => {
      if (data.quizId === this.state.quizId) {
        this.setState({ answers: [] }, () => {
          this.fetchAnswers(this.state.quizId)
        })
      }
    });

    this.updateState(store.getState())
  }



  fetchQuestion(quizId) {
    axios.get(config.backend + "/quizzes/" + quizId + "/currentQuestion").then(question => {
      this.setState({ question: question.data.question, answer: question.data.answer })
    })
  }

  fetchAnswers(quizId) {
    axios.get(config.backend + "/quizzes/" + quizId + '/answers').then(response => {
      this.setState({ answers: response.data })
    }).catch(err => {
      console.log("no questions")
    })
  }

  closeQuestion(event){
    event.preventDefault()
    axios.get(config.backend + "/quizzes/" + this.state.quizId + "/closeCurrentQuestion").then(response =>{
      axios.get(config.backend + "/closeQuestion/" + this.state.quizId).then(response =>{
        this.setState({ redirectBack: true });
      })
    })
  }

  redirectBack(event) {
    event.preventDefault()
    this.setState({ redirectBack: true });
  }

  render() {

    return (

      <div className="container-full">
        {this.state.redirectBack && (
          <Redirect to={'/'} />
        )}
        <TitleComponent title="Quizzer - Current Question" />


        <QuestionComponent question={this.state.question} answer={this.state.answer} />


        {this.state.answers != '' && this.state.answers.map((team, i) => {
          return <TeamAnswerComponent team={team.teamId} answer={team.answer} quiz={this.state.quizId} status={team.approved} key={i} />;
        })}

        <button className='btn btn-large wobbly-border dashed thin' onClick={this.redirectBack.bind(this)}>back</button>
        <button className='btn btn-large wobbly-border dashed thin' onClick={this.closeQuestion.bind(this)}>end question</button>
      </div>

    );
  }
}

export default CurrentQuestionComponent;
