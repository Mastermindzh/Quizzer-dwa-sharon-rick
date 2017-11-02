import actions from './actions.js'

var appState = {
  backendUrl: 'http://localhost:8001',
  currentQuestion: {},
  quizId: ''
}

export default function rootReducer(state = appState, action) {
  switch (action.type) {
    case actions.CHANGE_CURRENT_QUESTION:
      return {...state, currentQuestion: action.payload}
    case actions.SET_QUIZ_ID:
      return {...state, quizId: action.payload}
    default:
      return state;
  }
}

