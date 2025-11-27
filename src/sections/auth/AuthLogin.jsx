import PropTypes from 'prop-types';
import React, {useEffect} from 'react';
import {Link as RouterLink} from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third-party
import * as Yup from 'yup';
import {Formik} from 'formik';

// project imports
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';
import {loginRequest, registerRequest} from "../../api/auth/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {getItems} from "../../utils/utils";

// ============================|| JWT - LOGIN ||============================ //

export default function AuthLogin({isDemo = false}) {
    const dispatch = useDispatch();
    const {token, isLoading, error} = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    useEffect(() => {
        if (getItems('token')) {
            navigate('/dashboard');
        }
    },[isLoading]);

    return (
        <>
            <Formik
                initialValues={{
                    email: 'admin',
                    password: '123',
                }}
                validationSchema={Yup.object().shape({
                    // email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    password: Yup.string()
                        .required('Password is required')
                        .test('no-leading-trailing-whitespace', 'Password cannot start or end with spaces', (value) => value === value.trim())
                        .max(10, 'Password must be less than 10 characters')
                })}
                onSubmit={(values, {setSubmitting, setErrors}) => {
                    console.log(values);
                    try {
                        dispatch(loginRequest(values));
                        setSubmitting(false);
                    } catch (err) {
                        setErrors({submit: err.message});
                        setSubmitting(false);
                    }
                }}
            >
                {({errors, handleBlur, handleChange, touched, values, handleSubmit}) => (
                    <form noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid size={12}>
                                <Stack sx={{gap: 1}}>
                                    <InputLabel htmlFor="email-login">Email Address</InputLabel>
                                    <OutlinedInput
                                        id="email-login"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                        fullWidth
                                        error={Boolean(touched.email && errors.email)}
                                    />
                                </Stack>
                                {touched.email && errors.email && (
                                    <FormHelperText error id="standard-weight-helper-text-email-login">
                                        {errors.email}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid size={12}>
                                <Stack sx={{gap: 1}}>
                                    <InputLabel htmlFor="password-login">Password</InputLabel>
                                    <OutlinedInput
                                        fullWidth
                                        error={Boolean(touched.password && errors.password)}
                                        id="-password-login"
                                        type={showPassword ? 'text' : 'password'}
                                        value={values.password}
                                        name="password"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
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
                                        placeholder="Enter password"
                                    />
                                </Stack>
                                {touched.password && errors.password && (
                                    <FormHelperText error id="standard-weight-helper-text-password-login">
                                        {errors.password}
                                    </FormHelperText>
                                )}
                            </Grid>
                            <Grid size={12}>
                                <AnimateButton>
                                    <Button type='submit' fullWidth size="large" variant="contained" color="primary">
                                        Login
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

AuthLogin.propTypes = {isDemo: PropTypes.bool};
