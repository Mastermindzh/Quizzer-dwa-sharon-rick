import React, { Component } from "react";

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
    alert(this.props.team);
    // this.updateState(store.getState());
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
