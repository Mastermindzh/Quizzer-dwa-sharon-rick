import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import ButtonComponent from './shared/ButtonComponent'
import DropZoneComponent from './DropZoneComponent'

class RegisterComponent extends Component {

  render() {

    return (
      <div className="container">
        <TitleComponent title="Quizzer - Register Team" />
        <div className="text-center">
          <div className="col-lg-3" />
          <BoxComponent size="6">
            <h2 className="header-distance">Register</h2>
            <p>Please enter your team info below</p>
            <DropZoneComponent />

            <div className="col-lg-12">
              <div className="form-group">
                <input type="text" name="name" className="form-control" id="name" placeholder="team name" />
              </div>
              <div className="form-group">
                <input type="password" name="password" className="form-control" id="password" placeholder="password" />
              </div>
            </div>
            <div className="col-lg-12" style={{ paddingTop: '40px' }}>
              <ButtonComponent path="/" text="Register!" />
            </div>

            {/* we need to clear this, some elements float :)  */}
          </BoxComponent>
        </div>
      </div>
    );
  }
}

export default RegisterComponent;
