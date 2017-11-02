import actions from './actions.js'

var appState = {
  backendUrl: 'http://localhost:8001',
  quizId: '',
  password: '',
  category: '',
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
    default:
      return state;
  }
}
