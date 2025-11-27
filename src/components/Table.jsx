import PropTypes from 'prop-types';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Stack,
    Link
} from '@mui/material';


// Generic Table Head
function CommonTableHead({ columns }) {
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

export default function CommonTable({ columns, data }) {
    return (
        <Box>
            <TableContainer
                sx={{
                    width: '100%',
                    overflowX: 'auto',
                    position: 'relative',
                    display: 'block',
                    maxWidth: '100%',
                    '& td, & th': { whiteSpace: 'nowrap' }
                }}
            >
                <Table aria-label="common table">
                    <CommonTableHead columns={columns} />
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow
                                hover
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
        </Box>
    );
}

CommonTable.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired
};