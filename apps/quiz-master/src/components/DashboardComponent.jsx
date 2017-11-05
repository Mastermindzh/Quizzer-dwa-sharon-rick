import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import RowComponent from "./shared/RowComponent.jsx";
import createQuizz from "../icons/create_quizz.png";
import appliedTeams from "../icons/applied_teams.png";
import endQuiz from "../icons/end_quiz.png";
import currentQuestion from "../icons/current_question.png";
import addRound from "../icons/add_quiz.png";
import editRound from "../icons/edit_quiz.png";
import { Redirect } from 'react-router'

class DashboardComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createQuiz: false,
      viewTeams: false,
      endQuiz: false,
      currentQuestion: false,
      addRound: false,
      editRound: false,
      login: false
    }
  };

  handleCreateQuiz(event) {
    event.preventDefault();
    this.setState({ createQuiz: true })
  }

  handleViewTeams(event) {
    event.preventDefault();
    this.setState({ viewTeams: true })
  }
  handleEndQuiz(event) {
    event.preventDefault();
    this.setState({ endQuiz: true })
  }
  handlecurrentQuestion(event) {
    event.preventDefault();
    this.setState({ currentQuestion: true })
  }
  handleAddRound(event) {
    event.preventDefault();
    this.setState({ addRound: true })
  }
  handleEditRound(event) {
    event.preventDefault();
    this.setState({ editRound: true })
  }
  handleLogin(event) {
    event.preventDefault();
    this.setState({ login: true })
  }

  render() {

    return (


      <div className="container-full">
        {/*check for redirects  */}
        {this.state.createQuiz && (
          <Redirect to={'/createQuiz'} />
        )}
        {this.state.viewTeams && (
          <Redirect to={'/appliedTeams'} />
        )}
        {this.state.endQuiz && (
          <Redirect to={'/'} />
        )}
        {this.state.currentQuestion && (
          <Redirect to={'/currentQuestion'} />
        )}
        {this.state.addRound && (
          <Redirect to={'/addRound'} />
        )}
        {this.state.editRound && (
          <Redirect to={'/editQuizz'} />
        )}
        {this.state.login && (
          <Redirect to={'/login'} />
        )}
        <TitleComponent title="Quizzer - Dashboard" />
        <RowComponent>
          <BoxComponent>
            <RowComponent>
              <div className="col-lg-4">
                <BoxComponent size="10">
                  <div className="center-content">
                    <a onClick={this.handleCreateQuiz.bind(this)}>
                      <img src={createQuizz} className="button-image" alt="Create Quizz" />
                      <h2>Create Quizz Night</h2>
                    </a>
                  </div>
                </BoxComponent>
              </div>
              <div className="col-lg-4">
                <BoxComponent size="10">
                  <div className="center-content">
                    <a onClick={this.handleViewTeams.bind(this)}>
                      <img src={appliedTeams} className="button-image" alt="Applied Teams" />
                      <h2>View Applied Teams</h2>
                    </a>
                  </div>
                </BoxComponent>
              </div>
              <div className="col-lg-4">
                <BoxComponent size="10">
                  <div className="center-content">
                    <a onClick={this.handleEndQuiz.bind(this)}>
                      <img src={endQuiz} className="button-image" alt="End Quizz" />
                      <h2>End Quizz Night</h2>
                    </a>
                  </div>
                </BoxComponent>
              </div>


              <hr className="drawnLine" />

              <div className="col-lg-4">
                <BoxComponent size="10">
                  <div className="center-content">
                    <a onClick={this.handlecurrentQuestion.bind(this)}>
                      <img src={currentQuestion} className="button-image" alt="Current Question" />
                      <h2>Current Question</h2>
                    </a>
                  </div>
                </BoxComponent>
              </div>
              <div className="col-lg-4">
                <BoxComponent size="10">
                  <div className="center-content">
                    <a onClick={this.handleAddRound.bind(this)}>
                      <img src={addRound} className="button-image" alt="Add Round" />
                      <h2>Add Quizz Round</h2>
                    </a>
                  </div>
                </BoxComponent>
              </div>
              <div className="col-lg-4">
                <BoxComponent size="10">
                  <div className="center-content">
                    <a onClick={this.handleEditRound.bind(this)}>
                      <img src={editRound} className="button-image" alt="Edit Quizz Rounds" />
                      <h2>Edit Quizz Rounds</h2>
                    </a>
                  </div>
                </BoxComponent>
              </div>
              <div className="col-lg-4">
                <BoxComponent size="10">
                  <div className="center-content">
                    <a onClick={this.handleLogin.bind(this)}>
                      <img src={editRound} className="button-image" alt="Log in" />
                      <h2>Change current quiz</h2>
                    </a>
                  </div>
                </BoxComponent>
              </div>
            </RowComponent>
          </BoxComponent>
        </RowComponent>
      </div>

    );
  }
}

export default DashboardComponent;
