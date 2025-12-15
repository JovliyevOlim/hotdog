import {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid2";
import MainCard from "../../components/MainCard";
import CommonTable from "../../components/Table";
import {useDispatch, useSelector} from "react-redux";
import {
    deleteCategoryRequest,
    getCategoryByIdRequest,
    getCategoryRequest,
    resetSuccess
} from "../../api/category/categorySlice";
import Button from "@mui/material/Button";
import AddCategory from "../../sections/category/AddCategory";
import ActionButtons from "../../components/@extended/ActionButtons";

function Index() {

    const {category, isSuccess, isLoading} = useSelector((state) => state.category);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [item, setItem] = useState(null);
    useEffect(() => {
        dispatch(getCategoryRequest())
    }, [])

    function onEdit(value) {
        dispatch(getCategoryByIdRequest(value.id));
        setModal(true);
        setItem(value);
    }

    function onDelete(id) {
        dispatch(deleteCategoryRequest(id));
    }

    const columns = [
        {
            id: 'name',
            label: 'Ism'
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
            <MainCard title="Category"
                      secondary={<Button onClick={() => setModal(true)} type='button' variant="contained"
                                         color="primary">
                          Qo'shish
                      </Button>}>
                <CommonTable data={category} columns={columns} loading={isLoading}/>
            </MainCard>
            <AddCategory item={item} setItem={setItem} open={modal} onClose={setModal}/>
        </Grid>
    );
}

export default Index;