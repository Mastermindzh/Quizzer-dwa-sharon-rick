import React, { Component } from 'react';
import SampleComponent from "./components/SampleComponent";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h2 className="text-info">Bootstrap + marker title</h2>
        <a href="http://getbootstrap.com/" className={`btn btn-success`}>Bootstrap button</a>
        <hr />
        <SampleComponent />
      </div>
    );
  }
}

export default App;
