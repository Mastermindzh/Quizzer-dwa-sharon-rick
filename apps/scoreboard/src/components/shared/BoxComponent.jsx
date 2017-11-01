import React, {Component} from "react";

class BoxComponent extends Component {


    isBetween(number, lower = 0, upper = 13){
      return number > lower && number < upper
    }

    render() {

      let classes = "wobbly-border wobbly-border-form";
      let styles = {}

      // box sizing
      if(this.isBetween(this.props.size,0,13)){
        classes += ` col-lg-${this.props.size}`
      }

      // backgrund colour
      if(this.props.bgColour){
        styles.backgroundColor = this.props.bgColour
      }

      if(this.props.colour){
        styles.color = this.props.colour;
      }

      return (
        <div className={classes} style={styles}>
            {this.props.children}
            <div style = {{clear:'both'}} />
        </div>
      );
    }
}

export default BoxComponent;
