const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const ADMIN_HELP_REQUESTS_URL = `${API_BASE_URL}/api/admin/help-requests`;

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

function getGuardianName(request) {
  return [
    request.GuardianName,
    request.GuardianFatherName,
    request.GuardianFamilyName,
  ]
    .filter(Boolean)
    .join(" ");
}

function getStatusLabel(status) {
  if (status === "Pending") return "قيد المراجعة";
  if (status === "Approved") return "تمت الموافقة";
  if (status === "Rejected") return "مرفوضة";
  return status || "";
}

function getUrgencyLabel(urgency) {
  if (urgency === "Normal") return "عادي";
  if (urgency === "High") return "عاجل";
  if (urgency === "Low") return "منخفض";
  return urgency || "عادي";
}

function mapHelpRequest(request) {
  return {
    ...request,
    requesterName: getGuardianName(request) || request.GuardianName || "غير متوفر",
    requestType: request.GuaranteeType || "غير متوفر",
    date: formatDate(request.createdAt) || formatDate(request.OrphanBirthDate),
    urgency: getUrgencyLabel(request.urgency),
    status: getStatusLabel(request.status),
    phone: request.phoneNumber || "",
  };
}

async function parseJsonResponse(response) {
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.message || "فشل تنفيذ الطلب");
  }

  return payload;
}

export const helpRequestService = {
  async getAll() {
    const response = await fetch(ADMIN_HELP_REQUESTS_URL, {
      headers: getAuthHeaders(),
    });
    const payload = await parseJsonResponse(response);
    const requests = Array.isArray(payload) ? payload : payload?.data || [];

    return requests.map(mapHelpRequest);
  },

  async getById(id) {
    const response = await fetch(`${ADMIN_HELP_REQUESTS_URL}/${id}`, {
      headers: getAuthHeaders(),
    });
    const payload = await parseJsonResponse(response);
    const request = payload?.data || payload;

    return request ? mapHelpRequest(request) : null;
  },

  async update(id, updates) {
    const response = await fetch(`${ADMIN_HELP_REQUESTS_URL}/${id}`, {
      method: "PATCH",
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(updates),
    });
    const payload = await parseJsonResponse(response);
    const request = payload?.data || payload;

    return mapHelpRequest(request);
  },

  async delete(id) {
    const response = await fetch(`${ADMIN_HELP_REQUESTS_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    return parseJsonResponse(response);
  },

  async approve(id) {
    const response = await fetch(`${ADMIN_HELP_REQUESTS_URL}/${id}/approve`, {
      method: "PATCH",
      headers: getAuthHeaders(),
    });

    return parseJsonResponse(response);
  },

  async reject(id) {
    const response = await fetch(`${ADMIN_HELP_REQUESTS_URL}/${id}/reject`, {
      method: "PATCH",
      headers: getAuthHeaders(),
    });

    return parseJsonResponse(response);
  },
};
