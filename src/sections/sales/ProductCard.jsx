import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid2";

export default function ProductCard({item, setProducts}) {
    return (
        <Grid size={{xs: 12, sm: 6, md: 4, lg: 3}}>
            <Card
                onClick={() => setProducts(item)}
                sx={{
                    cursor: 'pointer',
                    borderRadius: 2,
                    border: '1px solid #dadbdc',
                    boxShadow: 0,
                    transition: '0.2s',
                    height: 150,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <CardMedia
                    component="img"
                    image={item.imageUrl}
                    alt={item.name}
                    sx={{
                        height: 100,         // mukammal balandlik
                        width: '100%',
                        objectFit: 'contain',  // rasmni proporsional to'ldiradi
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                    }}
                />

                <CardContent sx={{textAlign: 'center', padding: '5px !important'}}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {item.name}
                    </Typography>

                    <Typography variant="body1" sx={{fontWeight: 700, color: 'red'}}>
                        {item.price ? item?.price.toLocaleString() : 0} so'm
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}
