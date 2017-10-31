import React, {Component} from "react";

class ButtonComponent extends Component {

    render() {

      let path = this.props.path;
      let text = this.props.text;

      return (
        <a href={path} className='wobbly-border dashed thin'>{text}</a>
      );
    }
}

export default ButtonComponent;
