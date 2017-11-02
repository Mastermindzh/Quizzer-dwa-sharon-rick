import React, {Component} from "react";
import BoxComponent from './shared/BoxComponent'

class QuestionListComponent extends Component {

  render() {

    return (

      <div>
        {this.props.questions.map(function(value, i) {
          return <BoxComponent key={i}><p key={i}>{value}</p></BoxComponent>;
        })
        }
      </div>
    );
  }
}

export default QuestionListComponent;
