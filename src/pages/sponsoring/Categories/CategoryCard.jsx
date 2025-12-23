import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ title, image, type }) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                width: 360,
                height: 335,
                borderRadius: 5,
                transition: '0.3s ease',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8,
                },
            }}
        >
            <CardMedia
                component="img"
                height="215"
                image={image}
                alt={title}
                sx={{
                    transition: '0.3s',
                    '&:hover': {
                        filter: 'brightness(0.9)',
                    },
                }}
            />

            <CardContent>
                <Typography textAlign="center" variant="h6" fontWeight="bold">
                    {title}
                </Typography>

                <Box display="flex" justifyContent="center" mt={2}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => navigate(`/sponsoring/${type}`)}
                    >
                        عرض الأيتام
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CategoryCard;
