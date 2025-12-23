import React, {useEffect, useState} from 'react';
import * as Yup from "yup";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import {FieldArray, Formik, getIn} from "formik";
import AnimateButton from "../../components/@extended/AnimateButton";
import MainCard from "../../components/MainCard";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {getSupplierRequest} from "../../api/supplier/supplierSlice";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "../../components/@extended/IconButton";
import SearchInput from "../../components/SearchInput";
import {addPurchaseRequest, resetSuccess} from "../../api/purchase/purchaseSlice";
import CommonInput from "../../components/CommonInput";
import {getProductSearchRequest} from "../../api/products/productsSlice";
import Typography from "@mui/material/Typography";

function Purchase() {

    const {supplier} = useSelector((state) => state.supplier);
    const {isLoading, isSuccess} = useSelector((state) => state.purchase)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState("");


    const handleChange = () => {
        dispatch(getProductSearchRequest(searchInput));
    };

    useEffect(() => {
        handleChange()
    }, [searchInput]);

    useEffect(() => {
        dispatch(getSupplierRequest())
    }, [])

    useEffect(() => {
        if (isSuccess) {
            dispatch(resetSuccess())
            navigate('/products')
        }
    }, [isSuccess])

    return (
        <>
            <Grid rowSpacing={4.5} columnSpacing={2.75}>
                <MainCard title="Xarid qilish">
                    <Formik
                        initialValues={{
                            supplierId: "",
                            purchasedDate: new Date("2025-11-27T17:47:11.932Z")
                                .toISOString()
                                .slice(0, 10),
                            notes: "",
                            items: [],
                            extraCosts:[
                                {
                                    name:"string",
                                    amount:0
                                }
                            ]
                        }}
                        validationSchema={Yup.object().shape({
                            supplierId: Yup.string().required("Ta'minotchini tanlang!"),
                            items: Yup.array()
                                .of(
                                    Yup.object().shape({
                                        quantity: Yup.number()
                                            .required("Miqdor kiriting")
                                            .min(1, "Kamida 1 bo'lishi kerak"),
                                        purchaseCost: Yup.number()
                                            .required("Narx kiriting")
                                            .min(0, "0 dan kichik bo'lishi mumkin emas"),
                                    })
                                )
                                .min(1, "Kamida bitta item bo'lishi kerak"),
                        })}
                        onSubmit={(values, {setSubmitting, setErrors}) => {
                            console.log(values)
                            try {
                                dispatch(addPurchaseRequest(values));
                                setSubmitting(false);
                            } catch (err) {
                                setErrors({submit: err.message});
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({errors, handleBlur, handleChange, touched, values, handleSubmit}) => (
                            <form noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}
                                      alignItems="top">
                                    <Grid item size={{xs: 12, sm: 12, md: 3}}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="supplierId">
                                                Ta'minotchilar
                                            </InputLabel>
                                            <Select
                                                id="supplierId"
                                                name="supplierId"
                                                value={values.supplierId}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                label="Ta'minotchi"
                                                fullWidth
                                            >
                                                {
                                                    (supplier || []).map(item =>
                                                        <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                                                    )
                                                }
                                            </Select>
                                            {touched.supplierId && errors.supplierId && (
                                                <FormHelperText error id={'categoryId'}>
                                                    {errors.supplierId}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <CommonInput name={'notes'} label={'Tavsif'} type={'text'} errors={errors}
                                                 values={values} touched={touched} handleChange={handleChange}
                                                 handleBlur={handleBlur}/>
                                    <CommonInput name={'purchasedDate'} label={'Sana'} type={'date'} errors={errors}
                                                 values={values} touched={touched} handleChange={handleChange}
                                                 handleBlur={handleBlur}/>
                                    <Grid item size={12}>
                                        <FieldArray name="items">
                                            {({push, remove}) => (
                                                <Box display="flex" flexDirection="column" gap={2}>
                                                    <Grid item size={12}>
                                                        <SearchInput push={(findProduct)=>{
                                                            push({name: findProduct.name, productId: findProduct.id, quantity: 1, purchaseCost: findProduct.price});
                                                        }} text={'Mahsulotni qidirish'}
                                                                     search={searchInput}
                                                                     setSearchInput={setSearchInput}/>
                                                    </Grid>
                                                    {values.items.map((item, index) => {
                                                        const prodError = getIn(errors, `items[${index}].productId`);
                                                        const prodTouched = getIn(
                                                            touched,
                                                            `items[${index}].productId`
                                                        );

                                                        const qtyError = getIn(errors, `items[${index}].quantity`);
                                                        const qtyTouched = getIn(touched, `items[${index}].quantity`);

                                                        const costError = getIn(
                                                            errors,
                                                            `items[${index}].purchaseCost`
                                                        );
                                                        const costTouched = getIn(
                                                            touched,
                                                            `items[${index}].purchaseCost`
                                                        );

                                                        return (
                                                            <Grid
                                                                key={index}
                                                                container
                                                                spacing={12}
                                                            >
                                                                <Typography>  {item.name}</Typography>

                                                                <TextField
                                                                    label="Quantity"
                                                                    name={`items[${index}].quantity`}
                                                                    value={item.quantity}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    error={Boolean(qtyError && qtyTouched)}
                                                                    helperText={qtyTouched && qtyError ? qtyError : ""}
                                                                    size="small"
                                                                    type="number"
                                                                    inputProps={{min: 1}}
                                                                    sx={{width: 130}}
                                                                />

                                                                {/* Purchase cost */}
                                                                <TextField
                                                                    label="Purchase cost"
                                                                    name={`items[${index}].purchaseCost`}
                                                                    value={item.purchaseCost}
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    error={Boolean(costError && costTouched)}
                                                                    helperText={costTouched && costError ? costError : ""}
                                                                    size="small"
                                                                    type="number"
                                                                    inputProps={{min: 0, step: "0.01"}}
                                                                    sx={{width: 160}}
                                                                />

                                                                {/* Remove button (agar 1 ta bo'lsa o'chirmaslik ham mumkin) */}
                                                                <IconButton
                                                                    aria-label="delete"
                                                                    color="error"
                                                                    onClick={() => remove(index)}
                                                                    disabled={values.items.length === 1}
                                                                >
                                                                    {/*<DeleteIcon />*/}
                                                                </IconButton>
                                                            </Grid>
                                                        );
                                                    })}
                                                </Box>
                                            )}
                                        </FieldArray>
                                    </Grid>
                                    <Grid item size={12}>
                                        <AnimateButton>
                                            <Button type='submit' loading={isLoading} fullWidth size="large"
                                                    variant="contained"
                                                    color="primary">
                                                Save
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </form>
                        )}
                    </Formik>
                </MainCard>
            </Grid>
        </>);
}

export default Purchase;