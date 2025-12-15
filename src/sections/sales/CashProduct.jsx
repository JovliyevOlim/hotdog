import React, {useEffect, useRef} from 'react';
import Box from "@mui/material/Box";
import logo from "../../assets/hotdog.png"
import ProductList from "./ProductList";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {useDispatch, useSelector} from "react-redux";
import {addSalesRequest, resetSuccess} from "../../api/purchase/purchaseSlice";
import {useReactToPrint} from "react-to-print";
import Clock from "./Clock";

function CashProduct({list, setList}) {

    const {isLoading, isSuccess} = useSelector((state) => state.purchase)

    const allSum = () => list.reduce((acc, cur) => acc + (cur.option ? cur.price + cur.option.price : cur.price) * cur.quantity, 0);
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
            height: "100%",
            justifyContent: "space-between",
        }}>
            <Box>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: '20px',
                }}>
                    <Typography variant='h4' color='black'>
                        Order 20
                    </Typography>
                    <Typography variant='h6' color='black'>
                        <Clock/>
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', width: '100%', justifyContent: 'center', marginTop: '1rem'}}>
                    <ProductList list={list} setList={setList}/>
                </Box>
            </Box>
            <Box>
                <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                    <Typography variant='h4'>
                        Jami:
                    </Typography>
                    <Typography variant='h4'>
                        {allSum().toLocaleString()} so'm
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'space-between',
                    marginTop: '10px',
                }}>
                    <Button onClick={handleSubmit} loading={isLoading} sx={{display: 'flex', width: '100%'}}
                            size='large'
                            variant='contained' color="primary">
                        To'lov qilish
                    </Button>
                </Box>
                <Box display={'none'}>
                    <div ref={contentRef}>
                        <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between', padding: '1rem'}}>
                            <Typography variant='h3'>
                                Order 20
                            </Typography>
                            <Typography variant='h3'>
                                {new Date().toLocaleString('uz-UZ')}
                            </Typography>
                        </Box>
                        <Box sx={{padding: '1rem'}}>
                            {
                                list.map((item, index) =>
                                    <Box item={index}
                                         sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                                        <Typography variant='h4'>                    {item.name}
                                        </Typography>
                                        <Typography variant='h4'>
                                            {item?.price} x {item?.quantity} = {(item?.price * item.quantity).toLocaleString()} so'm
                                        </Typography>
                                    </Box>
                                )
                            }

                        </Box>
                        <Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between', padding: '1rem'}}>
                            <Typography variant='h3'>
                                Jami:
                            </Typography>
                            <Typography variant='h3'>
                                {allSum().toLocaleString()} so'm
                            </Typography>
                        </Box>
                    </div>
                </Box>
            </Box>
        </Box>
    );
}

export default CashProduct;