import React, {Component} from "react";
import ButtonComponent from "./shared/ButtonComponent";
import BoxComponent from "./shared/BoxComponent";
import RowComponent from "./shared/RowComponent";

class QuestionComponent extends Component {
  render() {
    return (
      <div className="text-center">
        <RowComponent>
          <BoxComponent size="12">
            <h2>Question: {this.props.question}</h2>
            <h3>Answer: {this.props.answer}</h3>
          </BoxComponent>
        </RowComponent>
      </div>
    );
  }
}

export default QuestionComponent;
