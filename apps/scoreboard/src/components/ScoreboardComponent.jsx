import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import TeamCardComponent from './TeamCardCompoment'
import ScoreTableComponent from './ScoreTableComponent'
import ChartComponent from './ChartComponent'
import QuestionComponent from './QuestionComponent'
import store from "../store/RootStore"
import config from '../config.js'
import actions from '../reducers/actions.js'
import axios from "axios"
import socketIOClient from "socket.io-client";

class ScoreboardComponent extends Component {


  constructor() {
    super();

    this.teams = [
      {
        "_id": "59f8752e3c77d92d2a98ac2f",
        "name": "Team1",
        "password": "1234",
        "picture": "https://www.gitbook.com/cover/book/mongkuen/react.jpg?build=1470682429235",
        "__v": 0
      },
      {
        "_id": "59f8752e3c77d92d2a98ac31",
        "name": "Team3",
        "password": "abcd",
        "picture": "https://www.gitbook.com/cover/book/mongkuen/react.jpg?build=1470682429235",
        "__v": 0
      },
      {
        "_id": "59f8752e3c77d92d2a98ac30",
        "name": "Team2",
        "password": "1a2b",
        "picture": "https://www.gitbook.com/cover/book/mongkuen/react.jpg?build=1470682429235",
        "__v": 0
      },
      {
        "_id": "59f8752e3c77d92d2a98ac30",
        "name": "Team4",
        "password": "1a2b",
        "picture": "https://www.gitbook.com/cover/book/mongkuen/react.jpg?build=1470682429235",
        "__v": 0
      },
      {
        "_id": "59f8752e3c77d92d2a98ac30",
        "name": "Team5",
        "password": "1a2b",
        "picture": "/uploads/805c40fe96cca78618e38246c4e3ec661509530914684.jpeg",
        "__v": 0
      }
    ]

    this.state = {
      quizId: '',
    };

    this.socket = '';

  }

    /**
   * update local state with global state
   * @param {*} state store state
   */
  updateState(state) {
    this.setState({ quizId: state.quizId})
  }

  componentDidMount() {
    this.updateState(store.getState());
    this.socket = socketIOClient(config.backend);

    this.socket.on("new-question", data => {
      if (data.quizId === this.state.quizId) {
        axios.get(config.backend + '/categories/' + data.question.category).then(response => {
          store.dispatch({ type: actions.CHANGE_CURRENT_QUESTION, payload: { question: data.question, category: response.data } })
        })
      }
    });

    /**
     * on new quiz (or question in this case...)
     * update score table
     */
    this.socket.on("new-question", data => {
      if (data.quizId === this.state.quizId) {
        axios.get(config.backend + '/quizzes/' + data.quizId).then(response => {
          store.dispatch({type: actions.UPDATE_TABLE, payload: response.data.rounds})
        })
      }
    });
  }
  render() {
    return (
      <div className="container-full">
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
                  <p className="smallText bold">
                    Rounds played: 1 <br /><br /> Current Question: 12
                            </p>
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

          <TeamCardComponent teamName="correct" status="correct" answer="answer" teamImage="https://www.gitbook.com/cover/book/mongkuen/react.jpg?build=1470682429235" />
          <TeamCardComponent teamName="wrong" status="wrong" answer="answer" teamImage="https://www.gitbook.com/cover/book/mongkuen/react.jpg?build=1470682429235" />
          <TeamCardComponent teamName="review" status="review" answer="answer" teamImage="https://www.gitbook.com/cover/book/mongkuen/react.jpg?build=1470682429235" />

          {this.teams.map((team, i) => {
            return <TeamCardComponent teamName={team.name} status="" answer="answer" teamImage={team.picture} key={i} />;
          })}
        </div>
      </div>
    );
  }
}

export default ScoreboardComponent;
