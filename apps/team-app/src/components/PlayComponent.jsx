import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import ButtonComponent from './shared/ButtonComponent'

class PlayComponent extends Component {

  render() {

    return (
      <div className="container">
        <TitleComponent title="Quizzer - Team app" />
        <div className="col-lg-12 text-center">

          <div className="col-lg-3" />
          <BoxComponent size="6">
            <h2 className="header-distance">Question</h2>
            <p>Who wrote the Twilight series of novels?</p>

            <div className="col-lg-12">
              <div className="form-group">
                <input type="text" name="answer" className="form-control" id="answer" placeholder="Enter your answer" />
              </div>

            </div>
            <div className="col-lg-12" style={{ paddingTop: '40px' }}>
              <ButtonComponent path="/play" text="Submit answer" />
            </div>
          </BoxComponent>
        </div>
      </div>

    );
  }
}

export default PlayComponent;
