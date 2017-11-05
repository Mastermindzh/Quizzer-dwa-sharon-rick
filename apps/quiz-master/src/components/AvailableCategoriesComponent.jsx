import React, {Component} from "react";
import BoxComponent from './shared/BoxComponent'
import store from "../store/RootStore";
import actions from '../reducers/actions.js'

class AvailableCategoriesComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizId: '',
      _id: '',
      name: '',
      bgColor: '',
      selectedCategories:[]
    };
    store.subscribe(() => {
      this.updateState(store.getState());
    })
    this.updateState = this.updateState.bind(this);
  }

  componentDidMount() {
    this.updateState(store.getState());
    this.setState({_id: this.props.category._id, name: this.props.category.name})
  }

  /**
   * update local state with global state
   * @param {*} state store state
   */
  updateState(state) {
    this.setState({quizId: state.quizId, selectedCategories: state.selectedCategories})
  }

  selectCategory(event) {
    event.preventDefault()
    this.setState({bgColor: "#5eff6e"})
    if(!this.state.selectedCategories.includes(this.state._id) && this.state.selectedCategories.length < 3){
      store.dispatch({type: actions.ADD_CATEGORY, payload: this.state._id})
    }

  }

  render() {

    return (

      <div>
        <div className="row">
          <BoxComponent key={this.state._id} size={"1"} bgColour={this.state.bgColor}>
            <div className="col-md-8">
              <p>{this.state.name}</p>
            </div>
            <div className="col-md-4">
              <button className='btn btn-large wobbly-border dashed thin' onClick={this.selectCategory.bind(this)}>
                Select
              </button>
            </div>
          </BoxComponent>
        </div>
      </div>
    );
  }
}

export default AvailableCategoriesComponent;
