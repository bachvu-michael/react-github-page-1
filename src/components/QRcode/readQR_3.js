import React, { Component } from 'react';
import RNQRGenerator from 'rn-qr-generator';

export default class QRcode_2 extends Component {

  constructor(props) {
    super(props)
    this.state = {
      images: null
    };
  }

  // RNQRGenerator.generate({
  //   value: 'https://github.com/gevgasparyan/rn-qr-generator',
  //   height: 100,
  //   width: 100,
  // })
  //   .then(response => {
  //     const { uri, width, height, base64 } = response;
  //     this.setState({ imageUri: uri });
  //   })
  //   .catch(error => console.log('Cannot create QR code', error));

  // // Detect QR code in image
  // RNQRGenerator.detect({
  //   uri: PATH_TO_IMAGE
  // })
  //   .then(response => {
  //     const { values } = response; // Array of detected QR code values. Empty if nothing found.
  //   })
  //   .catch(error => console.log('Cannot detect QR code in image', error));
  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      // let img = event.target.files[0];
      this.setState({
        // images: URL.createObjectURL(img)
        images: Object.values(event.target.files)
      });
      // this.state.images.map((image, index) =>{
      //   console.log(image)
      // })
    }
  };

  render() {
    return (
      <div>
        <input
          type="file"
          name="myImage"
          multiple
          onChange={this.onImageChange}
        />
        {/* <input type="button" value="Submit QR Code" onClick={this.openImageDialog.bind(this)} /> */}
        {
          this.state.images !== null && this.state.images.map((image, index) => {
            return <div key={index}>{URL.createObjectURL(image)}</div>
          })
        }
        <p>{this.state.result}</p>
      </div>
    )
  }

}
