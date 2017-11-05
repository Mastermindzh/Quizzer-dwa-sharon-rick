import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import store from "../store/RootStore"
import axios from "axios"
import config from '../config.js'

class WinnerComponent extends Component {

  constructor() {
    super();

    this.state = {
      winners: [],
      bronze: '0px',
      silver: '0px',
      gold: '0px'
    };
  }

  componentDidMount() {

    axios.get(config.backend + '/quizzes/' + store.getState().quizId + "/score").then(response => {

      let result = response.data;

      result.sort(function compare(a, b) {
        if (a.score < b.score)
          return 1;
        if (a.score > b.score)
          return -1;
        return 0;
      })
      result.length = 3;
      this.setState({
        winners: result,
        bronze: '420px',
        silver: '565px',
        gold: '730px'
      })
    })
  }

  render() {

    return (
      <div>
        <TitleComponent title="Quizzer - Final Score!" />

        <div className="row">
          <div className="competition-podium well">

            <div className="podium-block bronze">
              <div className="name">
                {this.state.winners.length > 2 && (
                  this.state.winners[2].team
                )}
              </div>
              <div className="podium" style={{ height: this.state.bronze }}>
                <span>
                  {this.state.winners.length > 2 && (
                    this.state.winners[2].score
                  )}
                </span>
              </div>
            </div>
            <div className="podium-block gold">
              <div className="name">
                {this.state.winners.length > 0 && (
                  this.state.winners[0].team
                )}
              </div>
              <div className="podium" style={{ height: this.state.gold }}>
                <span>
                  {this.state.winners.length > 0 && (
                    this.state.winners[0].score
                  )}
                </span>
              </div>
            </div>
            <div className="podium-block silver">
              <div className="name">
                {this.state.winners.length > 1 && (
                  this.state.winners[1].team
                )}
              </div>
              <div className="podium" style={{ height: this.state.silver }}>
                <span>
                  {this.state.winners.length > 1 && (
                    this.state.winners[1].score
                  )}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default WinnerComponent;
