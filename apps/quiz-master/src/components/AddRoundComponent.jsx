import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import ButtonComponent from './shared/ButtonComponent'
import RowComponent from "./shared/RowComponent";
import CategoriesComponent from "./CategoriesComponent";
import AvailableCategoriesComponent from "./AvailableCategoriesComponent";

import store from "../store/RootStore";
import axios from "axios"
import config from '../config.js'
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

  categoryCall(category) {
    return new Promise((fullfill, reject) => {
      axios.get(config.backend + "/categories/" + category).then(category => {
        fullfill(category.data.name)
      }).catch(err => {
        reject()
      })
    });
  }

  componentDidMount() {
    //todo: make sure you get the quiz is
    this.updateState(store.getState());
    console.log("root state: "+JSON.stringify(store.getState()))
    console.log("state: "+JSON.stringify(this.state))
    var playedCategories = []
    //todo make quizid dynamic here, so put it in local/root state.
    axios.get(config.backend + "/previouslyPlayedCategories/59fb8f061640e25320b1b2eb").then(response => {
      console.log("response: " + JSON.stringify(response))
      var playedCategories = response.data.map(category => {
        return this.categoryCall(category)
      })

      Promise.all(playedCategories)
        .then(results => {
          this.setState({
            playedCategories: results
          })
        })
        .catch(e => {
          console.error(e);
        })

    }).catch(err => {
      console.log("team doesn't exist");
      console.log(err);
    })
  }




  /**
   * update local state with global state
   * @param {*} state store state
   */
  updateState(state) {
    this.setState({quizId: state.quizId})
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
