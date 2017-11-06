import React, { Component } from "react";
import axios from "axios"
import config from '../config.js'
import socketIOClient from "socket.io-client";
import store from "../store/RootStore"

class TeamCardComponent extends Component {

  constructor() {
    super();
    this.state = {
      status: '',
      teamImage: '',
      teamName: '',
      quizId: '',
      answer: {},
      showAnswer: false
    }
    this.socket = '';

    store.subscribe(() => {
      this.updateState(store.getState());
    })

    this.updateState = this.updateState.bind(this);
    this.fetchAnswer = this.fetchAnswer.bind(this);
  }

  /**
* update local state with global state
* @param {*} state store state
*/
  updateState(state) {
    this.setState({ quizId: state.quizId })
    this.fetchAnswer(state.quizId)
  }

  componentDidMount() {
    this.socket = socketIOClient(config.backend);

    this.socket.on("new-answer", data => {
      if (data.quizId === this.state.quizId) {
        this.fetchAnswer(this.state.quizId)
      }
    });

    this.socket.on("question-end", data => {
      if (data.quizId === this.state.quizId) {
        this.setState({showAnswer: true })
      }
    })

    this.socket.on("new-question", data => {
      if (data.quizId === this.state.quizId) {
        this.setState({answer: {}, showAnswer: false})
      }
    })

    axios.get(config.backend + "/teams/" + this.props.team).then(response => {
      this.setState({ teamName: response.data.name, teamImage: config.backend + "/" + response.data.picture })
    }).catch(err => {
      console.log("team doesn't exist");
    })
  }

  fetchAnswer(quizId) {
    axios.get(config.backend + "/quizzes/" + quizId + "/" + this.props.team + "/currentAnswer").then(response => {
      this.setState({ answer: response.data })
    }).catch(err => {
      console.log("team doesn't exist");
    })
  }

  render() {

    let statusClass = ''
    let answerGiven = ''

    if (Object.keys(this.state.answer).length > 0) {
      if (this.state.showAnswer) {
        if(this.state.answer.approved){
          statusClass = 'correct'
        }else{
          statusClass = 'wrong'
        }
        answerGiven = this.state.answer.answer
      } else {
        statusClass = 'review'
        answerGiven = '-'
      }
    }


    return (
      <div className="col-lg-3">
        <div className={`row wobbly-border ${statusClass}`}>
          <div className="col-lg-2 wobbly-border profile-picture" style={{ height: '60px', width: '60px', padding: '5px' }}>
            <img src={this.state.teamImage} alt="the team" style={{ maxHeight: '50px', maxWidth: '50px', marginTop: '-2px' }} />
          </div>
          <div className="col-lg-10 team-description">
            <h3>{this.state.teamName}</h3>
            <p>
              {answerGiven}
            </p>
          </div>
        </div>
      </div>

    );
  }
}

export default TeamCardComponent;
