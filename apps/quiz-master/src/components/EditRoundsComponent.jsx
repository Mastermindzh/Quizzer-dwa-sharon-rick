import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import ButtonComponent from './shared/ButtonComponent'
import QuestionListComponent from './QuestionListComponent'
import store from "../store/RootStore";
import axios from "axios"
import config from '../config.js'
import { Redirect } from 'react-router'


class EditRoundsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quizId: '',
      currentRound: '',
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

  componentWillMount(){
    this.updateState(store.getState());
    console.log("root state: "+JSON.stringify(store.getState()))
  }
  componentDidMount() {

    axios.get(config.backend + '/quizzes/59fef6ea016a434986710f9c').then(data => {
      var currentRound = data.data.rounds.length -1;
      this.setState({currentRound: data.data.rounds[currentRound]})
      console.log(data.data.rounds.length)
      console.log("current round: "+JSON.stringify(data.data.rounds[currentRound]))

    }).catch(error => {
      console.log("error: "+error);

    })

    //todo get round number
    //todo for current questions, display what questions are done, and what question can be started.
    //todo for that round get questions that are in the round
    //display categories of this round
    //todo get all available questions
    //todo click on questions -> add to list
    //list.length == 12 -> full!




  }

  /**
   * update local state with global state
   * @param {*} state store state
   */
  updateState(state) {
    this.setState({quizId: state.quizId, teams: state.teams})
  }


  redirectBack(event) {
    event.preventDefault()
    this.setState({redirectBack: true});
  }


  render() {

    return (

      <div className="container-full">
        {this.state.redirectBack && (
          <Redirect to={'/'} />
        )}
        <TitleComponent title="Quizzer - Edit Rounds" />
        <h2 className="text-center">Round 1</h2>
        <div className="col-md-4 wobbly-border">
          <p>Current Questions</p>
          <QuestionListComponent questions={["1", "2"]}/>
        </div>
        <div className="col-md-8 wobbly-border">
          <p>Available Questions</p>
          <QuestionListComponent questions={["abc", "def"]}/>
          <ButtonComponent path={"/"} text={"Add Selected Question"}/>
        </div>
        <button className='btn btn-large wobbly-border dashed thin' onClick={this.redirectBack.bind(this)}>back</button>
      </div>

    );
  }
}

export default EditRoundsComponent;
