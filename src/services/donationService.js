const NOT_CONNECTED_MESSAGE = "هذا الإجراء غير متصل بالباكند بعد.";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const ADMIN_DONATIONS_URL = `${API_BASE_URL}/api/admin/donations`;

function notConnected() {
  throw new Error(NOT_CONNECTED_MESSAGE);
}

function getAuthHeaders(extraHeaders = {}) {
  const token = localStorage.getItem("token");

  return {
    ...extraHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function parseJsonResponse(response) {
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.message || "فشل تنفيذ الطلب");
  }

  return payload;
}

export const donationService = {
  async getAll() {
    const response = await fetch(ADMIN_DONATIONS_URL, {
      headers: getAuthHeaders(),
    });

    return parseJsonResponse(response);
  },

  async getById(id) {
    const response = await fetch(`${ADMIN_DONATIONS_URL}/${id}`, {
      headers: getAuthHeaders(),
    });

    return parseJsonResponse(response);
  },

  async create() {
    notConnected();
  },

  async update(id, updates) {
    const response = await fetch(`${ADMIN_DONATIONS_URL}/${id}`, {
      method: "PATCH",
      headers: getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify(updates),
    });

    return parseJsonResponse(response);
  },

  async delete(id) {
    const response = await fetch(`${ADMIN_DONATIONS_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    return parseJsonResponse(response);
  },
};
