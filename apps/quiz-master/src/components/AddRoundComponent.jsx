import React, {Component} from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import RowComponent from "./shared/RowComponent";
import CategoriesComponent from "./CategoriesComponent";
import AvailableCategoriesComponent from "./AvailableCategoriesComponent";
import {Redirect} from 'react-router'

import store from "../store/RootStore";
import axios from "axios"
import config from '../config.js'

// import actions from '../reducers/actions.js'


class AddRoundComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      quizId: '',
      selectedCategories: [],
      playedCategories: '',
      availableCategories: '',
      fireRedirect: false,
      redirectBack: false
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

  componentWillMount() {
    this.updateState(store.getState())
  }

  componentDidMount() {

    if (this.state.quizId !== '') {
      axios.get(config.backend + "/categories").then(categories => {
        this.setState({availableCategories: categories.data})
        console.log(JSON.stringify(this.state.availableCategories))
      }).catch(err => {
        console.log(err);
        alert("Couldn't get available categories.")
      })

      axios.get(config.backend + "/previouslyPlayedCategories/" + this.state.quizId).then(response => {
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
    } else {
      alert("Quiz is not available.")
    }

  }

  /**
   * update local state with global state
   * @param {*} state store state
   */
  updateState(state) {
    new Promise((fullfill, reject) => {
      this.setState({quizId: state.quizId, selectedCategories: state.selectedCategories}, function () {
        fullfill();
      })
    })

  }


  redirectBack(event) {
    event.preventDefault()
    this.setState({redirectBack: true});
  }

  handleStartRound(event) {
    event.preventDefault();
    console.log("=====should be starting new round now")
    console.log(this.state.selectedCategories)
    axios.post(config.backend + '/quizzes/'+ this.state.quizId +'/newRound', 
      this.state.selectedCategories
    ).then(response => {
      console.log(response);
      this.setState({fireRedirect: true})
    }).catch(error => {
      console.log("error: " + error);
      alert("something went wrong");
    })
  }


  render() {

    return (

      <div className="container">
        {this.state.redirectBack && (
          <Redirect to={'/'}/>
        )}
        {this.state.fireRedirect && (
          <Redirect to={'/editQuizz'}/>
        )}
        <TitleComponent title="Quizzer - Add Round"/>
        <RowComponent>
          <div className="col-md-4">
            <BoxComponent>
              <CategoriesComponent list={this.state.playedCategories}/>
            </BoxComponent>
          </div>
          <div className="col-md-8">
            <BoxComponent>
              {this.state.availableCategories.length > 0 && this.state.availableCategories.map((category, i) => {
                return <AvailableCategoriesComponent key={i} category={category}/>
              })}
            </BoxComponent>
          </div>
        </RowComponent>
        <button className='btn btn-large wobbly-border dashed thin' onClick={this.redirectBack.bind(this)}>back</button>
        <div className="text-center">

          <button className='btn btn-large wobbly-border dashed thin' onClick={this.handleStartRound.bind(this)}
                  disabled={this.state.selectedCategories.length !== 3}>Start Round
          </button>
        </div>
      </div>

    );
  }
}

export default AddRoundComponent;
