import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import {useSelector} from "react-redux";
import FormControl from "@mui/material/FormControl";

export default function SearchInput({text, search, setSearchInput, push}) {
    const {productsSearch} = useSelector(state => state.products);

    return (
        <FormControl fullWidth>
            <Autocomplete
                fullWidth
                freeSolo
                id={text}
                onChange={(e, newValue) => {
                    const findProduct = productsSearch.find((item) => item.name === newValue);
                    push(findProduct);
                }} disableClearable
                options={(productsSearch || []).map((option) => option.name)}
                renderInput={(params) => (
                    <TextField
                        fullWidth
                        {...params}
                        value={search}
                        onChange={(e) => setSearchInput(e.target.value)}
                        label={text}
                        slotProps={{
                            input: {
                                ...params.InputProps,
                                type: 'search',
                            },
                        }}
                    />
                )}
            />
        </FormControl>
    );
}