import React, {Component} from "react";

class SubmitButton extends Component {

    render() {
      let text = this.props.text;
      let enabled = this.props.enabled;

      return (
        <input disabled={!enabled} type="submit" value={text} className='wobbly-border dashed thin btn' />
      );
    }
}

export default SubmitButton;
