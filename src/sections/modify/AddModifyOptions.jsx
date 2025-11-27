import React, {useEffect, useState} from 'react';
import BasicModal from "../../components/Modal";
import Typography from "@mui/material/Typography";
import * as Yup from "yup";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import {Formik} from "formik";
import AnimateButton from "../../components/@extended/AnimateButton";
import {addCategoryRequest, updateCategoryRequest} from "../../api/category/categorySlice";
import {useDispatch, useSelector} from "react-redux";
import CommonInput from "../../components/CommonInput";
import {addModifyOptionsRequest} from "../../api/modify/modifySlice";

function AddModifyOptions({open, onClose, item, setItem,id}) {
    const {isLoading} = useSelector((state) => state.modify);
    const dispatch = useDispatch();
    const [initialValues, setInitialValues] = useState({
        name: "",
        price:0
    });


    function tog_standard() {
        onClose(!open)
        setItem(null);
    }

    useEffect(() => {
        if (item) {
            setInitialValues({
                name: item.name,
            });
        } else {
            setInitialValues({
                name: '',
                price:0
            });
        }
    }, [item]);


    return (
        <BasicModal open={open} onClose={onClose}>
            <Typography variant="h4" my={2} color="dark">Options qo'shish</Typography>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required('Nomini kiriting!'),
                    price: Yup.string().required('Narxni kiriting!'),
                })}
                onSubmit={(values, {setSubmitting, setErrors}) => {
                    if (item) {
                        try {
                            dispatch(updateCategoryRequest({...values,id:item.id}));
                            setSubmitting(false);
                        } catch (err) {
                            setErrors({submit: err.message});
                            setSubmitting(false);
                        }
                    } else {
                        try {
                            dispatch(addModifyOptionsRequest({...values, id: id}));
                            setSubmitting(false);
                        } catch (err) {
                            setErrors({submit: err.message});
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({handleSubmit, resetForm}) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid size={12}>
                                <CommonInput
                                    name="name"
                                    label="Nomi"
                                    placeholder="Nomi"
                                    fullWidth
                                    type={"text"}
                                />
                            </Grid>
                            <Grid size={12}>
                                <CommonInput
                                    name="price"
                                    label="Narxi"
                                    placeholder="Narxi"
                                    fullWidth
                                    type={"number"}
                                />
                            </Grid>
                            <Grid size={12} direction="column" display={'flex'} justifyContent="end" gap={2}>
                                <AnimateButton>
                                    <Button type='button' fullWidth size="large" onClick={tog_standard}
                                            variant="contained"
                                            color="error">
                                        Bekor qilish
                                    </Button>
                                </AnimateButton>
                                <AnimateButton>
                                    <Button type='submit' loading={isLoading} loadingPosition="end"
                                            fullWidth size="large" variant="contained"
                                            color="primary">
                                        Saqlash
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </BasicModal>);
}

export default AddModifyOptions;