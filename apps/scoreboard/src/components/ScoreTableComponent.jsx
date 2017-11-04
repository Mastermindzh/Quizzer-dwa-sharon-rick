import React, { Component } from "react";
import store from "../store/RootStore"
import axios from "axios"
import config from '../config.js'

class ScoreTableComponent extends Component {


  constructor() {
    super();
    this.state = {
      rounds: [],
      teams: [],
      scores: []
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
    let rounds = state.rounds;
    let stateTeams = state.teams;

    if (stateTeams !== []) {
      var teams = [];

      // create array with teams (all scores 0)
      stateTeams.forEach(team => {
        if (teams[team] === undefined) {
          teams[team] = { teamId: team, rounds: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
        }
      });

      for (let roundNr = 0; roundNr < rounds.length; roundNr++) {
        for (let questionNr = 0; questionNr < rounds[roundNr].questions.length; questionNr++) {
          for (let answerNr = 0; answerNr < rounds[roundNr].questions[questionNr].answers.length; answerNr++) {
            let answer = rounds[roundNr].questions[questionNr].answers[answerNr];
            if (answer.approved) {
              teams[answer.teamId].rounds[roundNr]++;
            }
          }
        }
      }

      Promise.all(stateTeams.map(function (stateTeam, i) {
        return axios.get(config.backend + '/teams/' + stateTeam)
      })).then(response => {
        response.forEach(team => {
          teams[team.data._id].teamId = team.data.name;
        })
        this.setState({ scores: teams, teams: store.getState().teams })
      }).catch(err => {
        this.setState({teams: store.getState().teams})
      })
    }
  }

  componentDidMount() {
    this.updateState(store.getState());
  }

  render() {

    var htmlElements = [];
    this.state.teams.forEach((team, i) => {
      if (this.state.scores[team] !== undefined) {
        htmlElements.push(<tr key={i}><td>{this.state.scores[team].teamId}</td>
          {this.state.scores[team].rounds.map(function (correctAnswers, i) {
            return <td key={i}>{correctAnswers}</td>
          }
          )}</tr>)
      }
    })
    return (
      <table className="scores">
        <thead>
          <tr>
            <td>Team</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <td>10</td>
            <td>11</td>
            <td>12</td>
          </tr>
        </thead>
        <tbody>
          {
            htmlElements
          }
        </tbody>
      </table>
    );
  }
}

export default ScoreTableComponent;


