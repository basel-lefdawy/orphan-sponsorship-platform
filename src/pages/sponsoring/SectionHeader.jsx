import { Box, Typography } from '@mui/material';

const SectionHeader = ({ title, textAlign }) => {
    return (
        <Box dir="rtl" sx={{ my: 4 }}>


            <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ mb: 1 }}
                textAlign={textAlign}
            >
                {title}
            </Typography>

            <Box
                sx={{
                    width: '100%',
                    height: '3px',
                    background: 'linear-gradient(to left, #2e7d32, #c8e6c9)',
                    borderRadius: 2,
                }}
            />
        </Box>
    );
};

export default SectionHeader;
