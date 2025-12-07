import Box from "@mui/material/Box";
import ProductListCard from "./ProductListCard";


export default function ProductList({list, setList}) {


    const increase = (id) => {
        setList(prev =>
            prev.map(item =>
                item.productId === id ? {...item, quantity: item.quantity + 1} : item
            )
        );
    };

    const decrease = (id) => {
        setList(prev =>
            prev
                .map(item =>
                    item.productId === id ? {...item, quantity: Math.max(1, item.quantity - 1)} : item
                )
        );
    };

    const remove = (id) => {
        setList(prev => prev.filter(item => item.productId !== id));
    };

    return (
        <Box sx={{flexGrow: 1, height: 'calc(100vh - 250px)', overflowY: 'scroll'}}>
            {
                list?.map(item =>
                    <ProductListCard item={item} key={item.id} decrease={decrease} remove={remove} increase={increase}/>
                )
            }
        </Box>
    );
}
