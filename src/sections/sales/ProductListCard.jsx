import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {DeleteOutlined, MinusOutlined, PlusOutlined} from "@ant-design/icons";
import Button from "@mui/material/Button";

function ProductListCard({item, increase, remove, decrease, key}) {
    return (
        <Card
            sx={{
                cursor: 'pointer',
                borderRadius: 2,
                border: '1px solid #dadbdc',
                boxShadow: 0,
                transition: '0.2s',
                height: 90,
                display: 'flex',
                marginTop: '10px',
                flexDirection: 'column',
                padding: '0.2rem 0.5rem',
            }}
        ><CardContent sx={{textAlign: 'center', padding: '5px !important'}}>
            <Box sx={{width: '100%'}} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
                <Typography
                    variant="h6"
                    sx={{
                        textAlign: 'left',
                        fontWeight: 600,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {item.name} {
                    item.option && `+ ${item.option.name}`
                }
                </Typography>
                <Typography
                    sx={{
                        textAlign: 'left',
                        fontWeight: 600,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        background: 'red',
                        padding: "2px 5px",
                        borderRadius: '50%',
                        color: 'white',
                    }}
                >
                    <DeleteOutlined width={20} height={20} onClick={remove}
                    />
                </Typography>
            </Box>


            <Typography variant="body1" sx={{fontWeight: 700, color: 'orange', textAlign: 'left'}}>
                {item?.price.toLocaleString()} x {item?.quantity} = {(item?.price * item.quantity).toLocaleString()} so'm
            </Typography>

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                gap: 1
            }}>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{minWidth: 22, height: 22, padding: 0, borderRadius: '50%'}}
                    onClick={decrease}
                ><MinusOutlined/>
                </Button>

                <Typography variant={'p'} sx={{width: 18, textAlign: 'center'}}>
                    {item.quantity}
                </Typography>

                <Button
                    variant="contained"
                    color="success"
                    size="small"
                    sx={{minWidth: 22, height: 22, padding: 0, borderRadius: "50%"}}
                    onClick={increase}
                >
                    <PlusOutlined/>
                </Button>
            </Box>

        </CardContent>
        </Card>
    );
}

export default ProductListCard;