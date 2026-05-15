import {
  Avatar,
  Box,
  Button,
  Divider,
  Menu,
  Typography,
} from "@mui/material";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIcon from "@mui/icons-material/Assignment";

import UserRequestsList from "./UserRequestsList";

export default function UserDropdown({
  anchorEl,
  open,
  onClose,
  user,
  userInitials,
  isAuthenticated,
  authToken,
  onLogin,
  onLogout,
}) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: 320, sm: 360 },
          maxWidth: "92vw",
          p: 0,
          mt: 1,
          borderRadius: "14px",
          overflow: "hidden",
          boxShadow: "0 12px 24px rgba(0,0,0,0.12)",
          backgroundColor: "#f8fafc",
        },
      }}
    >
      {isAuthenticated ? (
        <Box
          sx={{
            px: 2.5,
            py: 2,
            backgroundColor: "white",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Avatar
              sx={{
                bgcolor: "#2f6b45",
                width: 48,
                height: 48,
                fontWeight: 700,
              }}
            >
              {userInitials}
            </Avatar>

            <Box sx={{ minWidth: 0 }}>
              <Typography
                fontWeight="bold"
                sx={{ lineHeight: 1.3 }}
              >
                {user?.name || user?.email}
              </Typography>

              {user?.email && (
                <Typography
                  variant="body2"
                  color="#667085"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.email}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            px: 2.5,
            py: 1.8,
            backgroundColor: "white",
          }}
        >
          <Typography fontWeight={700} color="#1f2937">
            مرحبا بك
          </Typography>

          <Typography variant="body2" color="#667085">
            سجّل الدخول لإدارة حسابك وطلباتك.
          </Typography>
        </Box>
      )}

      <Divider />

      <Box sx={{ px: 2.5, py: 1.5 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 1.2,
          }}
        >
          <AssignmentIcon
            sx={{
              fontSize: 20,
              color: "#475467",
            }}
          />

          <Typography fontWeight={700} color="#1f2937">
            طلباتي
          </Typography>
        </Box>

        <UserRequestsList
          isAuthenticated={isAuthenticated}
          authToken={authToken}
        />
      </Box>

      <Divider />

      <Box
        sx={{
          p: 1.5,
          backgroundColor: "white",
        }}
      >
        {isAuthenticated ? (
          <Button
            fullWidth
            color="error"
            variant="text"
            startIcon={<LogoutIcon />}
            onClick={onLogout}
            sx={{
              justifyContent: "flex-start",
              borderRadius: 2,
              py: 1,
            }}
          >
            تسجيل خروج
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            startIcon={<LoginIcon />}
            onClick={onLogin}
            sx={{
              justifyContent: "flex-start",
              borderRadius: 2,
              py: 1,
              backgroundColor: "#2f6b45",
              "&:hover": {
                backgroundColor: "#255639",
              },
            }}
          >
            تسجيل دخول
          </Button>
        )}
      </Box>
    </Menu>
  );
}
