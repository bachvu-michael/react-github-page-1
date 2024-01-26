import React, { Component } from 'react';
import { QrReader } from "react-qr-reader";
// OnResultFunction, QrReader, QrReaderProps, UseQrReaderHook, UseQrReaderHookProps, useQrReader 

export default class QRcode_2 extends Component {

  constructor(props) {
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
    }
    this.qrReaderRef = React.createRef();
    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data) {
    this.setState({
      result: data,
    })
  }
  handleError(err) {
    console.error(err)
  }
  openImageDialog() {
    console.log(this)
    console.log(this.qrReaderRef)
    this.qrReaderRef.openImageDialog()
  }

  render() {
    const previewStyle = {
      height: 240,
      width: 320,
    }
    // const ref = React.createRef();

    return (
      <div>
        <QR
          ref={this.qrReaderRef}
          delay={this.state.delay}
          previewStyle={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          legacyMode={true}
        />
        <input type="button" value="Submit QR Code" onClick={this.openImageDialog.bind(this)} />
        <p>{this.state.result}</p>
      </div>
    )
  }
}

const QR = React.forwardRef((props, ref) => (
  <QrReader
    ref={ref}
    delay={props.delay}
    previewStyle={props.previewStyle}
    onError={props.handleError}
    onScan={props.handleScan}
    legacyMode={true}
  />
));