import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Spinner from "../../../components/Spinner";
import {TableHead, TablePagination} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getReportSoldProductsRequest} from "../../../api/report/reportSlice";
import Grid from "@mui/material/Grid2";
import SelectDayFilter from "../../../components/SelectDayFilter";
import MainCard from "../../../components/MainCard";


function CommonTableHead({columns}) {
    return (
        <TableHead>
            <TableRow>
                {columns.map((col) => (
                    <TableCell
                        key={col.id}
                        align={col.align || 'left'}
                        padding={col.disablePadding ? 'none' : 'normal'}
                    >
                        {col.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}


const columns = [
    {
        id: 'productName',
        label: 'Nomi'
    },
    {
        id: 'sku',
        label: 'Sku'
    },
    {
        id: 'totalOrder',
        label: 'Sotilgan miqdor'
    },
    {
        id: 'totalAmount',
        label: 'Jami summa'
    },
]

export default function SalesTables() {

    const dispatch = useDispatch();
    const {reportSoldProducts, isSuccess, isLoading} = useSelector((state) => state.report);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [range, setRange] = useState(
        {
            startDate: new Date(),
            endDate: new Date(),
        },
    );

    useEffect(() => {
        dispatch(getReportSoldProductsRequest(
            {
                start: range.startDate.toISOString().slice(0, 10),
                end: range.endDate.toISOString().slice(0, 10),
                page: page,
                size: rowsPerPage
            }
        ));
    }, [page, rowsPerPage, range]);


    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return (
        <Box>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid>
                    <Typography variant="h5">Savdolar</Typography>
                </Grid>
                <Grid>
                    <SelectDayFilter value={range} setValue={setRange}/>
                </Grid>
            </Grid>
            <MainCard sx={{mt: 2}} content={false}>
                {
                    isLoading ? <Spinner/> :
                        reportSoldProducts && reportSoldProducts?.content?.length > 0 ?
                            <TableContainer
                                sx={{
                                    width: '100%',
                                    overflowX: 'auto',
                                    position: 'relative',
                                    display: 'block',
                                    maxWidth: '100%',
                                    '& td, & th': {whiteSpace: 'nowrap'}
                                }}
                            >
                                <Table aria-label="common table">
                                    <CommonTableHead columns={columns}/>
                                    <TableBody>
                                        {reportSoldProducts?.content.map((row, index) => (
                                            <TableRow
                                                hover
                                                key={index}
                                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                            >
                                                {columns.map((col) => {
                                                    const value = row[col.id];

                                                    return (
                                                        <TableCell key={col.id} align={col.align || 'left'}>
                                                            {col.render ? col.render(value, row) : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            : <Typography variant={'h4'} textAlign={'center'}>Ma'lumot yo'q</Typography>
                }
                <TablePagination
                    component="div"
                    count={reportSoldProducts?.content?.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                />
            </MainCard>
        </Box>
    );
}


