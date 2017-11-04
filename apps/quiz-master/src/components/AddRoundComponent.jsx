import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import ButtonComponent from './shared/ButtonComponent'
import RowComponent from "./shared/RowComponent";
import CategoriesComponent from "./CategoriesComponent";
import AvailableCategoriesComponent from "./AvailableCategoriesComponent";
import { Redirect } from 'react-router'


class AddRoundComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectBack: false
    };
  }

  redirectBack(event) {
    event.preventDefault()
    this.setState({redirectBack: true});
  }

  render() {

    return (

      <div className="container">
        {this.state.redirectBack && (
          <Redirect to={'/'} />
        )}
        <TitleComponent title="Quizzer - Add Round" />
        <RowComponent>
          <div className="col-md-4">
            <BoxComponent>
              <CategoriesComponent list={["soccer", "Literature", "Arts"]}/>
            </BoxComponent>
          </div>
          <div className="col-md-8">
            <BoxComponent>
              <AvailableCategoriesComponent list={["A", "B", "C", "D", "E"]}/>
            </BoxComponent>
          </div>
        </RowComponent>
        <button className='btn btn-large wobbly-border dashed thin' onClick={this.redirectBack.bind(this)}>back</button>
        <div className="text-center">

        <ButtonComponent path={"/"} text={"Add New Round"}/>
      </div>
      </div>

    );
  }
}

export default AddRoundComponent;
