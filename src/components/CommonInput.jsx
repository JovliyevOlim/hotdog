import React from 'react';
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Grid from "@mui/material/Grid2";
import FormControl from "@mui/material/FormControl";
import {useFormikContext} from "formik";

function CommonInput({name, label, type, placeholder}) {
    const {values, errors, touched, handleChange, handleBlur} = useFormikContext();
    return (
        <Grid item size={{xs: 12, sm: 12, md: 3}}>
            <Stack sx={{gap: 1}}>
                <FormControl fullWidth variant="outlined" error={Boolean(touched[name] && errors[name])}>
                    <InputLabel htmlFor="name">{label}</InputLabel>
                    <OutlinedInput
                        id={name}
                        type={type}
                        value={values[name]}
                        name={name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        placeholder={placeholder}
                        fullWidth
                        error={Boolean(touched[name] && errors[name])}
                    />
                </FormControl>
            </Stack>
            {touched[name] && errors[name] && (
                <FormHelperText error id={name}>
                    {errors[name]}
                </FormHelperText>
            )}
        </Grid>
    );
}

export default CommonInput;