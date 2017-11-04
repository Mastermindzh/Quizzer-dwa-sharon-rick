import React, { Component } from "react";
import axios from "axios"
import config from '../config.js'

class TeamCardComponent extends Component {

  constructor(){
    super();
    this.state = {
      status: '',
      teamImage: '',
      teamName: '',
      answer: ''
    }
  }

  componentDidMount() {
    // alert(this.props.team);
    axios.get(config.backend + "/teams/" + this.props.team).then(response =>{
      this.setState({teamName: response.data.name, teamImage: config.backend + "/" + response.data.picture})
    }).catch(err => {
      console.log("team doesn't exist");
    })
  }

  render() {
    return (
      <div className="col-lg-3">
        <div className={`row wobbly-border ${this.state.status}`}>
          <div className="col-lg-2 wobbly-border profile-picture" style={{height: '60px', width: '60px', padding: '5px'}}>
            <img src = {this.state.teamImage} alt="the team" style={{maxHeight: '50px', maxWidth: '50px', marginTop: '-2px'}} />
          </div>
          <div className="col-lg-10 team-description">
            <h3>{this.state.teamName}</h3>
            <p>
              {this.state.answer}
            </p>
          </div>
        </div>
      </div>

    );
  }
}

export default TeamCardComponent;
