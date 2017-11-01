import React, { Component } from "react";
import TitleComponent from './shared/TitleComponent'
import BoxComponent from './shared/BoxComponent'
import TeamCardComponent from './TeamCardCompoment'
import ScoreTableComponent from './ScoreTableComponent'
import ChartComponent from './ChartComponent'

class ScoreboardComponent extends Component {

  constructor() {
    super();
    this.teams = [
      {
        "_id": "59f8752e3c77d92d2a98ac2f",
        "name": "Team1",
        "password": "1234",
        "picture": "https://www.gitbook.com/cover/book/mongkuen/react.jpg?build=1470682429235",
        "__v": 0
      },
      {
        "_id": "59f8752e3c77d92d2a98ac31",
        "name": "Team3",
        "password": "abcd",
        "picture": "https://www.gitbook.com/cover/book/mongkuen/react.jpg?build=1470682429235",
        "__v": 0
      },
      {
        "_id": "59f8752e3c77d92d2a98ac30",
        "name": "Team2",
        "password": "1a2b",
        "picture": "https://www.gitbook.com/cover/book/mongkuen/react.jpg?build=1470682429235",
        "__v": 0
      },
      {
        "_id": "59f8752e3c77d92d2a98ac30",
        "name": "Team4",
        "password": "1a2b",
        "picture": "https://www.gitbook.com/cover/book/mongkuen/react.jpg?build=1470682429235",
        "__v": 0
      },
      {
        "_id": "59f8752e3c77d92d2a98ac30",
        "name": "Team5",
        "password": "1a2b",
        "picture": "https://www.gitbook.com/cover/book/mongkuen/react.jpg?build=1470682429235",
        "__v": 0
      }
    ]

  }

  render() {
    return (
      <div className="container-full">
        <TitleComponent title="Quizzer - Scoreboard" />
        <div className="row">
          <div className="col-lg-6">
            <BoxComponent size="12">
              <h3 className="quizInfo">
                Quiz info:
            </h3>

              <div className="row">
                <div className="col-lg-8">
                  <ScoreTableComponent />
                </div>
                <div className="col-lg-3 col-lg-offset-1">
                  <p className="smallText bold">
                    Rounds played: 1 <br /><br /> Current Question: 12
                            </p>
                </div>
              </div>

            </BoxComponent>
          </div>
          <div className="col-lg-6">
            <BoxComponent size="12">
              <h3 className="teamByPoints">
                Teams ranked by points
              </h3>
              <ChartComponent />
            </BoxComponent>
          </div>

          <div className="col-lg-12">
            <BoxComponent size="12">
              <h4 className="center" style={
                {
                  background: 'repeating-linear-gradient(45deg,mediumpurple,mediumpurple 10px,mediumpurple 10px,mediumpurple 20px)',
                  padding: '5px',
                  marginTop: '-10px'
                }}>
                From: Art and Literature
            </h4>
              <h2 className="center">Who wrote Twilight series of novels?</h2>
            </BoxComponent>
          </div>

          <TeamCardComponent teamName="correct" status="correct" answer="answer" teamImage="https://www.gitbook.com/cover/book/mongkuen/react.jpg?build=1470682429235" />
          <TeamCardComponent teamName="wrong" status="wrong" answer="answer" teamImage="https://www.gitbook.com/cover/book/mongkuen/react.jpg?build=1470682429235" />
          <TeamCardComponent teamName="review" status="review" answer="answer" teamImage="https://www.gitbook.com/cover/book/mongkuen/react.jpg?build=1470682429235" />

          {this.teams.map((team, i) => {
            return <TeamCardComponent teamName={team.name} status="" answer="answer" teamImage={team.picture} key={i} />;
          })}
        </div>
      </div>
    );
  }
}

export default ScoreboardComponent;
