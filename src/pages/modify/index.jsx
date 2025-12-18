import {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid2";
import MainCard from "../../components/MainCard";
import CommonTable from "../../components/Table";
import {useDispatch, useSelector} from "react-redux";
import Button from "@mui/material/Button";
import ActionButtons from "../../components/@extended/ActionButtons";
import {deleteModifyRequest, getModifyRequest, resetSuccess} from "../../api/modify/modifySlice";
import Typography from "@mui/material/Typography";
import AddModify from "../../sections/modify/AddModify";
import AddModifyOptions from "../../sections/modify/AddModifyOptions";

function Index() {

    const {modify, isSuccess, isLoading} = useSelector((state) => state.modify);
    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const [modalOptions, setModalOptions] = useState(false);
    const [item, setItem] = useState(null);
    const [itemOptions, setItemOptions] = useState(null);
    const [EditId, setEditId] = useState(null);
    useEffect(() => {
        dispatch(getModifyRequest())
    }, [])

    function onEdit(value) {
        console.log(value)
        // dispatch(getCategoryByIdRequest(value.id));
        setModal(true);
        setItem(value);
    }

    function onDelete(id) {
        console.log(id)
        dispatch(deleteModifyRequest(id));
    }

    function onAddOptions(id, value) {
        setModalOptions(true);
        setItemOptions(value);
        setEditId(id);
    }

    const columns = [
        {
            id: 'name',
            label: 'Ism'
        },
        {
            id: "options",
            label: 'Options',
            render: (value, row) => (
                <div>
                    {
                        value.map((option, index) => (
                            <Grid key={index} display={'flex'} gap={2}>
                                <Typography> {option.name}</Typography>
                                <Typography>{option.price} so'm</Typography>
                            </Grid>
                        ))
                    }
                </div>
            )
        },
        {
            id: "id",
            label: '',
            render: (value, row) => (
                <ActionButtons  onAdd={() => onAddOptions(value, null)}
                               onDelete={() => onDelete(value)}/>
            )
        }
    ]

    useEffect(() => {
        if (isSuccess) {
            setModal(false);
            setModalOptions(false);
            dispatch(resetSuccess());
        }
    }, [isSuccess]);

    return (
        <Grid rowSpacing={4.5} columnSpacing={2.75}>
            <MainCard title="Modifier"
                      secondary={<Button onClick={() => setModal(true)} type='button' variant="contained"
                                         color="primary">
                          Qo'shish
                      </Button>}>
                <CommonTable data={modify} columns={columns} loading={isLoading}/>
            </MainCard>
            <AddModify item={item} setItem={setItem} open={modal} onClose={setModal}/>
            <AddModifyOptions item={itemOptions} setItem={setItemOptions} open={modalOptions} id={EditId}
                              onClose={setModalOptions}/>
        </Grid>
    );
}

export default Index;