import actions from './actions.js'

var appState = {
  backendUrl: 'http://localhost:8001',
  currentQuestion: {},
  quizId: '',
  teamName: '',
  teams:[]
}

export default function rootReducer(state = appState, action) {
  switch (action.type) {
    case actions.ADD_TEAM:
      return {
        ...state,
        teams: action.payload
      };
    case actions.QUIZID:
      console.log("actions.QUIZID , NEW ID: " + action.payload)
      return {
        ...state,
        quizId: action.payload
      };
    default:
      return state;
  }
}
