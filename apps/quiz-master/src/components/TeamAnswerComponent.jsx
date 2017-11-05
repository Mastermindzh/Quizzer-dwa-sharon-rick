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
      status: ''
    }

    this.judge = this.judge.bind(this)
  }

  componentDidMount(){
    axios.get(config.backend + "/teams/" + this.props.team).then(team => {
      this.setState({teamName: team.data.name})
    })

    this.setState({status: this.props.status})
  }

  judge(status){
    let body = {
      teamId: this.props.team,
      judgement: status
    }
    axios.put(config.backend + "/quizzes/" + this.props.quiz + '/judge', body).then(response => {
      this.setState({status: status})
    })
  }

  render() {

    let bgStatus = '#cc3737'
    if(this.state.status){
      bgStatus = '#5eff6e'
    }

    return (
      <RowComponent>
        <BoxComponent bgColour={bgStatus}>
          <div className="col-md-8">
            <h3>{this.state.teamName}</h3>
            <p>{this.props.answer}</p>
          </div>
          <div className="col-md-4">
             <button className='btn btn-large wobbly-border dashed thin' onClick={this.judge.bind(this,true)}>Accept</button>
             <button className='btn btn-large wobbly-border dashed thin' onClick={this.judge.bind(this,false)}>Reject</button>
          </div>
        </BoxComponent>
      </RowComponent>
    );
  }
}

export default TeamAnswerComponent;
