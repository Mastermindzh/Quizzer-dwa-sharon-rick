import React, {Component} from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import ButtonComponent from './shared/ButtonComponent'
import RowComponent from "./shared/RowComponent.jsx";

class LoginComponent extends Component {

  render() {

    return (

      <div className="container-full">
        <TitleComponent title="Quizzer - View Applied Teams"/>
        </div>

    );
  }
}

export default LoginComponent;
