import React, {
  Component
} from 'react';
import {
  Switch,
  Route
} from 'react-router-dom'
import LoginComponent from './components/LoginComponent.jsx'
import ScoreboardComponent from './components/ScoreboardComponent.jsx'
import WinnerComponent from './components/WinnerComponent.jsx'
import socketIOClient from "socket.io-client";
import store from "./store/RootStore"
import config from './config.js'
import actions from './reducers/actions.js'
import axios from "axios"

class App extends Component {

  constructor() {
    super();

    this.state = {
      quizId: '',
      firstLogin: false,
      fireRedirect: false
    };

    store.subscribe(() => {
      this.updateState(store.getState());
    })

    this.socket = '';
    this.updateState = this.updateState.bind(this);
    this.quizUpdate = this.quizUpdate.bind(this);
    this.updateChart = this.updateChart.bind(this);
    this.updateTable = this.updateTable.bind(this);
    this.updateCurrentQuestion = this.updateCurrentQuestion.bind(this);
  }
  /**
   * update local state with global state
   * @param {*} state store state
   */
  updateState(state) {
    this.setState({
      quizId: state.quizId,
      teams: state.teams,
      firstLogin: state.firstLogin
    })

    if (this.state.firstLogin) {
      store.dispatch({
        type: actions.FIRE_FIRST_LOGIN,
        payload: {}
      })
      this.quizUpdate({
        quizId: store.getState().quizId
      })
    }
  }

  componentDidMount() {
    this.updateState(store.getState());
    this.socket = socketIOClient(config.backend);

    this.socket.on("new-question", data => {
      this.quizUpdate(data)
    });

    this.socket.on("update-table", data => {
      this.updateTable(data);
    })

    // this.socket.on("new-question", data => {
    //   this.updateCurrentQuestion(data)
    // })

    this.socket.on("round-end", data => {
      this.updateChart(data)
    })

    this.socket.on("quiz-end", data => {
      if (data.quizId === this.state.quizId) {
        store.dispatch({
          type: actions.FIRE_WINNER,
          payload: {}
        })
      }
    })
  }

  quizUpdate(data) {
    this.updateTable(data);
    this.updateCurrentQuestion(data);
    this.updateChart(data);
  }

  updateTable(data) {
    if (this.isOurQuiz(data, this.state.quizId)) {
      axios.get(config.backend + '/quizzes/' + data.quizId).then(response => {
        store.dispatch({
          type: actions.UPDATE_TABLE,
          payload: {
            rounds: response.data.rounds,
            teams: response.data.teams
          }
        })
      })
    }
  }

  updateCurrentQuestion(data) {
    if (this.isOurQuiz(data, this.state.quizId)) {
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
  }

  updateChart(data) {
    if (this.isOurQuiz(data, this.state.quizId)) {
      axios.get(config.backend + '/quizzes/' + data.quizId + "/score").then(response => {
        store.dispatch({
          type: actions.UPDATE_CHART,
          payload: response.data
        })
      })
    }
  }


  /**
   * checks whether quiz is ours
   * @param {*} data
   * @param {*} validator
   */
  isOurQuiz(data, validator) {
    return data.quizId === validator
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' component={LoginComponent}/>
        <Route path='/scores' component={ScoreboardComponent}/>
        <Route path='/winner' component={WinnerComponent}/>
      </Switch>
    )
  }
}

export default App;
