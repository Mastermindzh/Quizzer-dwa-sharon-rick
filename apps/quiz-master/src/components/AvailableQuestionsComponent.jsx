import React, {Component} from "react";
import BoxComponent from './shared/BoxComponent'

class AvailableQuestionsComponent extends Component {


  constructor(props) {
    super(props);
    this.state = {
      question: '',
      id: '',
      closed: false,
      playing: false
    };
  }


  componentWillMount() {
    this.setState({id: this.props.id, question: this.props.question});
  }

  componentDidMount(){
    console.log("state2: "+JSON.stringify(this.state))
  }
  render() {

    return (

      <div>
        <BoxComponent>
          <p>{this.state.question}</p>
          <button className='btn btn-large wobbly-border dashed thin' >
            Add
          </button>
        </BoxComponent>
      </div>
    );
  }
}

export default AvailableQuestionsComponent;
