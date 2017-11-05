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
    console.log("quizid: "+this.state.quizId)
    axios.get(config.backend + '/quizzes/'+this.state.quizId).then(data => {
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


    if(this.state.roundNumber !==''){
      //get available questions
      axios.get(config.backend + '/questions').then(data => {
        let questions = data.data.filter(question => {
          return !(this.state.categories.includes(question.category) || this.state.quizQuestions.includes(question.category))
        })

        this.setState({availableQuestions: questions})
      }).catch(error => {
        console.log("error: " + error);
      })


    } else{
      alert("This quiz has no rounds yet, go create one!")
    }



  }

  updateState(state) {
    new Promise((fullfill, reject) => {
      this.setState({quizId: state.quizId}, function () {
        fullfill();
      })
    })

  }

  handleAddQuestion(question) {
    console.log("question: "+question)
    if (this.state.currentQuestions.length === 12) {
      alert("You can only have 12 questions in a round");
    } else {
      axios.post(config.backend + '/quizzes/'+this.state.quizId+'/'+this.state.roundNumber+'/addQuestion',
        {question: question}
      ).then(response => {
        console.log("in add question response")
        this.setState({fireRedirect: true})
      }).catch(error => {
        console.log("error: " + error);
        alert("something went wrong");
      })



    }
  }

  handleStartQuestion(questionId){
    var otherQIsPlaying = this.state.currentQuestions.
    //todo check if there is no other playing question
    //todo set it in the database
    //todo websocket message fired
    //todo redirect to current question screen
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
        )}{this.state.fireRedirect && (<Redirect to={'/editQuizz'} />)}
        <TitleComponent title="Quizzer - Edit Rounds"/>
        <h2 className="text-center">Round {this.state.roundNumber}</h2>
        <div className="col-md-4 wobbly-border">
          <p>Current Questions</p>
          {this.state.currentQuestions && this.state.currentQuestions.map((question, i) => {
            return <QuestionListComponent key={i} id={question.questionId} status={question.status} handleStartQuestion={this.handleStartQuestion.bind(this)}/>
          })}
        </div>
        <div className="col-md-8 wobbly-border">
          <p>Available Questions</p>
          {this.state.availableQuestions && this.state.availableQuestions.map((question, i) => {
            return <AvailableQuestionsComponent key={i} id={question._id} question={question.question} handleAddQuestion={this.handleAddQuestion.bind(this)}/>
          })}
          <ButtonComponent path={"/"} text={"Add Selected Question"}/>
        </div>
        <button className='btn btn-large wobbly-border dashed thin' onClick={this.redirectBack.bind(this)}>back</button>
      </div>

    );
  }
}

export default EditRoundsComponent;
