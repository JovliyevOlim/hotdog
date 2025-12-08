import React, {useEffect, useState} from 'react';
import * as Yup from "yup";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import {FieldArray, Formik, getIn} from "formik";
import AnimateButton from "../../components/@extended/AnimateButton";
import MainCard from "../../components/MainCard";
import CommonInput from "../../components/CommonInput";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import {useDispatch, useSelector} from "react-redux";
import {getCategoryRequest} from "../../api/category/categorySlice";
import {useNavigate} from "react-router";
import {
    addProductImageRequest,
    addProductRequest,
    getProductSearchRequest,
    resetSuccess
} from "../../api/products/productsSlice";
import {getModifyRequest} from "../../api/modify/modifySlice";
import FormControlLabel from "@mui/material/FormControlLabel";
import {FormLabel, Radio, RadioGroup, Switch} from "@mui/material";
import UploadPreview from "../../components/UploadImage";
import Box from "@mui/material/Box";
import SearchInput from "../../components/SearchInput";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "../../components/@extended/IconButton";

function AddProduct() {

    const {category} = useSelector((state) => state.category)
    const {modify} = useSelector((state) => state.modify)
    const {isLoading, isSuccess, productId, isImageSuccess} = useSelector((state) => state.products)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [searchInput, setSearchInput] = useState("");


    const handleChange = () => {
        dispatch(getProductSearchRequest(searchInput));
    };

    useEffect(() => {
        handleChange()
    }, [searchInput]);

    useEffect(() => {
        dispatch(getCategoryRequest())
        dispatch(getModifyRequest())
    }, [])



    useEffect(() => {
        if (isSuccess) {
            if (!file) {
                dispatch(resetSuccess())
                navigate('/products')
            }
            const formData = new FormData();
            formData.append("file", file);
            dispatch(addProductImageRequest({
                id: productId,
                image: formData,
            }))
        }
    }, [isSuccess])

    useEffect(() => {
        if (isImageSuccess) {
            dispatch(resetSuccess())
            navigate('/products')
        }
    }, [isImageSuccess])

    return (
        <>
            <Grid rowSpacing={4.5} columnSpacing={2.75}>
                <MainCard title="Mahsulotlar qo'shish">
                    <Formik
                        initialValues={{
                            name: '',
                            description: '',
                            availableForSale: false,
                            soldBy: "EACH",
                            price: '',
                            cost: '',
                            sku: '',
                            composite: false,
                            trackStock: false,
                            quantity: 0,
                            lowQuantity: 0,
                            categoryId: '',
                            modifierGroupIds: '',
                            ingredients: [],
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().required('Nomi kiriting!'),
                            categoryId: Yup.string().required('Kategoriya tanlang!'),
                        })}
                        onSubmit={(values, {setSubmitting, setErrors}) => {
                            console.log(values)
                            try {
                                dispatch(addProductRequest({...values, modifierGroupIds:values.modifierGroupIds? [values.modifierGroupIds]:[]}));
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
                                    <CommonInput name={'name'} label={'Nomi'} type={'text'} errors={errors}
                                                 values={values} touched={touched} handleChange={handleChange}
                                                 handleBlur={handleBlur}/>
                                    <Grid item size={{xs: 12, sm: 12, md: 3}}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="categoryId">
                                                Category
                                            </InputLabel>
                                            <Select
                                                id="categoryId"
                                                name="categoryId"
                                                value={values.categoryId}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                label="Category"
                                                fullWidth
                                            >
                                                {
                                                    (category || []).map(item =>
                                                        <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                                                    )
                                                }
                                            </Select>
                                            {touched.categoryId && errors.categoryId && (
                                                <FormHelperText error id={'categoryId'}>
                                                    {errors.categoryId}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <Grid item size={{xs: 12, sm: 12, md: 3}}>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="modifierGroupIds">
                                                Modifier
                                            </InputLabel>
                                            <Select
                                                id="modifierGroupIds"
                                                name="modifierGroupIds"
                                                value={values.modifierGroupIds}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                label="Modifier"
                                                fullWidth
                                            >
                                                {
                                                    (modify || []).map(item =>
                                                        <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                                                    )
                                                }
                                            </Select>
                                            {touched.modifierGroupIds && errors.modifierGroupIds && (
                                                <FormHelperText error id={'modifierGroupIds'}>
                                                    {errors.modifierGroupIds}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <CommonInput name={'description'} label={'Tavsif'} type={'text'} errors={errors}
                                                 values={values} touched={touched} handleChange={handleChange}
                                                 handleBlur={handleBlur}/>
                                    <CommonInput name={'quantity'} label={'Miqdor'} type={'number'} errors={errors}
                                                 values={values} touched={touched} handleChange={handleChange}
                                                 handleBlur={handleBlur}/>
                                    <CommonInput name={'lowQuantity'} label={'Ogohlantirish miqdori'} type={'number'}
                                                 errors={errors}
                                                 values={values} touched={touched} handleChange={handleChange}
                                                 handleBlur={handleBlur}/>
                                    <CommonInput name={'cost'} label={'Olish narxi'} type={'number'} errors={errors}
                                                 values={values} touched={touched} handleChange={handleChange}
                                                 handleBlur={handleBlur}/>
                                    <CommonInput name={'price'} label={'Sotish narxi'} type={'number'} errors={errors}
                                                 values={values} touched={touched} handleChange={handleChange}
                                                 handleBlur={handleBlur}/>

                                    <CommonInput name={'sku'} label={'Sku'} type={'text'} errors={errors}
                                                 values={values} touched={touched} handleChange={handleChange}
                                                 handleBlur={handleBlur}/>
                                    <Grid item size={{xs: 12, sm: 12, md: 3}}>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    name="availableForSale"
                                                    checked={values.availableForSale}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            }
                                            label="Sotiladiganmi"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    name="trackStock"
                                                    checked={values.trackStock}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                            }
                                            label="Omborda sanaladimi"
                                        />
                                    </Grid>

                                    <Grid item size={{xs: 12, sm: 12, md: 3}}>
                                        <FormControl component="fieldset"
                                                     error={touched.gender && Boolean(errors.gender)}>
                                            <FormLabel>Turi</FormLabel>

                                            <RadioGroup
                                                name="soldBy"
                                                value={values.soldBy}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            >
                                                <FormControlLabel value="EACH" control={<Radio/>} label="Donali"/>
                                                <FormControlLabel value="WEIGHT" control={<Radio/>} label="Kgli"/>
                                            </RadioGroup>

                                            {touched.soldBy && errors.soldBy && (
                                                <FormHelperText>{errors.soldBy}</FormHelperText>
                                            )}
                                        </FormControl>
                                    </Grid>
                                    <UploadPreview file={file} setFile={setFile}/>
                                    <Grid item size={12}>
                                        <InputLabel htmlFor="modifierGroupIds" marginBottom={2}>
                                            Ichki mahsulot qo'shish
                                        </InputLabel>
                                        <FieldArray name="ingredients">
                                            {({push, remove}) => (
                                                <Box display="flex" flexDirection="column" gap={2}>
                                                    <Grid item size={12}>
                                                        <SearchInput  push={(findProduct)=>{
                                                            push({name: findProduct.name, ingredientProductId: findProduct.id, quantity: 1});
                                                        }} text={'Mahsulotni qidirish'}
                                                                     search={searchInput}
                                                                     setSearchInput={setSearchInput}/>
                                                    </Grid>
                                                    {values.ingredients.map((item, index) => {
                                                        const prodError = getIn(errors, `ingredients[${index}].ingredientProductId`);
                                                        const prodTouched = getIn(
                                                            touched,
                                                            `ingredients[${index}].ingredientProductId`
                                                        );

                                                        const qtyError = getIn(errors, `ingredients[${index}].quantity`);
                                                        const qtyTouched = getIn(touched, `ingredients[${index}].quantity`);

                                                        return (
                                                            <Grid
                                                                key={index}
                                                                container
                                                                spacing={12}
                                                            >
                                                                <Typography>  {item.name}</Typography>

                                                                <TextField
                                                                    label="Quantity"
                                                                    name={`ingredients[${index}].quantity`}
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


                                                                {/* Remove button (agar 1 ta bo'lsa o'chirmaslik ham mumkin) */}
                                                                <IconButton
                                                                    aria-label="delete"
                                                                    color="error"
                                                                    onClick={() => remove(index)}
                                                                    disabled={values.ingredients.length === 1}
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

export default AddProduct;