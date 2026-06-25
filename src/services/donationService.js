import { fetchWithAuth, parseJsonResponse } from "./authService";

const NOT_CONNECTED_MESSAGE = "هذا الإجراء غير متصل بالباكند بعد.";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const ADMIN_DONATIONS_URL = `${API_BASE_URL}/api/admin/donations`;

function notConnected() {
  throw new Error(NOT_CONNECTED_MESSAGE);
}

export const donationService = {
  async getAll() {
    const response = await fetchWithAuth(ADMIN_DONATIONS_URL);
    const payload = await parseJsonResponse(response);

    return Array.isArray(payload) ? payload : payload?.data || [];
  },

  async getById(id) {
    const response = await fetchWithAuth(`${ADMIN_DONATIONS_URL}/${id}`);
    const payload = await parseJsonResponse(response);

    return payload?.data || payload || null;
  },

  async create() {
    notConnected();
  },

  async update(id, updates) {
    const response = await fetchWithAuth(`${ADMIN_DONATIONS_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    return parseJsonResponse(response);
  },

  async delete(id) {
    const response = await fetchWithAuth(`${ADMIN_DONATIONS_URL}/${id}`, {
      method: "DELETE",
    });

    return parseJsonResponse(response);
  },
};
