import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import TeamCardComponent from './TeamCardCompoment'
import ScoreTableComponent from './ScoreTableComponent'
import ChartComponent from './ChartComponent'
import QuestionComponent from './QuestionComponent'
import { Redirect } from 'react-router'
import store from "../store/RootStore"
import config from '../config.js'
import actions from '../reducers/actions.js'
import axios from "axios"
import socketIOClient from "socket.io-client";
import QuizInfoComponent from './QuizInfoComponent'

class ScoreboardComponent extends Component {


  constructor() {
    super();

    this.state = {
      quizId: '',
      teams: [],
      redirectWinner: false
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
    this.setState({ quizId: state.quizId, teams: state.teams, redirectWinner: state.redirectWinner })
  }

  componentDidMount() {
    this.updateState(store.getState());
  }

  render() {
    return (
      <div className="container-full">
        {this.state.redirectWinner && (
          <Redirect to={'/winner'} />
        )}
        <TitleComponent title="Quizzer - Scoreboard" />
        <div className="row">
          <div className="col-lg-6">
            <BoxComponent size="12">
              <h3 className="quizInfo">
                Quiz info:
            </h3>

              <div className="row">
                <div className="col-lg-8">
                  <ScoreTableComponent />
                </div>
                <div className="col-lg-3 col-lg-offset-1">
                  <QuizInfoComponent />
                </div>
              </div>

            </BoxComponent>
          </div>
          <div className="col-lg-6">
            <BoxComponent size="12">
              <h3 className="teamByPoints">
                Teams ranked by points
              </h3>
              <ChartComponent />
            </BoxComponent>
          </div>

          <div className="col-lg-12">
            <QuestionComponent />
          </div>

          {/* <TeamCardComponent teamName="correct" status="correct" answer="answer" teamImage="https://www.gitbook.com/cover/book/mongkuen/react.jpg?build=1470682429235" />
          <TeamCardComponent teamName="wrong" status="wrong" answer="answer" teamImage="https://www.gitbook.com/cover/book/mongkuen/react.jpg?build=1470682429235" />
          <TeamCardComponent teamName="review" status="review" answer="answer" teamImage="https://www.gitbook.com/cover/book/mongkuen/react.jpg?build=1470682429235" /> */}


          {this.state.teams.map((team, i) => {
            return <TeamCardComponent team={team} key={i} />;
          })}
        </div>
      </div>
    );
  }
}

export default ScoreboardComponent;
