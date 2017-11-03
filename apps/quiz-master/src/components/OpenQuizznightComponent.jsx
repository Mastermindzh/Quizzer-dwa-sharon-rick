import React, {Component} from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import ButtonComponent from './shared/ButtonComponent'
import axios from "axios"
import config from '../config.js'
import RowComponent from "./shared/RowComponent";
import SubmitButton from "./shared/SubmitButton";
import { Redirect } from 'react-router'


class OpenQuizznightComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      code: '',
      fireRedirect: ''
    };
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
   * form submit, create quizznight
   * @param {*} event
   */
  handleSubmit(event) {
    event.preventDefault();
    axios.post(config.backend + '/quizzes', {
      name: this.state.name,
      code: this.state.code,
      status: 'Open'
    }).catch(error => {
      console.log(error);
      alert("Quiz not created!");
    }).then(response => {
      this.setState({fireRedirect: true})
    })
  }

  render() {
    const { name, code} = this.state;
    return (

      <div className="container">
        <TitleComponent title="Quizzer - Create Quizznight"/>
        <div className="text-center">
          <div className="col-lg-3"/>
          <BoxComponent size="6">
            <h2 className="header-distance">Create Quizz</h2>
            <form onSubmit={this.handleSubmit}>
            <p>Please enter a name for your Quizz</p>
            <div className="col-lg-12">
              <div className="form-group">
                <input type="text" name="name" className="form-control" id="name" placeholder="Awesome Quizz" onChange={this.handleChange.bind(this, "name")}/>
              </div>
              <p>Create a unique code for your quizz</p>
              <div className="form-group">
                <input type="text" name="code" className="form-control" id="code" placeholder="1234" onChange={this.handleChange.bind(this, "code")}/>
              </div>
            </div>
            <div className="col-lg-12" style={{paddingTop: '40px'}}>
              <SubmitButton text="Open Quizznight!" enabled={name.length > 0 && code.length > 0}/>
            </div>
            </form>
            {this.state.fireRedirect && (
              <Redirect to={'/'} />
            )}
          </BoxComponent>
        </div>
        <RowComponent>
          <ButtonComponent path={"/"} text={"Back"}/>
        </RowComponent>
      </div>

    );
  }
}

export default OpenQuizznightComponent;
