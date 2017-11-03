import React, {Component} from "react";
import ButtonComponent from "./shared/ButtonComponent";
import BoxComponent from "./shared/BoxComponent";
import RowComponent from "./shared/RowComponent";

class TeamComponent extends Component {
  render() {
    return (
      <div>
        {this.props.teams.map(function (team) {
          return (
            <RowComponent>
              <BoxComponent key={team.name}>
                <div className="col-md-2">
                  <img src={""+team.picture} alt="Team"/>
                </div>
                <div key={team.name} className="col-md-6 team-description">
                  <h3 key={team.name}>{team.name}</h3>
                </div>
                <div className="col-md-4">
                  <ButtonComponent key={team.name} path={"/"} text={"Accept!"}/>
                  <ButtonComponent key={team.name} path={"/"} text={"Reject!"}/>
                </div>
              </BoxComponent>
            </RowComponent>
          )
        })
        }
      </div>
    );
  }
}

export default TeamComponent;
