import React, {Component} from "react";
import BoxComponent from "./shared/BoxComponent"
import TitleComponent from "./shared/TitleComponent"
import ButtonComponent from "./shared/ButtonComponent"

class LoginComponent extends Component {

    render() {

    return (

      <div className="container">
        <TitleComponent title="Quizzer - Scoreboard Login" />
        <div className="text-center">
          <div className="col-lg-3" />
          <BoxComponent size="6">
            <h2 className="header-distance">Log in</h2>
            <p>Please enter the login code for your scoreboard</p>

            <div className="col-lg-12">
              <div className="form-group">
                <input type="text" name="login" className="form-control" id="login" placeholder="scoreboard code" />
              </div>
            </div>
            <div className="col-lg-12" style={{ paddingTop: '40px' }}>
              <ButtonComponent path="/scores" text="Log in!" />
            </div>
          </BoxComponent>
        </div>
      </div>

    );
  }
}

export default LoginComponent;
