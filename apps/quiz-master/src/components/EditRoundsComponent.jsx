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
      roundNumber: '',
      currentQuestions: '',
      availableQuestions:'',
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
    //get current round questions
    axios.get(config.backend + '/quizzes/59fef6ea016a434986710f9c').then(data => {
      var currentRound = data.data.rounds.length;
      var questions = data.data.rounds[currentRound-1].questions.map(question => {
        return question;
      });
      this.setState({roundNumber: currentRound, currentQuestions: questions})
    }).catch(error => {
      console.log("error: " + error);

    });
    //get available questions
    axios.get(config.backend + '/questions').then(data => {
      var questions = data.data;
      this.setState({availableQuestions: questions})
    }).catch(error => {
      console.log("error: " + error);
    })



    //display categories of this round
    //todo get all available questions
    //todo click on questions -> add to list
    //list.length == 12 -> full!


  }

  updateState(state) {
    new Promise((fullfill, reject) => {
      this.setState({quizId: state.quizId}, function () {
        fullfill();
      })
    })

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
          {this.state.currentQuestions && this.state.currentQuestions.map((question, i)=>{
            return <QuestionListComponent key={i} id={question.questionId} status={question.status}/>
          })}

        </div>
        <div className="col-md-8 wobbly-border">
          <p>Available Questions</p>

          {this.state.availableQuestions && this.state.availableQuestions.map((question, i)=>{
            return <AvailableQuestionsComponent key={i} id={question.questionId} question={question.question}/>
          })}

          {/*<QuestionListComponent questions={["abc", "def"]}/>*/}
          <ButtonComponent path={"/"} text={"Add Selected Question"}/>
        </div>
        <button className='btn btn-large wobbly-border dashed thin' onClick={this.redirectBack.bind(this)}>back</button>
      </div>

    );
  }
}

export default EditRoundsComponent;
