import React from 'react';
import Box from "@mui/material/Box";
import {ImageList, ImageListItem} from "@mui/material";
import logo from "../../assets/hotdog.png"
import ProductList from "./ProductList";

function CashProduct({list}) {

    const allSum = () => list.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);

    console.log(allSum);

    return (
        <Box>
            <Box sx={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                <ImageList sx={{width: 80, height: 80}} cols={1}>
                    <ImageListItem>
                        <img
                            srcSet={logo}
                            src={logo}
                            loading="lazy"
                        />
                    </ImageListItem>
                </ImageList>
            </Box>
            <Box sx={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                <ProductList list={list}/>
            </Box>
            <Box sx={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                Jami: {allSum} so'm
            </Box>
        </Box>
    );
}

export default CashProduct;