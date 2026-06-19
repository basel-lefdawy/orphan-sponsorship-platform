import { useEffect, useMemo, useState } from "react";

import {
  fetchWithAuth,
  parseJsonResponse,
} from "../../services/authService";

import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

const statusConfig = {
  pending: {
    label: "قيد الانتظار",
    color: "warning",
  },

  approved: {
    label: "مقبول",
    color: "success",
  },

  rejected: {
    label: "مرفوض",
    color: "error",
  },
};

// NORMALIZE REQUEST
const normalizeRequest = (
  request,
  type,
  index
) => ({
  id:
    request.id ??
    request._id ??
    `${type}-${index}`,

  type,

  title:
    request.title ??
    request.type ??
    (type === "help"
      ? "طلب مساعدة"
      : "طلب كفالة"),

  summary:
    request.summary ??
    request.shortSummary ??
    request.description?.slice(0, 120) ??
    "لا يوجد ملخص متاح",

  status: String(
    request.status ?? "pending"
  ).toLowerCase(),

  createdAt:
    request.createdAt ??
    request.created_at,
});

export default function UserRequestsList({
  isAuthenticated,
}) {
  const [requests, setRequests] = useState([]);

  const [isLoading, setIsLoading] =
    useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {

      if (!isAuthenticated) {
        setRequests([]);
        setError("");
        return;
      }

      try {

        setIsLoading(true);

        setError("");

        const response = await fetchWithAuth(`/api/my-requests`);
        const data = await parseJsonResponse(response);

        // BACKEND RESPONSE:
        // {
        //   success: true,
        //   data: {
        //     helpRequests: [],
        //     sponsorshipRequests: []
        //   }
        // }

        // Handle different response formats
        let helpRequests = [];
        let sponsorshipRequests = [];

        if (data?.data?.helpRequests !== undefined) {
          helpRequests = data.data.helpRequests ?? [];
          sponsorshipRequests = data.data.sponsorshipRequests ?? [];
        } else if (Array.isArray(data?.helpRequests)) {
          // Alternative format
          helpRequests = data.helpRequests ?? [];
          sponsorshipRequests = data.sponsorshipRequests ?? [];
        } else if (Array.isArray(data)) {
          // If response is directly an array
          helpRequests = data ?? [];
        }

        // MERGE BOTH TYPES
        const normalizedRequests = [
          ...helpRequests.map(
            (request, index) =>
              normalizeRequest(
                request,
                "help",
                index
              )
          ),

          ...sponsorshipRequests.map(
            (request, index) =>
              normalizeRequest(
                request,
                "sponsorship",
                index
              )
          ),
        ];

        // SORT NEWEST FIRST
        normalizedRequests.sort(
          (a, b) =>
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0)
        );

        setRequests(normalizedRequests);

      } catch (fetchError) {

        console.error("Fetch requests error:", fetchError);
        console.error("Response data:", fetchError?.response?.data);
        console.error("Response status:", fetchError?.response?.status);
        console.error("Error message:", fetchError?.response?.data?.message || fetchError?.message);

        setError(
          `تعذر تحميل الطلبات: ${fetchError?.response?.data?.message || "خطأ في السيرفر"}`
        );

      } finally {

        setIsLoading(false);
      }
    };

    fetchRequests();

  }, [isAuthenticated]);

  const content = useMemo(() => {

    if (!isAuthenticated) {
      return (
        <Typography
          variant="body2"
          color="text.secondary"
        >
          سجّل الدخول لمشاهدة طلباتك.
        </Typography>
      );
    }

    if (isLoading) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 1.5,
          }}
        >
          <CircularProgress size={24} />
        </Box>
      );
    }

    if (error) {
      return (
        <Alert severity="error">
          {error}
        </Alert>
      );
    }

    if (!requests.length) {
      return (
        <Typography
          variant="body2"
          color="text.secondary"
        >
          لا توجد طلبات حاليا.
        </Typography>
      );
    }

    return (
      <Stack spacing={1.2}>
        {requests.map((request) => {

          const status =
            statusConfig[request.status] ??
            statusConfig.pending;

          return (
            <Card
              key={request.id}
              variant="outlined"
              sx={{
                borderRadius: 2,
                borderColor: "#e4e7ec",
                boxShadow: "none",
                backgroundColor: "#ffffff",
              }}
            >
              <CardContent
                sx={{
                  p: 1.4,
                  "&:last-child": {
                    pb: 1.4,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems:
                      "flex-start",
                    gap: 1,
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle2"
                      fontWeight={700}
                      color="#1d2939"
                    >
                      {request.title}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="#98a2b3"
                    >
                      {request.type ===
                        "help"
                        ? "طلب مساعدة"
                        : "طلب كفالة"}
                    </Typography>
                  </Box>

                  <Chip
                    size="small"
                    label={status.label}
                    color={status.color}
                    sx={{
                      fontWeight: 600,
                    }}
                  />
                </Box>

                <Typography
                  variant="body2"
                  color="#667085"
                  sx={{
                    mt: 0.8,
                    display:
                      "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient:
                      "vertical",
                    overflow: "hidden",
                  }}
                >
                  {request.summary}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
      </Stack>
    );
  }, [
    error,
    isAuthenticated,
    isLoading,
    requests,
  ]);

  return (
    <Box
      sx={{
        maxHeight: 260,
        overflowY: "auto",
        pr: 0.5,
      }}
    >
      {content}
    </Box>
  );
}