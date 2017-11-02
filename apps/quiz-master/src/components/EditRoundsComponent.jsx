import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import ButtonComponent from './shared/ButtonComponent'
import QuestionListComponent from './QuestionListComponent'


class EditRoundsComponent extends Component {

  render() {

    return (

      <div className="container-full">
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
        <ButtonComponent path={"/"} text={"Back"}/>
      </div>

    );
  }
}

export default EditRoundsComponent;
