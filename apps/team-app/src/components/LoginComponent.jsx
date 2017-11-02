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

class LoginComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      name: '',
      password: '',
      quizId: '',
      pubPassword: '',
      fireRedirect: false,
      state: "login"
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

  /**
   * form submit
   * @param {*} event
   */
  handleSubmit(event) {
    event.preventDefault();

    axios.post(config.backend + '/login', {
      name: this.state.name,
      password: this.state.password,
      quizId: this.state.quizId,
      pubPass: this.state.pubPassword
    }).then(response => {
      store.dispatch({ type: actions.CHANGE_CURRENT_QUESTION, payload: response.data.question });
      store.dispatch({ type: actions.SET_QUIZ_ID, payload: response.data.quizId })
      this.setState({ fireRedirect: true })
    }).catch(error => {
      alert("no dice");
    })
  }

  render() {
    const { name, password, pubPassword, quizId } = this.state;
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
                <p>Please enter your team info below
                  <br />
                  59f9928e0287d21fc55e0668
                </p>
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