import React, { Component } from "react";
import store from "../store/RootStore"

class ScoreTableComponent extends Component {


  constructor() {
    super();
    this.state = {
      rounds: [{ "_id": 1, "questions": [{ "status": "Closed", "questionId": "59f9928d0287d21fc55e034b", "_id": "59f9928e0287d21fc55e069a", "answers": [{ "answer": "a", "approved": false, "teamId": "59f9928d0287d21fc55e033f", "_id": "59f9928e0287d21fc55e069c" }, { "answer": "ab", "approved": true, "teamId": "59f9928d0287d21fc55e0341", "_id": "59f9928e0287d21fc55e069b" }] }, { "status": "Closed", "questionId": "59f9928d0287d21fc55e034c", "_id": "59f9928e0287d21fc55e0697", "answers": [{ "answer": "a", "approved": false, "teamId": "59f9928d0287d21fc55e033f", "_id": "59f9928e0287d21fc55e0699" }, { "answer": "ab", "approved": true, "teamId": "59f9928d0287d21fc55e0341", "_id": "59f9928e0287d21fc55e0698" }] }, { "status": "Closed", "questionId": "59f9928d0287d21fc55e034d", "_id": "59f9928e0287d21fc55e0694", "answers": [{ "answer": "a", "approved": false, "teamId": "59f9928d0287d21fc55e033f", "_id": "59f9928e0287d21fc55e0696" }, { "answer": "ab", "approved": true, "teamId": "59f9928d0287d21fc55e0341", "_id": "59f9928e0287d21fc55e0695" }] }, { "status": "Closed", "questionId": "59f9928d0287d21fc55e034e", "_id": "59f9928e0287d21fc55e0691", "answers": [{ "answer": "a", "approved": false, "teamId": "59f9928d0287d21fc55e033f", "_id": "59f9928e0287d21fc55e0693" }, { "answer": "ab", "approved": true, "teamId": "59f9928d0287d21fc55e0341", "_id": "59f9928e0287d21fc55e0692" }] }, { "status": "Closed", "questionId": "59f9928d0287d21fc55e034a", "_id": "59f9928e0287d21fc55e068e", "answers": [{ "answer": "a", "approved": false, "teamId": "59f9928d0287d21fc55e033f", "_id": "59f9928e0287d21fc55e0690" }, { "answer": "ab", "approved": true, "teamId": "59f9928d0287d21fc55e0341", "_id": "59f9928e0287d21fc55e068f" }] }, { "status": "Closed", "questionId": "59f9928d0287d21fc55e0350", "_id": "59f9928e0287d21fc55e068b", "answers": [{ "answer": "a", "approved": false, "teamId": "59f9928d0287d21fc55e033f", "_id": "59f9928e0287d21fc55e068d" }, { "answer": "ab", "approved": true, "teamId": "59f9928d0287d21fc55e0341", "_id": "59f9928e0287d21fc55e068c" }] }, { "status": "Closed", "questionId": "59f9928d0287d21fc55e0352", "_id": "59f9928e0287d21fc55e0688", "answers": [{ "answer": "a", "approved": false, "teamId": "59f9928d0287d21fc55e033f", "_id": "59f9928e0287d21fc55e068a" }, { "answer": "ab", "approved": true, "teamId": "59f9928d0287d21fc55e0341", "_id": "59f9928e0287d21fc55e0689" }] }, { "status": "Closed", "questionId": "59f9928d0287d21fc55e0351", "_id": "59f9928e0287d21fc55e0685", "answers": [{ "answer": "a", "approved": false, "teamId": "59f9928d0287d21fc55e033f", "_id": "59f9928e0287d21fc55e0687" }, { "answer": "ab", "approved": true, "teamId": "59f9928d0287d21fc55e0341", "_id": "59f9928e0287d21fc55e0686" }] }, { "status": "Closed", "questionId": "59f9928d0287d21fc55e0353", "_id": "59f9928e0287d21fc55e0682", "answers": [{ "answer": "a", "approved": false, "teamId": "59f9928d0287d21fc55e033f", "_id": "59f9928e0287d21fc55e0684" }, { "answer": "ab", "approved": true, "teamId": "59f9928d0287d21fc55e0341", "_id": "59f9928e0287d21fc55e0683" }] }, { "status": "Closed", "questionId": "59f9928d0287d21fc55e034f", "_id": "59f9928e0287d21fc55e067f", "answers": [{ "answer": "a", "approved": false, "teamId": "59f9928d0287d21fc55e033f", "_id": "59f9928e0287d21fc55e0681" }, { "answer": "ab", "approved": true, "teamId": "59f9928d0287d21fc55e0341", "_id": "59f9928e0287d21fc55e0680" }] }, { "status": "Closed", "questionId": "59f9928d0287d21fc55e0355", "_id": "59f9928e0287d21fc55e067c", "answers": [{ "answer": "a", "approved": false, "teamId": "59f9928d0287d21fc55e033f", "_id": "59f9928e0287d21fc55e067e" }, { "answer": "ab", "approved": true, "teamId": "59f9928d0287d21fc55e0341", "_id": "59f9928e0287d21fc55e067d" }] }, { "status": "Closed", "questionId": "59f9928d0287d21fc55e0356", "_id": "59f9928e0287d21fc55e0679", "answers": [{ "answer": "a", "approved": false, "teamId": "59f9928d0287d21fc55e033f", "_id": "59f9928e0287d21fc55e067b" }, { "answer": "ab", "approved": true, "teamId": "59f9928d0287d21fc55e0341", "_id": "59f9928e0287d21fc55e067a" }] }], "categories": ["59f9928d0287d21fc55e0342", "59f9928d0287d21fc55e0343", "59f9928d0287d21fc55e0344"] }, { "_id": 2, "questions": [{ "status": "Closed", "questionId": "59f9928d0287d21fc55e034b", "_id": "59f9928e0287d21fc55e0676", "answers": [{ "answer": "a", "approved": false, "teamId": "59f9928d0287d21fc55e033f", "_id": "59f9928e0287d21fc55e0678" }, { "answer": "ab", "approved": true, "teamId": "59f9928d0287d21fc55e0341", "_id": "59f9928e0287d21fc55e0677" }] }, { "status": "Open", "questionId": "59f9928d0287d21fc55e034c", "_id": "59f9928e0287d21fc55e0673", "answers": [{ "answer": "a", "approved": false, "teamId": "59f9928d0287d21fc55e033f", "_id": "59f9928e0287d21fc55e0675" }, { "answer": "ab", "approved": true, "teamId": "59f9928d0287d21fc55e0341", "_id": "59f9928e0287d21fc55e0674" }] }, { "status": "Queued", "questionId": "59f9928d0287d21fc55e034d", "_id": "59f9928e0287d21fc55e0672", "answers": [] }, { "status": "Queued", "questionId": "59f9928d0287d21fc55e034e", "_id": "59f9928e0287d21fc55e0671", "answers": [] }, { "status": "Queued", "questionId": "59f9928d0287d21fc55e034a", "_id": "59f9928e0287d21fc55e0670", "answers": [] }, { "status": "Queued", "questionId": "59f9928d0287d21fc55e0350", "_id": "59f9928e0287d21fc55e066f", "answers": [] }, { "status": "Queued", "questionId": "59f9928d0287d21fc55e0352", "_id": "59f9928e0287d21fc55e066e", "answers": [] }, { "status": "Queued", "questionId": "59f9928d0287d21fc55e0351", "_id": "59f9928e0287d21fc55e066d", "answers": [] }, { "status": "Queued", "questionId": "59f9928d0287d21fc55e0353", "_id": "59f9928e0287d21fc55e066c", "answers": [] }, { "status": "Queued", "questionId": "59f9928d0287d21fc55e034f", "_id": "59f9928e0287d21fc55e066b", "answers": [] }, { "status": "Queued", "questionId": "59f9928d0287d21fc55e0355", "_id": "59f9928e0287d21fc55e066a", "answers": [] }, { "status": "Queued", "questionId": "59f9928d0287d21fc55e0356", "_id": "59f9928e0287d21fc55e0669", "answers": [] }], "categories": ["59f9928d0287d21fc55e0342", "59f9928d0287d21fc55e0343", "59f9928d0287d21fc55e0344"] }]
    };

    store.subscribe(() => {
      // this.updateState(store.getState());
    })
    this.updateState = this.updateState.bind(this);
  }

  /**
   * update local state with global state
   * @param {*} state store state
   */
  updateState(state) {
    this.setState({ rounds: state.rounds })
  }

  componentDidMount() {
    this.updateState(store.getState());
  }


  render() {
    return (
      <table className="scores">
        <thead>
          <tr>
            <td>Team</td>
            <td>1</td>
            <td>2</td>
            <td>3</td>
            <td>4</td>
            <td>5</td>
            <td>6</td>
            <td>7</td>
            <td>8</td>
            <td>9</td>
            <td>10</td>
            <td>11</td>
            <td>12</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mushrooms</td>
            <td>2</td>
            <td>3</td>
            <td>3</td>
            <td>4</td>
            <td>2</td>
            <td>3</td>
            <td>3</td>
            <td>4</td>
            <td>2</td>
            <td>3</td>
            <td>3</td>
            <td>4</td>

          </tr>
          <tr>
            <td>Onions</td>
            <td>1</td>
            <td>0</td>
            <td>3</td>
            <td>4</td>
            <td>1</td>
            <td>0</td>
            <td>3</td>
            <td>4</td>
            <td>1</td>
            <td>0</td>
            <td>3</td>
            <td>4</td>

          </tr>
          <tr>
            <td>Olives</td>
            <td>1</td>
            <td>0</td>
            <td>3</td>
            <td>4</td>
            <td>1</td>
            <td>0</td>
            <td>3</td>
            <td>4</td>
            <td>1</td>
            <td>0</td>
            <td>3</td>
            <td>4</td>

          </tr>
          <tr>
            <td>Zucchini</td>
            <td>1</td>
            <td>0</td>
            <td>3</td>
            <td>4</td>
            <td>1</td>
            <td>0</td>
            <td>3</td>
            <td>4</td>
            <td>1</td>
            <td>0</td>
            <td>3</td>
            <td>4</td>

          </tr>
          <tr>
            <td>Pepperoni</td>
            <td>1</td>
            <td>0</td>
            <td>3</td>
            <td>4</td>
            <td>1</td>
            <td>0</td>
            <td>3</td>
            <td>4</td>
            <td>1</td>
            <td>0</td>
            <td>3</td>
            <td>4</td>

          </tr>
          <tr>
            <td>Last</td>
            <td>1</td>
            <td>0</td>
            <td>3</td>
            <td>4</td>
            <td>1</td>
            <td>0</td>
            <td>3</td>
            <td>4</td>
            <td>1</td>
            <td>0</td>
            <td>3</td>
            <td>4</td>

          </tr>
        </tbody>
      </table>
    );
  }
}

export default ScoreTableComponent;
