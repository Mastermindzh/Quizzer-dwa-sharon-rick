import React, {Component} from "react";
import BoxComponent from './shared/BoxComponent'

class AvailableCategoriesComponent extends Component {

  render() {

    return (

      <div>
        <h3>Available Categories</h3>
      {this.props.list.map(function(value) {
          return <BoxComponent size={"1"}><p>{value}</p></BoxComponent>;
        })
      }
      </div>
    );
  }
}

export default AvailableCategoriesComponent;
