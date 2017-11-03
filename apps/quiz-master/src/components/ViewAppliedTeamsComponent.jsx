import React, {Component} from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import TeamComponent from './TeamComponent.jsx';
import ButtonComponent from './shared/ButtonComponent'

class ViewAppliedTeamsComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      fireRedirect: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {

    return (

      <div className="container-full">
        <TitleComponent title="Quizzer - Team Applications"/>
          <BoxComponent>

            {/* For each team that applies: */}
            <TeamComponent list={this.state.teams}/>
          </BoxComponent>
        <ButtonComponent path={"/"} text={"Back"}/>
        </div>

    );
  }
}

export default ViewAppliedTeamsComponent;
