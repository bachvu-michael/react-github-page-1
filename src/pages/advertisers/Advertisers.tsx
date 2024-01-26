import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useQuery } from 'react-query';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Advertiser } from '../../types/Advertiser';
import { Link, Outlet } from 'react-router-dom';

const Advertisers = () => {
    const [rows, setRows] = React.useState<Advertiser[]>([]);

    const fetchData = async () => {
        const url = 'https://bachvu.io.vn/api/api/v1/advertisers/?maxRows=100&startRow=1';
        const headers = new Headers({
            'Accept': 'application/json'
        });
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });
        return response.json();
    };

    const convertKeysToLowerCase: any = (obj: any) => {
        if (!obj || typeof obj !== 'object') {
            return obj;
        }

        if (Array.isArray(obj)) {
            return obj.map(item => convertKeysToLowerCase(item));
        }

        return Object.keys(obj).reduce((acc: any, key) => {
            const newKey = key.toLowerCase();
            acc[newKey] = convertKeysToLowerCase(obj[key]);
            return acc;
        }, {});
    }

    const { data, error, isLoading } = useQuery('data', fetchData);

    // const columns: GridColDef[] = [
    //     {
    //         field: 'first_name',
    //         headerName: 'First name',
    //     },
    //     {
    //         field: 'last_name',
    //         headerName: 'Last name',
    //     },
    //     {
    //         field: 'url',
    //         headerName: 'URL',
    //     },
    //     {
    //         field: 'category',
    //         headerName: 'Category',
    //     },
    //     {
    //         field: 'datecreated',
    //         headerName: 'Date created',
    //     },
    // ];

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
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>First name</TableCell>
                                        <TableCell>Last name</TableCell>
                                        <TableCell align="right">URL</TableCell>
                                        <TableCell align="right">Category</TableCell>
                                        <TableCell align="right">Date created</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.first_name}
                                            </TableCell>
                                            <TableCell align="right">{row.last_name}</TableCell>
                                            <TableCell align="right">{row.url}</TableCell>
                                            <TableCell align="right">{row.category}</TableCell>
                                            <TableCell align="right">{row.datecreated}</TableCell>
                                            <TableCell align="right">
                                                <Link to={`/react-github-page-1/advertisers/${row.id}`}>Detail</Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    <Outlet />
                </Grid>
            </Grid>
        </>
    );
}

export default Advertisers;
