import React, { Component } from "react";

class CategoriesComponent extends Component {

  render() {

    return (
      <div>
      <h3>Previous played categories</h3>
      <ul>
        {this.props.list.map(function(value, i){
          return <li key={i}>{value}</li>;
        })}
      </ul>
      </div>
    );
  }
}

export default CategoriesComponent;
