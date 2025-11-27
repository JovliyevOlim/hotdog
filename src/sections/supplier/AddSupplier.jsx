import React, {useEffect, useState} from 'react';
import BasicModal from "../../components/Modal";
import Typography from "@mui/material/Typography";
import * as Yup from "yup";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import {Formik} from "formik";
import AnimateButton from "../../components/@extended/AnimateButton";
import {addSupplierRequest, updateSupplierRequest} from "../../api/supplier/supplierSlice";
import {useDispatch, useSelector} from "react-redux";

function AddSupplier({open, onClose, item, setItem}) {

    const {isLoading} = useSelector((state) => state.supplier);
    const dispatch = useDispatch();
    const [initialValues, setInitialValues] = useState({
        name: "",
        phone: ''
    });


    function tog_standard() {
        onClose(!open)
        setItem(null);
    }

    useEffect(() => {
        if (item) {
            setInitialValues({
                name: item.name,
                phone: item.phone,
            });
        } else {
            setInitialValues({
                name: '',
                phone: ''
            });
        }
    }, [item]);

    return (
        <BasicModal open={open} onClose={onClose}>
            <Typography variant="h4" color="dark">Ta'minotchi qo'shish</Typography>
            <Formik
                initialValues={initialValues}
                enableReinitialize={true}
                validationSchema={Yup.object().shape({
                    name: Yup.string().required('Ism kiriting!'),
                    phone: Yup.string()
                        .required('Telefon raqam kiriting!')
                        .max(12, "Telefon raqam noto'g'ri")
                })}
                onSubmit={(values, {setSubmitting, setErrors}) => {
                    if (item) {
                        try {
                            dispatch(updateSupplierRequest({...values, id: item.id}));
                            setSubmitting(false);
                        } catch (err) {
                            setErrors({submit: err.message});
                            setSubmitting(false);
                        }
                    } else {
                        try {
                            dispatch(addSupplierRequest(values));
                            setSubmitting(false);
                        } catch (err) {
                            setErrors({submit: err.message});
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({errors, handleBlur, handleChange, touched, values, handleSubmit}) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3} >
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
                            <Grid size={12}>
                                <Stack sx={{gap: 1}}>
                                    <InputLabel htmlFor="phone">Telefon raqam</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.phone && errors.phone)}
                                        id="phone"
                                        type={"tel"}
                                        value={values.phone}
                                        name="phone"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Telefon raqam"
                                    />
                                </Stack>
                                {touched.phone && errors.phone && (
                                    <FormHelperText error id="phone">
                                        {errors.phone}
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

export default AddSupplier;