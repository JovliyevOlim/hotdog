import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid2";
import MainCard from "../../components/MainCard";
import CommonTable from "../../components/Table";
import {useDispatch, useSelector} from "react-redux";
import {deleteSupplierRequest, getSupplierRequest, resetSuccess} from "../../api/supplier/supplierSlice";
import AddSupplier from "../../sections/supplier/AddSupplier";
import Button from "@mui/material/Button";
import ActionButtons from "../../components/@extended/ActionButtons";

function Index(props) {

    const {supplier, isSuccess, isLoading} = useSelector((state) => state.supplier);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [item, setItem] = useState(null);

    useEffect(() => {
        dispatch(getSupplierRequest())
    }, [])


    function onEdit(value) {
        setModal(true);
        setItem(value);
    }

    function onDelete(id) {
        dispatch(deleteSupplierRequest(id));
    }

    const columns = [
        {
            id: 'name',
            label: 'Ism'
        },
        {
            id: 'phone',
            label: 'Telefon nomer',
        },
        {
            id: "id",
            label: '',
            render: (value, row) => (
                <ActionButtons onEdit={() => onEdit(row)} onDelete={() => onDelete(value)}/>
            )
        }
    ]

    useEffect(() => {
        if (isSuccess) {
            setModal(false);
            dispatch(resetSuccess());
        }
    }, [isSuccess]);
    return (
        <Grid rowSpacing={4.5} columnSpacing={2.75}>
            <MainCard title="Supplier"
                      secondary={<Button onClick={() => setModal(true)} type='button' variant="contained"
                                         color="primary">
                          Qo'shish
                      </Button>}>
                <CommonTable data={supplier} columns={columns} loading={isLoading}/>
            </MainCard>
            <AddSupplier open={modal} onClose={setModal} setItem={setItem} item={item}/>
        </Grid>
    );
}

export default Index;