import React, {Component} from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import TeamComponent from './TeamComponent.jsx';
import ButtonComponent from './shared/ButtonComponent'
import RowComponent from "./shared/RowComponent.jsx";

class ViewAppliedTeamsComponent extends Component {

  render() {

    return (

      <div className="container-full">
        <TitleComponent title="Quizzer - Team Applications"/>
          <BoxComponent>

            {/* For each team that applies: */}
            <TeamComponent image={"Placeholder"} name={"Placeholder"}/>
            <TeamComponent image={"Placeholder"} name={"Placeholder"}/>
          </BoxComponent>
        <ButtonComponent path={"/"} text={"Back"}/>
        </div>

    );
  }
}

export default ViewAppliedTeamsComponent;
