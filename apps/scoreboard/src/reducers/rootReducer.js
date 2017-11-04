import actions from './actions.js'

var appState = {
  backendUrl: 'http://localhost:8001',
  quizId: '',
  password: '',
  category: '',
  rounds: [],
  teams: [],
  chartScores: [],
  firstLogin: false,
  loggedIn: false,
  redirectWinner: false,
  question: {
    question: "no question yet"
  }
}

export default function rootReducer(state = appState, action) {
  switch (action.type) {
    case actions.LOGIN:
      return { ...state,
        quizId: action.payload,
        loggedIn: true,
        firstLogin: true
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
      return { ...state,
        chartScores: action.payload
      }
    case actions.FIRE_FIRST_LOGIN:
      return { ...state,
        firstLogin: false
      }
    case actions.FIRE_WINNER:
      return { ...state,
        redirectWinner: true
      }
    default:
      return state;
  }
}
