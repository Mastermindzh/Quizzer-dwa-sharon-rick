import React, { Component } from "react";

class TeamCardComponent extends Component {

  render() {
    return (
      <div className="col-lg-3">
        <div className={`row wobbly-border ${this.props.status}`}>
          <div className="col-lg-2 wobbly-border profile-picture" style={{height: '60px', width: '60px', padding: '5px'}}>
            <img src = {this.props.teamImage} alt="the team" style={{maxHeight: '50px', maxWidth: '50px', marginTop: '-2px'}} />
          </div>
          <div className="col-lg-10 team-description">
            <h3>{this.props.teamName}</h3>
            <p>
              {this.props.answer}
            </p>
          </div>
        </div>
      </div>

    );
  }
}

export default TeamCardComponent;
