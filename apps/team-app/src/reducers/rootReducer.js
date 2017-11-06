import actions from './actions.js'

var appState = {
  backendUrl: 'http://localhost:8001',
  currentQuestion: 'No question yet',
  quizId: '',
  teamName: ''
}

export default function rootReducer(state = appState, action) {
  switch (action.type) {
    case actions.CHANGE_CURRENT_QUESTION:
      return { ...state,
        currentQuestion: action.payload.question,
      }
    case actions.SET_QUIZ_ID:
      return { ...state,
        quizId: action.payload
      }
    case actions.SET_TEAM_NAME:
      return { ...state,
        teamName: action.payload
      }
    default:
      return state;
  }
}
