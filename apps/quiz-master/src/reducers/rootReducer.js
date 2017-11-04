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
    case actions.CHANGE_CURRENT_QUESTION:
      var teams2 = appState.teams.push(action.payload)
      return { ...state,
        teams: teams2
      };
      break;
    default:
      return state;
  }
}
