import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import {useSelector} from "react-redux";

export default function SearchInput({text, search, setSearchInput, push}) {
    const {productsSearch} = useSelector(state => state.products);


    return (
        <Stack spacing={2}>
            <Autocomplete
                freeSolo
                id={text}
                onChange={(e, newValue) => {
                    const findProduct = productsSearch.find((item) => item.name === newValue);
                    push({name: findProduct.name, productId: findProduct.id, quantity: 1, purchaseCost: findProduct.price});
                }} disableClearable
                options={(productsSearch || []).map((option) => option.name)}
                renderInput={(params) => (
                    <TextField
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
        </Stack>
    );
}