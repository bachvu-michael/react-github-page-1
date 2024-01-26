import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'

export default class QRcode extends Component {
  constructor(props) {
    super(props)
    this.state = { cameraId: undefined, delay: 500, devices: [], loading: false }
    // this.qrRef = React.createRef();
    // const qrRef = React.useRef<Reader>(null)
    // this.refs.reader.openImageDialog()
    this.qrRef = React.createRef();
  }

  componentWillMount() {
    const { selectFacingMode } = this.props

    if (navigator && selectFacingMode) {
      this.setState({
        loading: true,
      })

      navigator.mediaDevices.enumerateDevices()
        .then((devices) => {
          const videoSelect = []
          devices.forEach((device) => {
            if (device.kind === 'videoinput') {
              videoSelect.push(device)
            }
          })
          return videoSelect
        })
        .then((devices) => {
          this.setState({
            cameraId: devices[0].deviceId,
            devices,
            loading: false,
          })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  selectCamera = () => {
    return this.state.cameraId
  }

  onScan = (data) => {
    // console.log(data)
  }

  onLoad = (data) => {
    console.log(data)
  }

  legacyBtnClick = (qrRef2) => {
    // qrRef.current?.openImageDialog()
    // console.log(this.qrRef)
    console.log(qrRef2)
    console.log(this)
  }

  render() {
    // const { selectFacingMode, selectDelay, legacyMode } = this.props
    const { loading, cameraId, devices } = this.state
    const selectFacingMode = false;
    const selectDelay = false;
    const legacyMode = true;
    const previewStyle = { width: 320 }
    const qrRef2 = React.useRef < QrReader > (null)
    return (
      <div>
        {
          selectFacingMode && devices.length && (
            <select
              onChange={e => {
                const value = e.target.value
                this.setState({ cameraId: undefined }, () => {
                  this.setState({ cameraId: value })
                })
              }}
            >
              {devices.map((deviceInfo, index) => (
                <React.Fragment key={deviceInfo.deviceId}><option value={deviceInfo.deviceId}>{deviceInfo.label || `camera ${index}`}</option></React.Fragment>
              ))}
            </select>
          )
        }
        {
          selectDelay && (
            <div>
              <button onClick={() => this.setState({ delay: 0 })}>
                Disable Delay
              </button>
              <input
                placeholder="Delay in ms"
                type="number"
                value={this.state.delay}
                onChange={e =>
                  this.setState({ delay: parseInt(e.target.value) })}
              />
            </div>
          )
        }
        {!loading && (<QrReader
          ref={qrRef2}
          legacyMode={legacyMode}
          onError={console.error}
          onScan={this.onScan}
          onLoad={this.onLoad}
          delay={this.state.delay}
          // constraints={cameraId && ({ audio: false, video: { deviceId: cameraId } })}
        />)}
        {
          legacyMode && (
            <div>
              <button onClick={this.legacyBtnClick.bind(this)}>
                Open Image Dialog
              </button>
            </div>
          )
        }
      </div>
    )
  }
}
