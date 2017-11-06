import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import SubmitButton from './shared/SubmitButton'
import socketIOClient from "socket.io-client";
import store from "../store/RootStore"
import axios from "axios"
import config from '../config.js'
import actions from '../reducers/actions.js'

class PlayComponent extends Component {

  constructor() {
    super();
    this.state = {
      question: 'No question yet',
      quizId: '',
      teamName: '',
      answer: '',
      showSucces: false
    };

    this.socket = '';

    store.subscribe(() => {
      this.updateState(store.getState());
    })
    this.updateState = this.updateState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
 * change state on keypress
 * @param {input} field name of the state key to change
 * @param {*} event
 */
  handleChange(field, event) {
    this.setState({ [field]: event.target.value });
  }

  /**
   * update local state with global state
   * @param {*} state store state
   */
  updateState(state) {
    this.setState({ question: state.currentQuestion, quizId: state.quizId, teamName: state.teamName })
  }

  componentDidMount() {
    this.updateState(store.getState());


    axios.get(config.backend + '/quizzes/' + store.getState().quizId + '/currentQuestion').then(response => {
      if (response.data.category !== undefined) {
        axios.get(config.backend + '/categories/' + response.data.category).then(data => {
          store.dispatch({
            type: actions.CHANGE_CURRENT_QUESTION,
            payload: {
              question: response.data,
              category: data.data
            }
          })
        })
      }
    })

    this.socket = socketIOClient(config.backend);
    this.socket.on("new-question", data => {
      if (data.quizId == this.state.quizId.toString()) {
        axios.get(config.backend + '/quizzes/' + data.quizId + '/currentQuestion').then(response => {
          if (response.data.category !== undefined) {
            axios.get(config.backend + '/categories/' + response.data.category).then(data => {
              store.dispatch({
                type: actions.CHANGE_CURRENT_QUESTION,
                payload: {
                  question: response.data,
                  category: data.data
                }
              })
            })
          }
        })
      }
    });
  }

  /**
 * form submit
 * @param {*} event
 */
  handleSubmit(event) {
    event.preventDefault();

    let url = config.backend + '/quizzes/' + this.state.quizId + "/answers" + "/" + this.state.teamName;
    axios.put(url, { answer: this.state.answer }).then(response => {
      this.setState({ answer: '', showSucces: true })
      this.answerInput.value = ""
      // let server broadcast
      axios.get(config.backend + '/newAnswer/' + this.state.quizId)
    }).catch(err => {
      this.setState({ showSucces: false })
      alert('something went wrong')
    })
  }

  render() {

    const { answer } = this.state
    return (
      <div className="container">
        <TitleComponent title="Quizzer - Team app" />
        <div className="col-lg-12 text-center">

          <div className="col-lg-3" />
          <BoxComponent size="6">
            <h2 className="header-distance">Question</h2>
            <p>{(this.state.question) !== undefined && this.state.question.question}</p>
            <form onSubmit={this.handleSubmit}>
              <div className="col-lg-12">
                <div className="form-group">
                  <input type="text" name="answer" className="form-control" id="answer" placeholder="Enter your answer" onChange={this.handleChange.bind(this, "answer")} ref={el => this.answerInput = el} />
                </div>
              </div>
              <div className="col-lg-12" style={{ paddingTop: '40px' }}>
                <SubmitButton text="Submit answer!" enabled={answer.length > 0} />
              </div>
            </form>
            {this.state.showSucces && (
              <div className="alert alert-success" style={{ marginTop: '20px' }}>
                <strong>Success!</strong> Your answer has been submitted for review
            </div>
            )}

          </BoxComponent>
        </div>
      </div>

    );
  }
}

export default PlayComponent;
