import actions from './actions.js'

var appState = {
  backendUrl: 'http://localhost:8001',
  quizId: '',
  password: '',
  category: '',
  rounds: [],
  teams: [],
  chartScores: [],
  loggedIn: false,
  question: {
    question: "no question yet"
  }
}

export default function rootReducer(state = appState, action) {
  switch (action.type) {
    case actions.LOGIN:
      return { ...state,
        quizId: action.payload,
        loggedIn: true
      }

    case actions.CHANGE_CURRENT_QUESTION:
      return { ...state,
        question: action.payload.question,
        category: action.payload.category
      }
    case actions.UPDATE_TABLE:
      return { ...state,
        rounds: action.payload.rounds,
        teams: action.payload.teams,
      }
    case actions.UPDATE_CHART:
      return {...state,
        chartScores: action.payload
      }
    default:
      return state;
  }
}
