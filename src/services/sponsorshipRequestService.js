const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const ADMIN_SPONSORSHIP_REQUESTS_URL = `${API_BASE_URL}/api/admin/sponsorship-requests`;

function getAuthHeaders(extraHeaders = {}) {
  const token = localStorage.getItem("token");

  return {
    ...extraHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function formatDate(value) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString();
}

function getSponsorFullName(request) {
  return [
    request.firstName,
    request.fatherName,
    request.grandfatherName,
    request.familyName,
  ]
    .filter(Boolean)
    .join(" ");
}

function getStatusLabel(status) {
  if (status === "pending" || status === "Pending") return "قيد المراجعة";
  if (status === "approved" || status === "Approved") return "تمت الموافقة";
  if (status === "rejected" || status === "Rejected") return "مرفوضة";
  return status || "";
}

function getPaymentLabel(method) {
  if (method === "bank_transfer") return "تحويل بنكي";
  if (method === "cash") return "نقدي";
  if (method === "check") return "شيك";
  if (method === "electronic") return "إلكتروني";
  return method || "-";
}

function mapSponsorshipRequest(request) {
  return {
    ...request,
    sponsorName: getSponsorFullName(request) || "-",
    orphanIdDisplay: request.orphanId ?? "-",
    statusLabel: getStatusLabel(request.status),
    rawStatus: request.status,
    paymentLabel: getPaymentLabel(request.paymentMethod),
    monthlySAmountDisplay: request.monthlySAmount
      ? `${request.monthlySAmount}`
      : "-",
    startDate: formatDate(request.startingSDate),
    createdDate: formatDate(request.createdAt),
    mobileDisplay: request.mobile || "-",
    emailDisplay: request.email || "-",
  };
}

async function parseJsonResponse(response) {
  const payload = await response.json().catch(() => null);

  if (!response.ok || payload?.success === false) {
    throw new Error(payload?.message || "فشل تنفيذ الطلب");
  }

  return payload;
}

export const sponsorshipRequestService = {
  async getAll() {
    const response = await fetch(ADMIN_SPONSORSHIP_REQUESTS_URL, {
      headers: getAuthHeaders(),
    });
    const payload = await parseJsonResponse(response);
    const requests = Array.isArray(payload) ? payload : payload?.data || [];

    return requests.map(mapSponsorshipRequest);
  },

  async getById(id) {
    const response = await fetch(
      `${ADMIN_SPONSORSHIP_REQUESTS_URL}/${id}`,
      { headers: getAuthHeaders() }
    );
    const payload = await parseJsonResponse(response);
    const request = payload?.data || payload;

    return request ? mapSponsorshipRequest(request) : null;
  },

  async approve(id) {
    const response = await fetch(
      `${ADMIN_SPONSORSHIP_REQUESTS_URL}/${id}/approve`,
      { method: "PATCH", headers: getAuthHeaders() }
    );

    return parseJsonResponse(response);
  },

  async reject(id) {
    const response = await fetch(
      `${ADMIN_SPONSORSHIP_REQUESTS_URL}/${id}/reject`,
      { method: "PATCH", headers: getAuthHeaders() }
    );

    return parseJsonResponse(response);
  },

  async delete(id) {
    const response = await fetch(
      `${ADMIN_SPONSORSHIP_REQUESTS_URL}/${id}`,
      { method: "DELETE", headers: getAuthHeaders() }
    );

    return parseJsonResponse(response);
  },
};
