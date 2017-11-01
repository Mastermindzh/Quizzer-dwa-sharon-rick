import React, { Component } from "react";

class CategoriesComponent extends Component {

  render() {

    return (
      <div>
      <h3>Previous played categories</h3>
      <ul>
        {this.props.list.map(function(value){
          return <li>{value}</li>;
        })}
      </ul>
      </div>
    );
  }
}

export default CategoriesComponent;
