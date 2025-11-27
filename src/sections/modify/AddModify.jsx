import React, {useEffect, useState} from 'react';
import BasicModal from "../../components/Modal";
import Typography from "@mui/material/Typography";
import * as Yup from "yup";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import {FieldArray, Formik} from "formik";
import AnimateButton from "../../components/@extended/AnimateButton";
import {useDispatch, useSelector} from "react-redux";
import CommonInput from "../../components/CommonInput";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import {
    PlusOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import {addModifyRequest, updateModifyRequest} from "../../api/modify/modifySlice";

function AddModify({open, onClose, item, setItem}) {
    const {isLoading} = useSelector((state) => state.modify);
    const dispatch = useDispatch();
    const [initialValues, setInitialValues] = useState({
        name: "",
        options: [
            {
                name: '',
                price: 0
            }
        ]
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
                options: [
                    {
                        name: '',
                        price: 0
                    }
                ]
            });
        }
    }, [item]);


    return (
        <BasicModal open={open} onClose={onClose}>
            <Typography variant="h4" my={2} color="dark">Modifier qo'shish</Typography>
            <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={
                    Yup.object({
                        name: Yup.string().required("Ismni kiriting!"),
                        options: Yup.array()
                            .of(
                                Yup.object({
                                    name: Yup.string().required("Options name is required"),
                                    price: Yup.number()
                                        .min(0, "Price cannot be negative")
                                        .required("Narxni kiriting!"),
                                })
                            )
                            .min(1, "Kamida bitta bo'lishi kerak"),
                    })
                }
                onSubmit={(values, {setSubmitting, setErrors}) => {
                    if (item) {
                        try {
                            dispatch(updateModifyRequest({...values, id: item.id}));
                            setSubmitting(false);
                        } catch (err) {
                            setErrors({submit: err.message});
                            setSubmitting(false);
                        }
                    } else {
                        try {
                            dispatch(addModifyRequest(values));
                            setSubmitting(false);
                        } catch (err) {
                            setErrors({submit: err.message});
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({handleSubmit, resetForm, values, errors, touched, handleChange, handleBlur}) => (
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
                                <FieldArray name="options">
                                    {({push, remove}) => (
                                        <>
                                            <Typography variant="h6">Options</Typography>
                                            {
                                                console.log(values)
                                            }
                                            {values.options.map((option, index) => (
                                                <Paper key={index} sx={{p: 2}}>
                                                    <Grid container spacing={2} alignItems="center">

                                                        {/* Option Name */}
                                                        <Grid item xs={5}>
                                                            <TextField
                                                                fullWidth
                                                                label="Option Name"
                                                                name={`options[${index}].name`}
                                                                value={option.name}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                error={Boolean(
                                                                    errors?.options?.[index]?.name && touched?.options?.[index]?.name
                                                                )}
                                                                helperText={
                                                                    touched?.options?.[index]?.name && errors?.options?.[index]?.name
                                                                }
                                                            />
                                                        </Grid>

                                                        {/* Option Price */}
                                                        <Grid item xs={5}>
                                                            <TextField
                                                                fullWidth
                                                                label="Price"
                                                                type="number"
                                                                name={`options[${index}].price`}
                                                                value={option.price}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                error={Boolean(
                                                                    errors?.options?.[index]?.price && touched?.options?.[index]?.price
                                                                )}
                                                                helperText={
                                                                    touched?.options?.[index]?.price && errors?.options?.[index]?.price
                                                                }
                                                            />
                                                        </Grid>

                                                        {/* Remove Button */}
                                                        <Grid item xs={2}>
                                                            {values.options.length > 1 && (
                                                                <IconButton color="error" onClick={() => remove(index)}>
                                                                    <DeleteOutlined/>
                                                                </IconButton>
                                                            )}
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            ))}
                                            <Grid item display={'flex'} mt={2} justifyContent={'center'}>
                                                <Button
                                                    variant="contained"
                                                    startIcon={<PlusOutlined/>}
                                                    onClick={() => push({name: "", price: 0})}
                                                >
                                                    Add Option
                                                </Button>
                                            </Grid>

                                        </>
                                    )}
                                </FieldArray>
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

export default AddModify;