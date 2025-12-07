import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {DeleteOutlined, MinusOutlined, PlusOutlined} from "@ant-design/icons";
import productListCard from "./ProductListCard";
import ProductListCard from "./ProductListCard";


export default function ProductList({list, setList}) {


    const increase = (id) => {
        setList(prev =>
            prev.map(item =>
                item.productId === id ? {...item, quantity: item.quantity + 1} : item
            )
        );
    };

    const decrease = (id) => {
        setList(prev =>
            prev
                .map(item =>
                    item.productId === id ? {...item, quantity: Math.max(1, item.quantity - 1)} : item
                )
        );
    };

    const remove = (id) => {
        setList(prev => prev.filter(item => item.productId !== id));
    };

    return (
        <Box sx={{flexGrow: 1, height: 'calc(100vh - 250px)', overflowY: 'scroll'}}>
            {
                list?.reverse().map(item =>
                    <ProductListCard item={item} key={item.id} decrease={decrease} remove={remove} increase={increase}/>
                )
            }
        </Box>
    );
}
