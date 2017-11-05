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
      currentQuestions: [],
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


  loadAvailableQuestions() {
    if (this.state.roundNumber !== '') {
      //get available questions
      axios.get(config.backend + '/questions').then(data => {
        let questions = data.data.filter(question => {
          return !(this.state.categories.includes(question.category) || this.state.quizQuestions.includes(question.category))
        })

        this.setState({availableQuestions: questions})
      }).catch(error => {
        console.log("error: " + error);
      })


    } else {
      alert("This quiz has no rounds yet, go create one!")
    }


  }

  componentDidMount() {
    console.log("quizid: " + this.state.quizId)
    axios.get(config.backend + '/quizzes/' + this.state.quizId).then(data => {
      var currentRound = data.data.rounds.length;
      //get current round questions
      var questions = data.data.rounds[currentRound - 1].questions.map(question => {
        return question;
      });
      //get all questions in rounds
      if (data.data.rounds.questions !== []) {
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
        }, this.loadAvailableQuestions)
      } else {
        this.loadAvailableQuestions();
      }
    }).catch(error => {
      console.log("error: " + error);
    });


  }

  updateState(state) {
    new Promise((fullfill, reject) => {
      this.setState({quizId: state.quizId}, function () {
        fullfill();
      })
    })

  }

  handleAddQuestion(question) {
    console.log("question: " + question)
    if (this.state.currentQuestions.length === 12) {
      alert("You can only have 12 questions in a round");
    } else {
      axios.post(config.backend + '/quizzes/' + this.state.quizId + '/' + this.state.roundNumber + '/addQuestion',
        {question: question}
      ).then(response => {
        console.log("in add question response: "+JSON.stringify(response.data))


        axios.get(config.backend + '/quizzes/' + this.state.quizId).then(data => {
          var currentRound = data.data.rounds.length;
          //get current round questions
          var questions = data.data.rounds[currentRound - 1].questions.map(question => {
            return question;
          });


          this.setState({currentQuestions: questions})
          console.log(JSON.stringify(this.state.currentQuestions))
        })


        //todo rerender available stuff
        //todo why has it decided to add other questions than I selected


      }).catch(error => {
        console.log("error: " + error);
        alert("Something went wrong.");
      })


    }
  }

  handleStartQuestion(questionId) {
    var myPromise = new Promise((resolve, reject) => {
      this.state.currentQuestions.forEach(question => {
        if (question.status.toLowerCase() === 'open') {
          resolve(true);
        }
      });
      reject(false)
    });

    myPromise.then(response => {
      if (response[0]) {
        console.log("other q is playing, so this is not allowed.");
        alert("Another question is being played, you can't start a new one right now.")
      } else {

        //todo set it in the database
        //todo websocket message fired
        //todo redirect to current question screen

        axios.post(config.backend + '/quizzes/' + this.state.quizId + '/' + this.state.roundNumber + '/addQuestion',
          {question: questionId}
        ).then(response => {
          console.log("in update question response")
          // this.setState({fireRedirect: true})
        }).catch(error => {
          console.log("error: " + error);
          alert("something went wrong");
        })


      }
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
        )}{this.state.fireRedirect && (<Redirect to={'/editQuizz'}/>)}
        <TitleComponent title="Quizzer - Edit Rounds"/>
        <h2 className="text-center">Round {this.state.roundNumber}</h2>
        <button className='btn btn-large wobbly-border dashed thin' onClick={this.redirectBack.bind(this)}>back</button>
        <div className="col-md-4 wobbly-border">
          <p>Current Questions</p>
          {this.state.currentQuestions && this.state.currentQuestions.map((question, i) => {
            return <QuestionListComponent key={i} id={question.questionId} status={question.status}
                                          handleStartQuestion={this.handleStartQuestion.bind(this)}/>
          })}
        </div>
        <div className="col-md-8 wobbly-border">
          <p>Available Questions</p>
          {this.state.availableQuestions && this.state.availableQuestions.map((question, i) => {
            return <AvailableQuestionsComponent key={i} id={question._id} question={question.question}
                                                handleAddQuestion={this.handleAddQuestion.bind(this)}/>
          })}
          <ButtonComponent path={"/"} text={"Add Selected Question"}/>
        </div>
      </div>

    );
  }
}

export default EditRoundsComponent;
