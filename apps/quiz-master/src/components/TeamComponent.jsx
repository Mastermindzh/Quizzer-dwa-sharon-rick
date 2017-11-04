import React, {Component} from "react";
import BoxComponent from "./shared/BoxComponent";
import RowComponent from "./shared/RowComponent";
import axios from "axios"
import config from '../config.js'

class TeamComponent extends Component {
  constructor() {
    super();
    this.state = {
      teamImage: '',
      teamName: '',
      accepted: false,
      bgColor: ''
    }
  }

  componentDidMount() {
    // alert(this.props.team);
    axios.get(config.backend + "/teams/" + this.props.team).then(response =>{
      this.setState({teamName: response.data.name, teamImage: config.backend + "/" + response.data.picture})
    }).catch(err => {
      console.log(err);
      console.log("team doesn't exist");
    })
  }

  acceptTeam(event){
    event.preventDefault()
    console.log("in accept team")
    this.setState({accepted: true, bgColor: "#5eff6e"})
    this.props.approvedTeamHandler(event, this.props.team)
  }

  rejectTeam(event){
    event.preventDefault();
    console.log("in reject team")
    this.setState({accepted:false, bgColor: "#cc3737"})
  }

  render() {
    return (
      <div>
        <RowComponent>
          <BoxComponent bgColour={this.state.bgColor}>
            <div className="col-md-2" style={{height: '200px', width: '200px', padding: '5px'}}>
              <img src={this.state.teamImage} alt="Team" style={{maxHeight: '180px', maxWidth: '180px', marginTop: '-2px'}}/>
            </div>
            <div className="col-md-6 team-description " >
              <h3>{this.state.teamName}</h3>
            </div>
            <div className="col-md-4">
              <button className='btn btn-large wobbly-border dashed thin' onClick={this.acceptTeam.bind(this)}>Accept!</button>
              <button className='btn btn-large wobbly-border dashed thin' onClick={this.rejectTeam.bind(this)}>Reject!</button>
            </div>
          </BoxComponent>
        </RowComponent>
      </div>
    );
  }
}

export default TeamComponent;
