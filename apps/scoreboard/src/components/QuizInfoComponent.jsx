import React, { Component } from "react";
import store from "../store/RootStore"

class QuizInfoComponent extends Component {


  constructor() {
    super();
    this.state = {
      roundsPlayed: 0,
      currentQuestion: 0
    };

    store.subscribe(() => {
      this.updateState(store.getState());
    })
    this.updateState = this.updateState.bind(this);
  }

  /**
   * update local state with global state
   * @param {*} state store state
   */
  updateState(state) {
    var rounds = state.rounds;
    if (rounds !== undefined) {
      var nrOfRounds = 0;
      var nrOfQuestions = 0;
      for (let i = 0; i < rounds.length; i++) {
        nrOfRounds++;
        nrOfQuestions = 0;
        for (let j = 0; j < rounds[i].questions.length; j++) {
          if (rounds[i].questions[j].status === "Closed") {
            nrOfQuestions++;
          }
        }
      }
    }
    this.setState({ roundsPlayed: nrOfRounds, currentQuestion: nrOfQuestions })
  }

  componentDidMount() {
    this.updateState(store.getState());
  }

  render() {
    return (
      <p className="smallText bold">
        Rounds played: {this.state.roundsPlayed - 1} <br /><br /> Current Question: {this.state.currentQuestion + 1}
      </p>
    );
  }
}

export default QuizInfoComponent;
