import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function ProductCard({item, setProducts}) {
    return (
        <Card sx={{width: '100%'}} onClick={() => setProducts(item)}>
            <CardMedia
                sx={{height: 100}}
                image={item.imageUrl}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" textAlign='center' component="div">
                    {item.name}
                </Typography>
                <Typography variant="body2" textAlign='center' component="div">
                    {item.price} so'm
                </Typography>
            </CardContent>
        </Card>
    );
}
