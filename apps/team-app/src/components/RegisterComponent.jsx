import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import SubmitButton from './shared/SubmitButton'
import DropZoneComponent from './DropZoneComponent'
import axios from "axios"
import { Redirect } from 'react-router'

class RegisterComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      imageFile: '',
      name: '',
      password: '',
      backendUrl: 'http://localhost:8001',
      fireRedirect: false
    }
    this.handler = this.handler.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handler(image) {
    this.setState({ imageFile: image })
  }

  /**
   * form submit
   * @param {*} event
   */
  handleSubmit(event) {
    event.preventDefault();

    var formData = new FormData();
    formData.append("teamImage", this.state.imageFile);
    axios.post(this.state.backendUrl + '/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      axios.post(this.state.backendUrl + '/teams', {
        name: this.state.name,
        password: this.state.password,
        picture: response.data
      }).then(response => {
        this.setState({ fireRedirect: true })
      }).catch(error => {
        alert("Team not created");
      })
    }).catch((error) => {
      alert("Couldn't upload image, please pick another one");
    })
  }

  /**
   * change state on keypress
   * @param {input} field name of the state key to change
   * @param {*} event
   */
  handleChange(field, event) {
    this.setState({ [field]: event.target.value });
  }

  render() {
    const { name, password, imageFile } = this.state;
    return (
      <div className="container">
        <TitleComponent title="Quizzer - Register Team" />
        <div className="text-center">
          <div className="col-lg-3" />
          <BoxComponent size="6">
            <h2 className="header-distance">Register</h2>
            <p>Please enter your team info below</p>
            <DropZoneComponent handler={this.handler} />
            <form onSubmit={this.handleSubmit}>
              <div className="col-lg-12">
                <div className="form-group">
                  <input type="text" name="name" className="form-control" id="name" placeholder="team name" onChange={this.handleChange.bind(this, "name")} />
                </div>
                <div className="form-group">
                  <input type="password" name="password" className="form-control" id="password" placeholder="password" onChange={this.handleChange.bind(this, "password")} />
                </div>
              </div>
              <div className="col-lg-12" style={{ paddingTop: '40px' }}>
                <SubmitButton text="Register!" enabled={name.length > 0 && password.length > 0 && imageFile !== undefined} />
              </div>
            </form>
            {this.state.fireRedirect && (
              <Redirect to={'/'} />
            )}
          </BoxComponent>
        </div>
      </div>


    );
  }
}

export default RegisterComponent;
