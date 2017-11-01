import React, {Component} from "react";
import ButtonComponent from "./shared/ButtonComponent";
import BoxComponent from "./shared/BoxComponent";
import RowComponent from "./shared/RowComponent";

class TeamComponent extends Component {
  render() {
    return (
      <RowComponent>
        <BoxComponent>
          <div className="col-md-2">
            <img src={this.props.image} alt="Team Image" />
          </div>
          <div className="col-md-6 team-description">
            <h3>{this.props.name}</h3>
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

export default TeamComponent;
