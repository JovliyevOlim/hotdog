import React, {useEffect, useRef} from 'react';
import Box from "@mui/material/Box";
import {ImageList, ImageListItem} from "@mui/material";
import logo from "../../assets/hotdog.png"
import ProductList from "./ProductList";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {addSalesRequest, resetSuccess} from "../../api/purchase/purchaseSlice";
import {useReactToPrint} from "react-to-print";

function CashProduct({list, setList}) {

    const {isLoading, isSuccess} = useSelector((state) => state.purchase)

    const allSum = () => list.reduce((acc, cur) => acc + cur.price * cur.quantity, 0);
    const dispatch = useDispatch();
    const contentRef = useRef(null);
    const reactToPrintFn = useReactToPrint({contentRef});


    function handleSubmit() {
        dispatch(addSalesRequest({
            items: list,
            paymentType: 'CASH',
            paidAmount: allSum()
        }))
    }


    useEffect(() => {
        if (isSuccess) {
            reactToPrintFn()
            setList([])
            dispatch(resetSuccess())
        }
    }, [isSuccess])

    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            justifyContent: "space-between",
        }}>
            <Box>
                <Box sx={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                    <ImageList sx={{width: 80, height: 80}} cols={1}>
                        <ImageListItem>
                            <img
                                srcSet={logo}
                                src={logo}
                                loading="lazy"
                            />
                        </ImageListItem>
                    </ImageList>
                </Box>
                <Box sx={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                    <ProductList list={list}/>
                </Box>
            </Box>
            <Box>
                <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between', padding: '1rem'}}>
                    <Typography variant='h2'>
                        Jami:
                    </Typography>
                    <Typography variant='h2'>
                        {allSum()} so'm
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between', padding: '1rem'}}>
                    <Button onClick={handleSubmit} loading={isLoading} sx={{display: 'flex', width: '100%'}}
                            size='large'
                            variant='contained' color="primary">
                        To'lov qilish
                    </Button>
                </Box>
                <Box display={'none'}>
                    <div ref={contentRef}>
                        <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between', padding: '1rem'}}>
                            <Typography variant='h2'>
                                Sana
                            </Typography>
                            <Typography variant='h2'>
                                {new Date().toLocaleString('uz-UZ')}
                            </Typography>
                        </Box>
                        <ProductList list={list}/>
                        <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between', padding: '1rem'}}>
                            <Typography variant='h2'>
                                Jami:
                            </Typography>
                            <Typography variant='h2'>
                                {allSum()} so'm
                            </Typography>
                        </Box>
                    </div>
                </Box>
            </Box>
        </Box>
    );
}

export default CashProduct;