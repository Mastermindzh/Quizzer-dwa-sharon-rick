import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import ButtonComponent from './shared/ButtonComponent'
import TeamAnswerComponent from "./TeamAnswerComponent";
import QuestionComponent from "./QuestionComponent";


class CurrentQuestionComponent extends Component {

  render() {

    return (

      <div className="container-full">
        <TitleComponent title="Quizzer - Current Question" />
        <QuestionComponent question={"What is the answer to everything?"} answer={"42"}/>
        {/* For each team answer: */}
        <TeamAnswerComponent name={"Team1"} answer={"???"}/>
        <ButtonComponent path={"/"} text={"Back"}/>
      </div>

    );
  }
}

export default CurrentQuestionComponent;
