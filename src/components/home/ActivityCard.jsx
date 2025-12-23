import { Card, CardContent, Typography, Box, Chip } from "@mui/material";

function ActivityCard({ activity }) {
  const imageUrl = activity.image;

  return (
    <Box sx={{ mt: 6 }}>
      <Card
        sx={{
          width: 320,
          borderRadius: "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          overflow: "hidden"
        }}
      >
        <Box
          component="img"
          src={imageUrl}
          alt={activity.title}
          sx={{
            width: "100%",
            height: 180,
            objectFit: "cover"
          }}
        />

        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ flex: 1 }}>
              {activity.title}
            </Typography>
            {activity.category && (
              <Chip
                label={activity.category}
                size="small"
                sx={{
                  bgcolor: "#9DB25D",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "0.7rem"
                }}
              />
            )}
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
              mb: 1,
              overflow: "hidden",
              minHeight: "40px"
            }}
          >
            {activity.description}
          </Typography>

          <Box sx={{ mt: 2 }}>
            <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
              📍 {activity.location}
            </Typography>
            {activity.date && (
              <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
                📅 {activity.date}
              </Typography>
            )}
            {activity.time && (
              <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
                ⏰ {activity.time}
              </Typography>
            )}
            {activity.participants && (
              <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
                👥 {activity.participants} مشارك
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ActivityCard;

