import React, { Component } from 'react';
import SampleComponent from "./components/SampleComponent";
import ButtonComponent from "./components/shared/ButtonComponent.jsx"
import BoxComponent from "./components/shared/BoxComponent.jsx"
import RowComponent from "./components/shared/RowComponent.jsx"
import TitleComponent from "./components/shared/TitleComponent.jsx"

class App extends Component {

  render() {

    return (
      <div className="App">
        <h2 className="text-info">Bootstrap + marker title</h2>
        <a href="http://getbootstrap.com/" className={`btn btn-success`}>Bootstrap button</a>
        <SampleComponent />
        <hr />
        <TitleComponent title="hallo titel"/>
        <RowComponent>
          <BoxComponent size="6">
            left + button<br /><br />
            <ButtonComponent path="http://google.com" text = "go to google" />
          </BoxComponent>
          <BoxComponent size="3" offset="1" bgColour="pink" colour="gray">
            right
          </BoxComponent>
        </RowComponent>
      </div>
    );
  }
}

export default App;
