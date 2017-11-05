import actions from './actions.js'

var appState = {
  backendUrl: 'http://localhost:8001',
  currentQuestion: {},
  quizId: '',
  teamName: '',
  teams: [],
  selectedCategories: []
}

export default function rootReducer(state = appState, action) {
  switch (action.type) {
    case actions.ADD_TEAM:
      return {
        ...state,
        teams: state.teams.concat(action.payload)
      };
    case actions.QUIZID:
      return {
        ...state,
        quizId: action.payload
      };
    case actions.ADD_CATEGORY:
      return {
        ...state,
        selectedCategories: state.selectedCategories.concat(action.payload)
      };
    default:
      return state;
  }
}
