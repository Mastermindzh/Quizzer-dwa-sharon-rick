import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import ButtonComponent from './shared/ButtonComponent'


class LoginComponent extends Component {

  render() {

    return (

      <div className="container">
        <TitleComponent title="Quizzer - Team Login" />
        <div className="text-center">
          <div className="col-lg-3" />
          <BoxComponent size="6">
            <h2 className="header-distance">Login</h2>
            <p>Please enter your team info below</p>

            <div className="col-lg-12">
              <div className="form-group">
                <input type="text" name="name" className="form-control" id="name" placeholder="team name" />
              </div>
              <div className="form-group">
                <input type="password" name="password" className="form-control" id="password" placeholder="password" />
              </div>
              <div className="form-group">
                <input type="text" name="pubpass" className="form-control" id="pubPassword" placeholder="pub password" />
              </div>
            </div>
            <div className="col-lg-12" style={{ paddingTop: '40px' }}>
              <ButtonComponent path="/play" text="Log in!" />
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
