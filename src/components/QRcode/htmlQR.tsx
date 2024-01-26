import React, { Component } from 'react';
// To use Html5QrcodeScanner (more info below)
import { Html5QrcodeScanner } from "html5-qrcode";
// To use Html5Qrcode (more info below)
import { Html5Qrcode } from "html5-qrcode";
//export excel
import ReactExport from "react-export-excel";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import { Backdrop, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


interface MyProps { }
interface MyState {
    delay: number;
    loading: boolean;
    images: Image[];
}

interface Image {
    name: string;
    url: string;
    longUrl?: string;
}

const qrcodeRegionId = "html5qr-code-full-region";

export default class HTMLQRcode extends Component<MyProps, MyState> {

    constructor(props: any) {
        super(props)
        this.state = {
            delay: 100,
            loading: false,
            images: []
        }
    }
    
    onImageChange = async (event: any) => {
        if (event.target.files && event.target.files[0]) {
            const html5QrCode = new Html5Qrcode(qrcodeRegionId, false);
            const arrImgs = Object.values(event.target.files)
            this.setState({ loading: true });
            const newArr = await Promise.all(arrImgs.map((img: any, index) => {
                return html5QrCode.scanFile(img, false).then(decodedText => {
                    const newImg: Image = {
                        name: img.name,
                        url: decodedText
                    };
                    return newImg;
                })
                    .catch(err => {
                        // failure, handle it.
                        console.log(`Error scanning file. Reason: ${err}`)
                        return { name: img.name, url: "" };
                    });
            }))
            this.setState({
                images: newArr, loading: false
            })
        }
    };

    onClickShowState = (event: any) => {
        console.log(this.state.images)
    };

    handleRenderLongLink = async (event: any) => {
        this.setState({ loading: true });
        const links = Promise.all(this.state.images.map((img: any, index) => {
            return this.request(img)
        })).then((res: any) => {
            this.setState({
                images: [...res], loading: false
            })
        })
    }

    request(img: Image) {
        return new Promise(function (resolve, reject) {
            const xhr = new XMLHttpRequest();
            xhr.timeout = 30000;
            xhr.onreadystatechange = function (e) {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        const newImg: Image = {
                            name: img.name,
                            url: img.url,
                            longUrl: xhr.responseURL
                        };
                        resolve(newImg);
                    } else {
                        console.log(xhr.status);
                        reject(xhr.status)
                    }
                }
            }
            xhr.ontimeout = function () {
                reject('timeout')
            }
            xhr.open('get', img.url, true)
            xhr.send();
        })
    }

    render() {
        return (
            <>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Grid container>
                            <Grid item xs={12}>
                                <input
                                    type="file"
                                    name="myImage"
                                    multiple
                                    onChange={this.onImageChange}
                                />
                                {
                                    this.state.images.length > 0 && <ExcelFile element={<Button variant="contained" >export excel</Button>}>
                                        <ExcelSheet data={this.state.images} name="QR">
                                            <ExcelColumn label="Name" value="name" />
                                            <ExcelColumn label="URL" value="url" />
                                            <ExcelColumn label="Long URL" value="longUrl" />
                                        </ExcelSheet>
                                    </ExcelFile>
                                }
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: 10 }}>
                                {
                                    this.state.images.length > 0 && <Button variant="contained" color="success" onClick={this.handleRenderLongLink}>Render Link</Button>
                                }
                            </Grid>
                        </Grid>


                    </Grid>
                    <Grid item xs={6}>
                        {
                            this.state.images.length > 0 && <h3>List result</h3>
                        }
                        {
                            this.state.images.length > 0 && <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Short URL</TableCell>
                                            <TableCell >Long URL</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.state.images.map((row, index) => (
                                            <TableRow
                                                key={`table-data-` + index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell >{row.url}</TableCell>
                                                <TableCell >{row.longUrl}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        }

                        <div style={{ display: "none" }} id={qrcodeRegionId}></div>
                    </Grid>
                </Grid>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={this.state.loading}
                    // onClick={handleClose}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </>
        );
    }
}