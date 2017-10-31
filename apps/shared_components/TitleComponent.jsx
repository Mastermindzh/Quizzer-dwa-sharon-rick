import React, {Component} from "react";

class TitleComponent extends Component {

    render() {

      return (
        <div className="row">
            <div className={`col-lg-12 text-center`}>
                <h1 className="mt-5">{this.props.title}</h1>
            </div>
        </div>
      );
    }
}

export default TitleComponent;
