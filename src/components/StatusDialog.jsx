import {
  Dialog,
  DialogContent,
  Button,
  Typography,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { useEffect } from "react";

const StatusDialog = ({
  open,
  onClose,
  type = "success", // success  او error
  title,
  message,
  autoClose = true,
  duration = 10000,
  }) => {
  useEffect(() => {
    if (open && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [open, autoClose, duration, onClose]);

  const isSuccess = type === "success";

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent>
        <Box sx={{ textAlign: "center", p: "32px 16px" }}>
          {isSuccess ? (
            <CheckCircleIcon
              sx={{ fontSize: 80, color: "#2e7d32", mb: 2 }}
            />
          ) : (
            <ErrorIcon
              sx={{ fontSize: 80, color: "#d32f2f", mb: 2 }}
            />
          )}

          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", mb: 1 }}
          >
            {title}
          </Typography>

          <Typography sx={{ color: "#555", mb: 3 }}>
            {message}
          </Typography>

          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              backgroundColor: isSuccess ? "#2e7d32" : "#d32f2f",
              px: 5,
              py: 1.2,
              borderRadius: "10px",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: isSuccess ? "#1b5e20" : "#9a0007",
              },
            }}
          >
            حسنًا
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default StatusDialog;
