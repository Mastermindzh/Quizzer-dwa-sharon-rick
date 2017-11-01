import React, {Component} from "react";
import ButtonComponent from "./shared/ButtonComponent";
import BoxComponent from "./shared/BoxComponent";
import RowComponent from "./shared/RowComponent";

class TeamAnswerComponent extends Component {
  render() {
    return (
      <RowComponent>
        <BoxComponent>
          <div className="col-md-8">
            <h3>{this.props.name}</h3>
            <p>{this.props.answer}</p>
          </div>
          <div className="col-md-4">
            <ButtonComponent path={"/"} text={"Accept!"}/>
            <ButtonComponent path={"/"} text={"Reject!"}/>
          </div>
        </BoxComponent>
      </RowComponent>
    );
  }
}

export default TeamAnswerComponent;
