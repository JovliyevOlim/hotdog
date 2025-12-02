import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {getCategoryRequest} from "../../api/category/categorySlice";
import {getProductRequest} from "../../api/products/productsSlice";
import ProductCard from "./ProductCard";
import Grid from "@mui/material/Grid2";

function Products({list, setList}) {
    const dispatch = useDispatch();
    const {category} = useSelector((state) => state.category);
    const {products} = useSelector((state) => state.products);
    const [filterProducts, setFilterProducts] = useState([]);

    const [categoryId, setCategoryId] = useState(null);

    useEffect(() => {
        dispatch(getCategoryRequest())
        dispatch(getProductRequest())
    }, [])


    useEffect(() => {
        const newArray = products && products.filter((item) => item.availableForSale === true && item.category.id == categoryId);
        setFilterProducts(newArray);
    }, [products, categoryId]);

    function setProducts(product) {
        const newProduct = {
            productId: product.id,
            quantity: 1,
            name: product.name,
            price: product.price,
        };

        const isExist = list.some((item) => item.productId === product.id);

        let newList;

        if (isExist) {
            newList = list.map((item) =>
                item.productId === product.id
                    ? {...item, quantity: item.quantity + 1}
                    : item
            );
        } else {
            newList = [...list, newProduct];
        }

        setList(newList);
    }

    return (
        <Box>
            <ButtonGroup aria-label="Basic button group" size="large">
                {
                    category && category.map(cat =>
                        <Button key={cat.id}
                                variant={categoryId === cat.id ? "contained" : "outlined"}
                                color={categoryId === cat.id ? "primary" : "inherit"}
                                onClick={() => setCategoryId(cat.id)}>{cat.name}</Button>
                    )
                }
            </ButtonGroup>
            <Box sx={{flexGrow: 1}} marginTop={4}>
                <Grid container direction="column" spacing={2}>
                    {
                        filterProducts && filterProducts.length > 0 ?
                            <Grid item size={{md: 2, sm: 4}}>
                                {
                                    filterProducts.map(product => (
                                        <ProductCard item={product} key={product.id} setProducts={setProducts}/>
                                    ))
                                }
                            </Grid>
                            : <h2>Mahsulot yo'q</h2>
                    }
                </Grid>

            </Box>
        </Box>
    );
}

export default Products;