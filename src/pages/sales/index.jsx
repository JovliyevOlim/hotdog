import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Products from "../../sections/sales/Products";
import CashProduct from "../../sections/sales/CashProduct";

function Index(props) {

    const [salesProductList, setSalesProductList] = useState([]);

    return (
        <Box sx={{display: 'flex', width: '100%', height: '100vh'}}>
            <Box component="main" bgcolor='red' sx={{width: '500px'}}>
                <CashProduct list={salesProductList}/>
            </Box>
            <Box component="main" bgcolor='blue' sx={{width: 'calc(100% - 500px)', flexGrow: 1, p: {xs: 2, sm: 3}}}>
                <Products list={salesProductList} setList={setSalesProductList}/>
            </Box>
        </Box>);
}

export default Index;