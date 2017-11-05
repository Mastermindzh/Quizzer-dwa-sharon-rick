import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
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
      quizId: '',
      pubPassword: '',
      fireRedirect: false,
      state: "login"
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateState = this.updateState.bind(this);

    store.subscribe(() => {
      if (!this.state.fireRedirect) {
        this.updateState(store.getState())
      }
    })
  }

  /**
   * update local state with global state
   * @param {*} state store state
   */
  updateState(state) {
    this.setState({ fireRedirect: store.getState().loggedIn })
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

    axios.post(config.backend + '/login/scoreboard', {
      code: this.state.pubPassword
    }).then(response => {
      store.dispatch({ type: actions.LOGIN, payload: response.data })
    }).catch(error => {
      alert("no dice");
    })
  }

  render() {
    const { pubPassword } = this.state;
    return (
      <div className="container">
        {this.state.fireRedirect && (
          <Redirect to={'/scores'} />
        )}
        <TitleComponent title="Quizzer - Scoreboard Login" />
        <div className="text-center">
          <div className="col-lg-3" />
          <BoxComponent size="6">
            <h2 className="header-distance">Log in</h2>
            <p>Please enter the login code for your scoreboard</p>
            <div className="col-lg-12">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input type="text" name="pubpass" className="form-control" id="pubPassword" placeholder="Quiz code" onChange={this.handleChange.bind(this, "pubPassword")} />
                </div>
                <div className="col-lg-12" style={{ paddingTop: '40px' }}>
                  <SubmitButton text="Log in!" enabled={pubPassword.length > 0} />
                </div>
              </form>
            </div>

          </BoxComponent>
        </div>
      </div>

    );
  }
}

export default LoginComponent;
