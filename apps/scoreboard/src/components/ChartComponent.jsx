import React, { Component } from "react";
import { Chart } from 'react-google-charts';
import store from "../store/RootStore"

class ChartComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        legend: 'none',
        backgroundColor: "transparent"
      },
      chartScores: [],
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

    store.subscribe(() => {
      this.updateState(store.getState());
    })
    this.updateState = this.updateState.bind(this);
  }


  /**
     * update local state with global state
     * @param {*} state store state
     */
  updateState(state) {
    let chartScores = state.chartScores;
    this.setState({chartScores: state.chartScores})

    if(chartScores !== [] && chartScores !== undefined && chartScores.length !== 0){
      console.log('we got score info!')
      console.log(chartScores)

      var chartData = [
        ['Team','Points']
      ]

      chartScores.forEach(scoreObject => {
        chartData.push([
          scoreObject.team,
          scoreObject.score
        ])
      })

      this.setState({data: chartData})
    }

  }

  componentDidMount() {
    this.updateState(store.getState());
  }

  render() {


    return (
      <div style={{ marginTop: '-45px', marginBottom: '-45px' }}>
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
