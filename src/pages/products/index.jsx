import React, {useEffect, useState} from 'react';
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
import TextField from "@mui/material/TextField";

function Index(props) {

    const {products, isLoading} = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [search, setSearch] = useState('');


    useEffect(() => {
        dispatch(getProductRequest())
    }, []);


    const filteredProducts = React.useMemo(() => {
        if (!search) return products;

        return products.filter(p =>
            p.name?.toLowerCase().includes(search.toLowerCase())
        );
    }, [products, search]);

    function onDelete(id) {
        dispatch(deleteProductRequest(id));
    }


    function onEdit(value) {
        navigate("/products/update/" + value.id);
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
                    {value ? value.toFixed(2) || 0 : 0} so'm
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
                    onEdit={() => onEdit(row)}
                    loading={isLoading}
                    onDelete={() => onDelete(value)}
                />
            )
        }
    ]

    return (
        <Grid rowSpacing={4.5} columnSpacing={2.75}>
            <MainCard title="Mahsulotlar"
                      secondary={<Button onClick={() => navigate("/products/add")} type='submit' fullWidth size="large"
                                         variant="contained"
                                         color="primary">
                          Add
                      </Button>}>
                <Grid container spacing={2} marginBottom={2}>
                    <Grid item size={12}>
                        <TextField
                            fullWidth
                            size="small"
                            placeholder="Mahsulot nomi..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <CommonTable data={filteredProducts} columns={columns} loading={isLoading}/>
            </MainCard>
        </Grid>
    );
}

export default Index;