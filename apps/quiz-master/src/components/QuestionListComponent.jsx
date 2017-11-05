import React, {Component} from "react";
import BoxComponent from './shared/BoxComponent'
import axios from "axios"
import config from '../config.js'

class QuestionListComponent extends Component {


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
    if (this.props.status === 'Closed') this.setState({closed: true});
    if (this.props.status === 'Open') this.setState({playing: true});
    this.setState({id: this.props.id, question: this.props.question});

    axios.get(config.backend + '/questions/' + this.props.id).then(data => {
      this.setState({question: data.data.question})
    }).catch(error => {
      console.log("error: " + error);
    })

  }

  handleStartQuestion(event){
    event.preventDefault()


    this.props.handleStartQuestion(this.state.id);
  }

  componentDidMount(){

  }
  render() {

    return (

      <div>
        <BoxComponent>
          <p>{this.state.question}</p>
          {!this.state.closed && !this.state.playing && <button className='btn btn-large wobbly-border dashed thin' onClick={this.handleStartQuestion.bind(this)}>
            Start
          </button>}
        </BoxComponent>
      </div>
  );
  }
  }

  export default QuestionListComponent;
