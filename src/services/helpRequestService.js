const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const ADMIN_HELP_REQUESTS_URL = `${API_BASE_URL}/api/admin/help-requests`;

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

function mapHelpRequest(request) {
  return {
    ...request,
    requesterName: getGuardianName(request) || request.GuardianName || "Unknown requester",
    requestType: request.GuaranteeType || "Unknown type",
    date: formatDate(request.createdAt) || formatDate(request.OrphanBirthDate),
    urgency: request.urgency || "Normal",
    phone: request.phoneNumber || "",
  };
}

async function parseJsonResponse(response) {
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.message || "Request failed");
  }

  return payload;
}

export const helpRequestService = {
  async getAll() {
    const response = await fetch(ADMIN_HELP_REQUESTS_URL);
    const payload = await parseJsonResponse(response);
    const requests = Array.isArray(payload) ? payload : payload?.data || [];

    return requests.map(mapHelpRequest);
  },

  async getById(id) {
    const response = await fetch(`${ADMIN_HELP_REQUESTS_URL}/${id}`);
    const payload = await parseJsonResponse(response);
    const request = payload?.data || payload;

    return request ? mapHelpRequest(request) : null;
  },

  async update(id, updates) {
    const response = await fetch(`${ADMIN_HELP_REQUESTS_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    const payload = await parseJsonResponse(response);
    const request = payload?.data || payload;

    return mapHelpRequest(request);
  },

  async delete(id) {
    const response = await fetch(`${ADMIN_HELP_REQUESTS_URL}/${id}`, {
      method: "DELETE",
    });

    return parseJsonResponse(response);
  },
};
