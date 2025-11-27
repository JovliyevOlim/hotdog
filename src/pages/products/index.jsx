import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid2";
import MainCard from "../../components/MainCard";
import CommonTable from "../../components/Table";
import {useDispatch, useSelector} from "react-redux";
import {deleteProductRequest, getProductRequest} from "../../api/products/productsSlice";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router";
import Stack from "@mui/material/Stack";
import Image from "../../components/Image";
import ActionButtons from "../../components/@extended/ActionButtons";

function Index(props) {

    const {products} = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getProductRequest())
    }, [])


    function onDelete(id) {
        console.log(id)
        dispatch(deleteProductRequest(id));
    }

    const columns = [
        {
            id: 'name',
            label: 'Ism'
        },
        {
            id: 'imageUrl',
            label: 'Rasm',
            render: (value) => (
                <Image url={value}/>
            )
        },
        {
            id: 'quantity',
            label: 'Miqdor',
        },
        {
            id: 'cost',
            label: 'Olish narxi',
            render: (value) => (
                <Stack direction="row" sx={{gap: 1, alignItems: 'center'}}>
                    {value.toFixed(2) || 0} so'm
                </Stack>
            )
        },
        {
            id: 'price',
            label: 'Sotish narxi',
            render: (value) => (
                <Stack direction="row" sx={{gap: 1, alignItems: 'center'}}>
                    {value || 0} so'm
                </Stack>
            )
        },
        {
            id: 'category',
            label: 'Kategoriya',
            render: (value) => (
                <Stack direction="row" sx={{gap: 1, alignItems: 'center'}}>
                    {value.name}
                </Stack>
            )
        },
        {
            id: 'description',
            label: 'Tavsif',
        },
        {
            id: 'sku',
            label: 'Sku',
        },
        {
            id: "id",
            label: '',
            render: (value, row) => (
                <ActionButtons
                    onDelete={() => onDelete(value)}/>
            )
        }
    ]

    console.log(products);
    return (
        <Grid rowSpacing={4.5} columnSpacing={2.75}>
            <MainCard title="Mahsulotlar"
                      secondary={<Button onClick={() => navigate("/products/add")} type='submit' fullWidth size="large"
                                         variant="contained"
                                         color="primary">
                          Add
                      </Button>}>
                {
                    products ? <CommonTable data={products} columns={columns}/> :
                        <h2>Ma'lumot yo'q</h2>
                }
            </MainCard>
        </Grid>
    );
}

export default Index;