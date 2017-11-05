import React, { Component } from "react";
import ButtonComponent from "./shared/ButtonComponent";
import BoxComponent from "./shared/BoxComponent";
import RowComponent from "./shared/RowComponent";
import config from '../config.js'
import axios from "axios"

class TeamAnswerComponent extends Component {

  constructor() {
    super();
    this.state = {
      teamName: '',
    }

  }

  componentDidMount(){
    axios.get(config.backend + "/teams/" + this.props.team).then(team => {
      this.setState({teamName: team.data.name})
    })
  }

  render() {
    return (
      <RowComponent>
        <BoxComponent>
          <div className="col-md-8">
            <h3>{this.state.teamName}</h3>
            <p>{this.props.answer}</p>
          </div>
          <div className="col-md-4">
            <ButtonComponent path={"/"} text={"Accept!"} />
            <ButtonComponent path={"/"} text={"Reject!"} />
          </div>
        </BoxComponent>
      </RowComponent>
    );
  }
}

export default TeamAnswerComponent;
