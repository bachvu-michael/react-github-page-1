import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useQuery } from 'react-query';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import { convertKeysToLowerCase } from '../../helpers/unit';
import {
    Await,
    createBrowserRouter,
    defer,
    Form,
    Link,
    Outlet,
    RouterProvider,
    useAsyncError,
    useAsyncValue,
    useFetcher,
    useFetchers,
    useLoaderData,
    useNavigation,
    useParams,
    useRevalidator,
    useRouteError,
  } from 'react-router-dom';

const AdvertiserDetail = () => {

    let params = useParams();
    let todo = useLoaderData() as string;
    const [rows, setRows] = React.useState([]);

    const fetchData = async () => {
        const url = 'https://bachvu.io.vn/api/api/v1/advertisers/?maxRows=10&startRow=1';
        const headers = new Headers({
            'Accept': 'application/json'
        });
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });
        console.log(params);
        return response.json();
    };

    const { data, error, isLoading } = useQuery('data', fetchData);

    React.useEffect(() => {
        if (data) {
            setRows(convertKeysToLowerCase(data));
        }
    }, [data]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: query false</div>;
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <TextField id="standard-basic" label="Standard" variant="standard" />
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}

export default AdvertiserDetail;
