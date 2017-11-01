import React, {Component} from "react";
import BoxComponent from './shared/BoxComponent'

class QuestionListComponent extends Component {

  render() {

    return (

      <div>
        {this.props.questions.map(function(value) {
          return <BoxComponent><p>{value}</p></BoxComponent>;
        })
        }
      </div>
    );
  }
}

export default QuestionListComponent;
