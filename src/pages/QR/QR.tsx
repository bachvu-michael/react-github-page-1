import React, { Component } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Outlet } from 'react-router-dom';
import HTMLQRcode from '../../components/QRcode/htmlQR';

export default class QR extends Component {

    testClick = () => {
        console.log(this)
    }
    render() {
        return (
            <>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <HTMLQRcode />
                        </Paper>
                        <Outlet />
                    </Grid>
                </Grid>
            </>
        );
    }
}