import {useEffect, useState} from 'react';
import {Link as RouterLink, useSearchParams} from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import * as Yup from 'yup';
import {Formik} from 'formik';

// project imports
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';


// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import {registerRequest} from "../../api/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {getItems} from "../../utils/utils";
import {useNavigate} from "react-router";

// ============================|| JWT - REGISTER ||============================ //

export default function AuthRegister() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token, isLoading, error} = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    console.log(isLoading,'loading');


    useEffect(() => {
        if (getItems('token')) {
            navigate('/dashboard');
        }
    }, [isLoading]);



    return (
        <>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                }}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string().max(255).required('Ismni kiriting!'),
                    lastName: Yup.string().max(255).required('Familiyani kiriting!'),
                    email: Yup.string().email("Email noto'g'ri kiritildi!").max(255).required('Emailni kiriting!'),
                    password: Yup.string()
                        .required('Parolni kiriting!')
                        .min(6, "Parol kamida 6 ta belgi bo'lishi kerak")
                })}
                onSubmit={(values, {setSubmitting, setErrors}) => {
                    console.log(values);
                    try {
                        dispatch(registerRequest(values));
                        setSubmitting(false);
                    } catch (err) {
                        setErrors({submit: err.message});
                        setSubmitting(false);
                    }
                }}
                enableReinitialize={false}
            >
                {({errors, handleBlur, handleChange, touched, values, handleSubmit}) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid size={{xs: 12, md: 6}}>
                                <Stack sx={{gap: 1}}>
                                    <InputLabel htmlFor="firstName-signup">Ism</InputLabel>
                                    <OutlinedInput
                                        id="firstName-login"
                                        type="firstName"
                                        value={values.firstname}
                                        name="firstName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Ism"
                                        fullWidth
                                        error={Boolean(touched.firstName && errors.firstName)}
                                    />
                                </Stack>
                                {touched.firstName && errors.firstName && (
                                    <FormHelperText error id="helper-text-firstname-signup">
                                        {errors.firstName}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid size={{xs: 12, md: 6}}>
                                <Stack sx={{gap: 1}}>
                                    <InputLabel htmlFor="lastName-signup">Familiya</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.lastName && errors.lastName)}
                                        id="lastName-signup"
                                        type="lastName"
                                        value={values.lastName}
                                        name="lastName"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Familiya"
                                        inputProps={{}}
                                    />
                                </Stack>
                                {touched.lastName && errors.lastName && (
                                    <FormHelperText error id="helper-text-lastname-signup">
                                        {errors.lastName}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid size={12}>
                                <Stack sx={{gap: 1}}>
                                    <InputLabel htmlFor="email-signup">Email</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                        id="email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="demo@gmail.com"
                                        inputProps={{}}
                                    />
                                </Stack>
                                {touched.email && errors.email && (
                                    <FormHelperText error id="helper-text-email-signup">
                                        {errors.email}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid size={12}>
                                <Stack sx={{gap: 1}}>
                                    <InputLabel htmlFor="password-signup">Parol</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="password-signup"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={(e) => {
                                            handleChange(e);
                                        }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                    color="secondary"
                                                >
                                                    {showPassword ? <EyeOutlined/> : <EyeInvisibleOutlined/>}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        placeholder="******"
                                        inputProps={{}}
                                    />
                                </Stack>
                                {touched.password && errors.password && (
                                    <FormHelperText error id="helper-text-password-signup">
                                        {errors.password}
                                    </FormHelperText>
                                )}
                            </Grid>
                            {errors.submit && (
                                <Grid size={12}>
                                    <FormHelperText error>{errors.submit}</FormHelperText>
                                </Grid>
                            )}
                            <Grid size={12}>
                                <AnimateButton>
                                    <Button type='submit' fullWidth size="large" variant="contained" color="primary">
                                        Ro'yxatdan o'tish
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Formik>
        </>
    );
}
