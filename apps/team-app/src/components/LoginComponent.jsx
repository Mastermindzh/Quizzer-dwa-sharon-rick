import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import ButtonComponent from './shared/ButtonComponent'
import SubmitButton from './shared/SubmitButton'
import { Redirect } from 'react-router'
import axios from "axios"
import store from "../store/RootStore"
import actions from '../reducers/actions.js'
import config from '../config.js'
import socketIOClient from "socket.io-client";
import loader from "../icons/loader.gif";

class LoginComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      code: '',
      fireRedirect: false,
      state: "login",
      waitingForApproval: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goToPlayComponent = this.goToPlayComponent.bind(this);
  }

  /**
   * change state on keypress
   * @param {input} field name of the state key to change
   * @param {*} event
   */
  handleChange(field, event) {
    this.setState({ [field]: event.target.value });
  }

  /**
   * form submit
   * @param {*} event
   */
  handleSubmit(event) {
    event.preventDefault();

    axios.post(config.backend + '/login', {
      name: this.state.name,
      password: this.state.password,
      code: this.state.code
    }).then(response => {
      if (response.data.message === 'team application sent') {
        this.setState({ waitingForApproval: true })
        this.socket = socketIOClient(config.backend);
        this.socket.on("quiz-start", data => {
          if (data.quizId === this.state.quizId) {
            this.goToPlayComponent(response);
          }
        });
      } else {
        this.goToPlayComponent(response);
      }
    }).catch(error => {
      console.log("error: " + error);
      alert("no dice");
    })
  }

  goToPlayComponent(response) {
    store.dispatch({ type: actions.SET_QUIZ_ID, payload: response.data.quizId })
    store.dispatch({ type: actions.SET_TEAM_NAME, payload: this.state.name })
    this.setState({ fireRedirect: true })
  }

  render() {
    const { name, password, code } = this.state;
    return (
      <div className="container">

        {/*check for redirect  */}
        {this.state.fireRedirect && (
          <Redirect to={'/play'} />
        )}

        <TitleComponent title="Quizzer - Team Login" />
        <div className="text-center">
          <div className="col-lg-3" />
          <BoxComponent size="6">
            <h2 className="header-distance">Login</h2>

            {this.state.state === "login" ? (
              <div>

                {this.state.waitingForApproval && (
                  <div>
                    <p>Waiting for approval</p>
                    <img src={loader} alt="loading image" />
                  </div>
                )}
                {!this.state.waitingForApproval && (
                  <div>
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
                          <input type="text" name="quizId" className="form-control" id="code" placeholder="Quiz Code" onChange={this.handleChange.bind(this, "code")} />
                        </div>
                        <div className="col-lg-12" style={{ paddingTop: '40px' }}>
                          <SubmitButton text="Log in!" enabled={name.length > 0 && password.length > 0 && code.length > 0} />
                        </div>

                      </form>
                    </div>
                    <div className="col-lg-12" style={{ paddingTop: '40px' }}>
                      <ButtonComponent path="/register" text="Register" />
                    </div>
                  </div>
                )}
              </div>
            ) : (
                <div>
                  {this.state.state === "pending" ? (
                    <p>Login rejected.</p>
                  ) : (
                      <div></div>
                    )}
                </div>
              )}

          </BoxComponent>
        </div>
      </div>

    );
  }
}

export default LoginComponent;
