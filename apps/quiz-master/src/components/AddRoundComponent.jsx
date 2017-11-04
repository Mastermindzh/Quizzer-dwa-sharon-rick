import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import ButtonComponent from './shared/ButtonComponent'
import RowComponent from "./shared/RowComponent";
import CategoriesComponent from "./CategoriesComponent";
import AvailableCategoriesComponent from "./AvailableCategoriesComponent";

import store from "../store/RootStore";
// import axios from "axios"
// import config from '../config.js'
// import { Redirect } from 'react-router'
// import actions from '../reducers/actions.js'


class AddRoundComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quizId: '',
      selectedCategories: '',
      playedCategories:'',
      fireRedirect: false
    };
    this.socket = '';
    store.subscribe(() => {
      console.log("root state updated, update local accordingly   ")
      console.log(store.getState())
      this.updateState(store.getState());
    })
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.updateState(store.getState());
  }

  /**
   * update local state with global state
   * @param {*} state store state
   */
  updateState(state) {
    this.setState({quizId: state.quizId, teams: state.teams})
  }

  previouslyPlayed(){
    console.log("in previouslyplayed")

    this.setState({playedCategories: categories})
  }


  render() {

    return (

      <div className="container">
        <TitleComponent title="Quizzer - Add Round" />
        <RowComponent>
          <div className="col-md-4">
            <BoxComponent>
              <CategoriesComponent list={this.state.playedCategories}/>
            </BoxComponent>
          </div>
          <div className="col-md-8">
            <BoxComponent>
              <AvailableCategoriesComponent list={["A", "B", "C", "D", "E"]}/>
            </BoxComponent>
          </div>
        </RowComponent>
        <ButtonComponent path={"/"} text={"Back"}/>
        <div className="text-center">

        <ButtonComponent path={"/"} text={"Add New Round"}/>
      </div>
      </div>

    );
  }
}

export default AddRoundComponent;
