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
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";

function AddCategory({open, onClose, item, setItem}) {
    const {isLoading} = useSelector((state) => state.category);
    const dispatch = useDispatch();
    const [initialValues, setInitialValues] = useState({
        name: "",
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
                name: ''
            });
        }
    }, [item]);


    return (
        <BasicModal open={open} onClose={onClose}>
            <Typography variant="h4" my={2} color="dark">Kategoriya qo'shish</Typography>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required('Nomini kiriting!'),
                })}
                onSubmit={(values, {setSubmitting, setErrors}) => {
                    if (item) {
                        try {
                            dispatch(updateCategoryRequest({...values, id: item.id}));
                            setSubmitting(false);
                        } catch (err) {
                            setErrors({submit: err.message});
                            setSubmitting(false);
                        }
                    } else {
                        try {
                            dispatch(addCategoryRequest(values));
                            setSubmitting(false);
                        } catch (err) {
                            setErrors({submit: err.message});
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({handleSubmit, resetForm, touched, errors, handleBlur, handleChange, values}) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid size={12}>
                                <Stack sx={{gap: 1}}>
                                    <InputLabel htmlFor="name">Ism</InputLabel>
                                    <OutlinedInput
                                        id="name"
                                        type="email"
                                        value={values.name}
                                        name="name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Ism"
                                        fullWidth
                                        error={Boolean(touched.name && errors.name)}
                                    />
                                </Stack>
                                {touched.name && errors.name && (
                                    <FormHelperText error id="name">
                                        {errors.name}
                                    </FormHelperText>
                                )}
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

export default AddCategory;