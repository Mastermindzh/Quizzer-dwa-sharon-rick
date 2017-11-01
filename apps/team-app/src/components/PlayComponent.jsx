import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import ButtonComponent from './shared/ButtonComponent'
import socketIOClient from "socket.io-client";

class PlayComponent extends Component {

  constructor() {
    super();
    this.state = {
      question: 'Who wrote the Twilight series of novels?',
      endpoint: "http://localhost:8001/my-private-quiz"
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);

    socket.on("new-question", data => this.setState({question: data}));
  }

  render() {

    return (
      <div className="container">
        <TitleComponent title="Quizzer - Team app" />
        <div className="col-lg-12 text-center">

          <div className="col-lg-3" />
          <BoxComponent size="6">
            <h2 className="header-distance">Question</h2>
            <p>{this.state.question}</p>

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
