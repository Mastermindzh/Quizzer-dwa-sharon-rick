import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import ButtonComponent from './shared/ButtonComponent'
import RowComponent from "./shared/RowComponent";
import CategoriesComponent from "./CategoriesComponent";
import AvailableCategoriesComponent from "./AvailableCategoriesComponent";


class AddRoundComponent extends Component {

  render() {

    return (

      <div className="container">
        <TitleComponent title="Quizzer - Add Round" />
        <RowComponent>
          <div className="col-md-4">
            <BoxComponent>
              <CategoriesComponent list={["soccer", "Literature", "Arts"]}/>
            </BoxComponent>
          </div>
          <div className="col-md-8">
            <BoxComponent>
              <AvailableCategoriesComponent list={["A", "B", "C", "D", "E"]}/>
            </BoxComponent>
          </div>
        </RowComponent>
        <ButtonComponent path={"/"} text={"Back"}/>
        <div className="text-center">

        <ButtonComponent path={"/"} text={"Add New Round"}/>
      </div>
      </div>

    );
  }
}

export default AddRoundComponent;
