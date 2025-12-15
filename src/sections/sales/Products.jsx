import React, {useEffect, useState} from 'react';
import Box from "@mui/material/Box";
import {ButtonGroup} from "@mui/material";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {getCategoryRequest} from "../../api/category/categorySlice";
import {getProductRequest} from "../../api/products/productsSlice";
import ProductCard from "./ProductCard";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import ModifierModal from "./ModifierModal";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import AnimateButton from "../../components/@extended/AnimateButton";

function Products({list, setList}) {
    const dispatch = useDispatch();
    const {category} = useSelector((state) => state.category);
    const {products} = useSelector((state) => state.products);
    const arr = Array.from({length: 20}, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
        price: Math.floor(Math.random() * 10000),
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1wIfe0OTZTVrAiTPYoQaxXui6L2P4FSYVbA&s"
    }));
    const [filterProducts, setFilterProducts] = useState(arr);
    const [openModal, setOpenModal] = useState(false);
    const [modifierOptions, setModifierOptions] = useState(null);
    const [optionId, setOptionId] = useState(null);
    const [product, setProduct] = useState(null);

    const [categoryId, setCategoryId] = useState(null);

    useEffect(() => {
        dispatch(getCategoryRequest())
        dispatch(getProductRequest())
    }, [])


    useEffect(() => {
        const newArray = products && products.filter((item) => item.availableForSale === true && item.category.id == categoryId);
        setFilterProducts(newArray);
    }, [products, categoryId]);


    console.log(list)

    function setSelectModifier() {
        const findItem = modifierOptions.find((item) => item.id === optionId);
        const newProduct = {
            productId: product.id,
            quantity: 1,
            name: product.name,
            price: product.price + findItem.price,
            option: findItem,
            modifierOptionIds: [findItem.id]
        };

        const isExist = list.some((item) => item.productId === product.id && item?.modifierOptionIds[0] === optionId);

        let newList;

        if (isExist) {
            newList = list.map((item) =>
                item.productId === product.id
                    ? {...item, quantity: item.quantity + 1}
                    : item
            );
        } else {
            newList = [newProduct, ...list];
        }
        setList(newList);
        setModifierOptions(null);
        setOptionId(null);
        setOpenModal(false)
        setProduct(null);
    }

    function setProducts(product) {
        if (product.modifierGroups.length > 0) {
            setOpenModal(true);
            const options = product.modifierGroups[0].options
            setModifierOptions(options);
            setProduct(product);
        } else {
            addProduct(product);
        }
    }


    function addProduct(product) {
        const newProduct = {
            productId: product.id,
            quantity: 1,
            name: product.name,
            price: product.price,
            option: null,
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
            newList = [newProduct, ...list];
        }

        setList(newList);
    }

    return (
        <Box>
            <Box sx={{flexGrow: 1}}>
                <ButtonGroup aria-label="Basic button group" size="small">
                    {
                        category && category.map(cat =>
                            <Button key={cat.id}
                                    sx={{fontSize: '1.5rem'}}
                                    variant={categoryId === cat.id ? "contained" : "outlined"}
                                    color={categoryId === cat.id ? "primary" : "inherit"}
                                    onClick={() => setCategoryId(cat.id)}>{cat.name}</Button>
                        )
                    }
                </ButtonGroup>
            </Box>

            <Box sx={{flexGrow: 1, height: 'calc(100vh - 80px)', overflow: 'hidden'}}>
                <Grid container
                      spacing={2}
                      justifyContent="start"
                      sx={{
                          flexGrow: 1,
                          height: '100%',
                          overflowY: 'auto',
                          paddingRight: '6px',
                          marginTop: '10px'
                      }}
                >
                    {
                        filterProducts && filterProducts.length > 0 ?
                            filterProducts.map(product => (
                                <ProductCard item={product} key={product.id} setProducts={setProducts}/>))
                            : <Typography sx={{width: '100%'}} variant={'h2'} align='center'>Mahsulot yo'q</Typography>
                    }
                </Grid>
            </Box>
            <ModifierModal open={openModal} handleClose={setOpenModal}>
                <Typography variant={'h3'}>Qo'shimchalar</Typography>
                <FormGroup>
                    {
                        modifierOptions && modifierOptions?.length > 0 &&
                        modifierOptions.map(option =>
                            <FormControlLabel key={option.id}
                                              control={<Checkbox checked={option.id === optionId}
                                                                 onChange={() => setOptionId(option.id)}/>}
                                              label={option.name}/>
                        )
                    }
                </FormGroup>
                <Grid size={12} direction="column" display={'flex'} justifyContent="end" gap={2}>
                    <AnimateButton>
                        <Button onClick={() => setSelectModifier()} type='submit' loadingPosition="end"
                                fullWidth size="large" variant="contained"
                                color="primary">
                            Saqlash
                        </Button>
                    </AnimateButton>
                </Grid>
            </ModifierModal>
        </Box>
    )
        ;
}

export default Products;