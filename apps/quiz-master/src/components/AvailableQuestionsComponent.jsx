import React, {Component} from "react";
import BoxComponent from './shared/BoxComponent'

class AvailableQuestionsComponent extends Component {


  constructor(props) {
    super(props);
    this.state = {
      question: '',
      id: ''
    };
  }

  addQuestion(event){
    event.preventDefault();
    console.log("id: "+this.state.id)
    this.props.handleAddQuestion(this.state.id)
  }


  componentWillMount() {
    this.setState({id: this.props.id, question: this.props.question});
  }

  componentDidMount(){

  }
  render() {

    return (

      <div>
        <BoxComponent>
          <p>{this.state.question}</p>
          <button className='btn btn-large wobbly-border dashed thin' onClick={this.addQuestion.bind(this)}>
            Add
          </button>
        </BoxComponent>
      </div>
    );
  }
}

export default AvailableQuestionsComponent;
