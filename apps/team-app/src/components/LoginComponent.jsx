import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import ButtonComponent from './shared/ButtonComponent'
import SubmitButton from './shared/SubmitButton'
import socketIOClient from "socket.io-client";

class LoginComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      quizId: '',
      pubPassword: '',
      backendUrl: 'http://localhost:8001',
      fireRedirect: false,
      endpoint: "59f9928e0287d21fc55e0668"
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * change state on keypress
   * @param {input} field name of the state key to change
   * @param {*} event
   */
  handleChange(field, event) {
    this.setState({ [field]: event.target.value });
  }

  // componentDidMount() {
  //   const { backendUrl, endpoint } = this.state;
  //   const socket = socketIOClient(backendUrl + '/' + endpoint);

  //   socket.on("new-question", data => this.setState({question: data}));
  // }
  // componentDidMount() {
  //   const { endpoint } = "http://localhost:8001/my-private-quiz";
  //   const socket = socketIOClient(endpoint);

  //   socket.on("new-question", data => this.setState({question: data}));
  // }
  // componentDidMount(){

  //   const { endpoint } = 'http://localhost:8001/my-private-quiz';
  //   const socket = socketIOClient(endpoint);

  //   console.log(socket);



  // }
  /**
   * form submit
   * @param {*} event
   */
  handleSubmit(event) {
    event.preventDefault();

    const { backendUrl, endpoint } = this.state;
    const socket = socketIOClient(backendUrl + '/' + endpoint);

    socket.emit('authenticate', this.state);

    // send websocket join request on submitted pub quiz

    // server -> check whether quizz is running -> reject
    // server -> check credentials -> wrong -> send reject
    // server -> broadcast join

    // quiz-master -> accept -> add to quiz
    // quiz-master -> broadcast accept

    // receive accept -> play
  }

  render() {
    const { name, password, pubPassword, quizId } = this.state;
    return (

      <div className="container">
        <TitleComponent title="Quizzer - Team Login" />
        <div className="text-center">
          <div className="col-lg-3" />
          <BoxComponent size="6">
            <h2 className="header-distance">Login</h2>
            <p>Please enter your team info below</p>

            <div className="col-lg-12">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input type="text" name="name" className="form-control" id="name" placeholder="team name" onChange={this.handleChange.bind(this, "name")} />
                </div>
                <div className="form-group">
                  <input type="password" name="password" className="form-control" id="password" placeholder="password" onChange={this.handleChange.bind(this, "password")} />
                </div>
                <div className="form-group">
                  <input type="text" name="quizId" className="form-control" id="quizId" placeholder="quizId" onChange={this.handleChange.bind(this, "quizId")} />
                </div>
                <div className="form-group">
                  <input type="text" name="pubpass" className="form-control" id="pubPassword" placeholder="pub password" onChange={this.handleChange.bind(this, "pubPassword")} />
                </div>
                <div className="col-lg-12" style={{ paddingTop: '40px' }}>
                  <SubmitButton text="Log in!" enabled={name.length > 0 && password.length > 0 && quizId.length > 0 && pubPassword.length > 0} />
                </div>
              </form>
            </div>
            <div className="col-lg-12" style={{ paddingTop: '40px' }}>
              <ButtonComponent path="/register" text="Register" />
            </div>
          </BoxComponent>
        </div>
      </div>

    );
  }
}

export default LoginComponent;
