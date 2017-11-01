import React, { Component } from "react";
import Dropzone from 'react-dropzone'
import BoxComponent from './shared/BoxComponent'


class DropZoneComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageFiles: []
    }
  }

  onDrop(imageFiles) {
    this.setState({
      imageFiles: imageFiles
    })

    // tell parent our image has changed
    this.props.handler(imageFiles[0]);
  }



  render() {

    return (
      <form autoComplete='off'>
        <Dropzone
          onDrop={this.onDrop.bind(this)}
          className='dropzone'
          activeClassName='active-dropzone'
          multiple={false}>

          {this.state.imageFiles.length === 1 ? <div>
            <div>
              <img alt="selected file" src={this.state.imageFiles[0].preview} width="400" height="200" />
            </div>
          </div> : <div><div className="col-lg-4" /><BoxComponent size="4">Click here to take a picture</BoxComponent></div>}
        </Dropzone>
      </form>
    )
  }

};

export default DropZoneComponent;
