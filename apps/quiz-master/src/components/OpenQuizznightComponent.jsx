import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import ButtonComponent from './shared/ButtonComponent'


class LoginComponent extends Component {

  render() {

    return (

      <div className="container">
        <TitleComponent title="Quizzer - Create Quizznight" />
        <div className="text-center">
          <div className="col-lg-3" />
          <BoxComponent size="6">
            <h2 className="header-distance">Create Quizz</h2>
            <p>Please enter a name for your Quizz</p>

            <div className="col-lg-12">
              <div className="form-group">
                <input type="text" name="name" className="form-control" id="code" placeholder="Awesome Quizz" />
              </div>
              <p>Create a unique code for your quizz</p>
              <div className="form-group">
                <input type="text" name="quizcode" className="form-control" id="quizcode" placeholder="1234" />
              </div>
            </div>
            <div className="col-lg-12" style={{ paddingTop: '40px' }}>
              <ButtonComponent path="/" text="Open Quizznight!" />
            </div>
          </BoxComponent>
        </div>
        <ButtonComponent path={"/"} text={"Back"}/>
      </div>

    );
  }
}

export default LoginComponent;
