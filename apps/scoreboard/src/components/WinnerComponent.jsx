import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'

class WinnerComponent extends Component {

  componentDidMount() {

    // we need a timeout because this method is executed BEFORE a render :O
    setTimeout(function() { this.setState({
      bronze: '420px',
      silver: '565px',
      gold: '730px'
    })}.bind(this));
  }

  constructor(props) {
    super(props)
    this.state = {
      bronze: '0px',
      silver: '0px',
      gold: '0px'
    }
  }

  render() {

    return (
      <div>
        <TitleComponent title="Quizzer - Final Score!" />

        <div className="row">
          <div className="competition-podium well">

            <div className="podium-block bronze">
              <div className="name">Player 1</div>
              <div className="podium" style={{ height: this.state.bronze }}><span>500</span></div>
            </div>
            <div className="podium-block gold">
              <div className="name">Player 3</div>
              <div className="podium" style={{ height: this.state.gold }}><span>1500</span></div>
            </div>
            <div className="podium-block silver">
              <div className="name">Player 2</div>
              <div className="podium" style={{ height: this.state.silver }}><span>750</span></div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default WinnerComponent;
