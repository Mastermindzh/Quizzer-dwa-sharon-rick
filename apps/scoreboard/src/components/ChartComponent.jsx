import React, { Component } from "react";
import { Chart } from 'react-google-charts';

class ChartComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        legend: 'none',
        backgroundColor: "transparent"
      },
      data: [
        ['Team', 'Points'],
        ['Mushrooms', 3],
        ['Onions', 1],
        ['Olives', 1],
        ['Zucchini', 1],
        ['Pepperoni', 2],
        ['last', '6']
      ],
    };
  }
  render() {


    return (
      <div style={{marginTop: '-45px', marginBottom: '-45px'}}>
      <Chart
        chartType="BarChart"
        data={this.state.data}
        options={this.state.options}
        graph_id="BarChart"
        width="800px"
        height="320px"
        legend_toggle
      />
      </div>
    );
  }
}

export default ChartComponent;
