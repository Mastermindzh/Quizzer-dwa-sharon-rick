import React, {Component} from "react";
import BoxComponent from './shared/BoxComponent'
import store from "../store/RootStore";
import axios from "axios"
import config from '../config.js'

class QuestionListComponent extends Component {



  constructor(props) {
    super(props);
    this.state = {
      questions:''
    };
  }


  componentWillMount(){
    console.log(this.props)
    this.setState({questions: this.props.questions})
    var currentQuestions = this.props.questions.map(question => {
      axios.get(config.backend + '/questions/'+question.questionId).then(data => {
        console.log("data: "+data)

      }).catch(error => {
        console.log("error: "+error);

      })
    })

    console.log("current questions: "+currentQuestions)
    return currentQuestions
  }

  render() {

    return (

      <div>
        {this.props.questions.length > 0 && this.props.questions.map(function(value, i) {
          return <BoxComponent key={i}><p key={i}>{value}</p></BoxComponent>;
        })
        }
      </div>
    );
  }
}

export default QuestionListComponent;
