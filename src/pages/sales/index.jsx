import React, {useState} from 'react';
import Box from "@mui/material/Box";
import Products from "../../sections/sales/Products";
import CashProduct from "../../sections/sales/CashProduct";
import Button from "@mui/material/Button";

function Index(props) {

    const [salesProductList, setSalesProductList] = useState([]);

    return (
        <Box sx={{display: 'flex', gap: '10px', width: '100%', height: '100%', padding: 0, margin: 0,overflow:'hidden'}}>
            <Box component="main" sx={{width: '65%',height:'100%', backgroundColor: '#f7f7f8', padding: '1rem', borderRadius: '6px'}}>
                <Products list={salesProductList} setList={setSalesProductList}/>
            </Box>
            <Box component="main" sx={{width: '35%',height:'100%', backgroundColor: '#f7f7f8', padding: '1rem', borderRadius: '6px'}}>
                <CashProduct list={salesProductList} setList={setSalesProductList}/>
            </Box>
        </Box>);
}

export default Index;