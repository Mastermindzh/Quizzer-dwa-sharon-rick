import React, {Component} from "react";
import TitleComponent from './shared/TitleComponent'
import ButtonComponent from './shared/ButtonComponent'
import QuestionListComponent from './QuestionListComponent'
import store from "../store/RootStore";
import axios from "axios"
import config from '../config.js'
import {Redirect} from 'react-router'
import AvailableQuestionsComponent from "./AvailableQuestionsComponent";


class EditRoundsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quizId: '',
      categories: '',
      quizQuestions: '',
      roundNumber: '',
      currentQuestions: '',
      availableQuestions: '',
      fireRedirect: false,
      redirectBack: false
    };
    this.socket = '';
    store.subscribe(() => {
      console.log("root state updated, update local accordingly   ")
      console.log(store.getState())
      this.updateState(store.getState());
    })
    this.updateState = this.updateState.bind(this);
  }

  componentWillMount() {
    this.updateState(store.getState())

  }


  componentDidMount() {
    axios.get(config.backend + '/quizzes/59fef6ea016a434986710f9c').then(data => {
      var currentRound = data.data.rounds.length;
      //get current round questions
      var questions = data.data.rounds[currentRound - 1].questions.map(question => {
        return question;
      });
      //get all questions in rounds
      var quizQuestions = data.data.rounds.map(round => {
        round.questions.map(question => {
          return question.questionId
        })
      })

      this.setState({
        roundNumber: currentRound,
        currentQuestions: questions,
        categories: data.data.rounds[currentRound - 1].categories,
        quizQuestions: quizQuestions
      })
      console.log(this.state.categories)
    }).catch(error => {
      console.log("error: " + error);

    });
    //get available questions
    axios.get(config.backend + '/questions').then(data => {
      let questions = data.data.filter(question => {
        return !(this.state.categories.includes(question.category) || this.state.quizQuestions.includes(question.category))
      })

      this.setState({availableQuestions: questions})
    }).catch(error => {
      console.log("error: " + error);
    })


    //todo click on questions -> add to list


  }

  updateState(state) {
    new Promise((fullfill, reject) => {
      this.setState({quizId: state.quizId}, function () {
        fullfill();
      })
    })

  }

  handleAddQuestion(event, question) {
    event.preventDefault()
    console.log("question: "+question)
    if (this.state.currentQuestions.length === 12) {
      alert("You can only have 12 questions in a round");
    } else {
      //todo add question to round
    }
  }


  redirectBack(event) {
    event.preventDefault()
    this.setState({redirectBack: true});
  }


  render() {

    return (
      <div className="container-full">
        {this.state.redirectBack && (
          <Redirect to={'/'}/>
        )}
        <TitleComponent title="Quizzer - Edit Rounds"/>
        <h2 className="text-center">Round {this.state.roundNumber}</h2>
        <div className="col-md-4 wobbly-border">
          <p>Current Questions</p>
          {this.state.currentQuestions && this.state.currentQuestions.map((question, i) => {
            return <QuestionListComponent key={i} id={question.questionId} status={question.status}/>
          })}
        </div>
        <div className="col-md-8 wobbly-border">
          <p>Available Questions</p>
          {this.state.availableQuestions && this.state.availableQuestions.map((question, i) => {
            return <AvailableQuestionsComponent key={i} id={question.id} question={question.question} handleAddQuestion={this.handleAddQuestion.bind(this)}/>
          })}
          <ButtonComponent path={"/"} text={"Add Selected Question"}/>
        </div>
        <button className='btn btn-large wobbly-border dashed thin' onClick={this.redirectBack.bind(this)}>back</button>
      </div>

    );
  }
}

export default EditRoundsComponent;
