import React, { Component } from 'react';
import BoxComponent from './shared/BoxComponent'
import store from "../store/RootStore"

class QuestionComponent extends Component {


  constructor() {
    super();
    this.state = {
      question: {question: 'no question yet'},
      quizId: '',
      category: {name: 'no category'},
    };

    this.socket = '';

    store.subscribe(() => {
      this.updateState(store.getState());
    })
    this.updateState = this.updateState.bind(this);
  }

  /**
   * update local state with global state
   * @param {*} state store state
   */
  updateState(state) {
    this.setState({ question: state.question, quizId: state.quizId , category: state.category})
  }

  componentDidMount() {
    this.updateState(store.getState());
  }

  render() {
    return (
      <BoxComponent size="12">
        <h4 className="center" style={
          {
            background: 'repeating-linear-gradient(45deg,mediumpurple,mediumpurple 10px,mediumpurple 10px,mediumpurple 20px)',
            padding: '5px',
            marginTop: '-10px'
          }}>
          From: {this.state.category.name}
            </h4>
        <h2 className="center">{this.state.question.question}</h2>
      </BoxComponent>
    );
  }
}

export default QuestionComponent;
