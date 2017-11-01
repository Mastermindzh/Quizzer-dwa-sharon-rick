import React, {Component} from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import ButtonComponent from './shared/ButtonComponent'
import RowComponent from "./shared/RowComponent.jsx";
import createQuizz from "../icons/create_quizz.png";
import appliedTeams from "../icons/applied_teams.png";
import endQuiz from "../icons/end_quiz.png";
import currentQuestion from "../icons/current_question.png";
import addRound from "../icons/add_quiz.png";
import editRound from "../icons/edit_quiz.png";

class LoginComponent extends Component {

  render() {

    return (

      <div className="container-full">
        <TitleComponent title="Quizzer - Dashboard"/>
        <RowComponent>
          <BoxComponent>
            <RowComponent>
              <div className="col-lg-4">
                <BoxComponent size="10">
                  <div className="center-content">
                    <a href={"/createQuiz"}>
                      <img src={createQuizz} className="button-image" alt="Create Quizz"/>
                      <h2>Create Quizz Night</h2>
                    </a>
                  </div>
                </BoxComponent>
              </div>
              <div className="col-lg-4">
                <BoxComponent size="10">
                  <div className="center-content">
                    <a href={"/appliedTeams"}>
                      <img src={appliedTeams} className="button-image" alt="Applied Teams"/>
                      <h2>View Applied Teams</h2>
                    </a>
                  </div>
                </BoxComponent>
              </div>
              <div className="col-lg-4">
                <BoxComponent size="10">
                  <div className="center-content">
                    <img src={endQuiz} className="button-image" alt="End Quizz"/>
                    <h2>End Quizz Night</h2>
                  </div>
                </BoxComponent>
              </div>


              <hr className="drawnLine"/>

              <div className="col-lg-4">
                <BoxComponent size="10">
                  <div className="center-content">
                    <a href={"/currentQuestion"}>
                      <img src={currentQuestion} className="button-image" alt="Current Question"/>
                      <h2>Current Question</h2>
                    </a>
                  </div>
                </BoxComponent>
              </div>
              <div className="col-lg-4">
                <BoxComponent size="10">
                  <div className="center-content">
                    <a href={"/addRound"}>
                      <img src={addRound} className="button-image" alt="Add Round"/>
                      <h2>Add Quizz Round</h2>
                    </a>
                  </div>
                </BoxComponent>
              </div>
              <div className="col-lg-4">
                <BoxComponent size="10">
                  <div className="center-content">
                    <a href={"/editQuizz"}>
                      <img src={editRound} className="button-image" alt="Edit Quizz Rounds"/>
                      <h2>Edit Quizz Rounds</h2>
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

export default LoginComponent;
