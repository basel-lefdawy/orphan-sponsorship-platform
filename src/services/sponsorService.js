import { fetchWithAuth } from "./authService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const SPONSORS_URL = `${API_BASE_URL}/api/sponsors`;

function normalizeSponsorPayload(data) {
  return {
    identityNumber: data.identityNumber?.trim(),
    firstName: data.firstName?.trim(),
    fatherName: data.fatherName?.trim(),
    grandfatherName: data.grandfatherName?.trim(),
    familyName: data.familyName?.trim(),
    dateOfBirth: data.dateOfBirth,
    gender: data.gender,
    jobType: data.jobType?.trim(),
    country: data.country?.trim(),
    city: data.city?.trim(),
    street: data.street?.trim() || null,
    mobile: data.mobile?.trim(),
    phone: data.phone?.trim() || null,
    email: data.email?.trim(),
    status: data.status || "pending",
  };
}

async function parseJsonResponse(response) {
  const payload = await response.json().catch(() => null);

  if (!response.ok || payload?.success === false) {
    throw new Error(payload?.message || "Failed to load sponsors");
  }

  return payload;
}

function unwrapData(payload) {
  return payload?.data ?? payload;
}

export const sponsorService = {
  async getAll() {
    const response = await fetchWithAuth(SPONSORS_URL);
    const payload = await parseJsonResponse(response);

    return Array.isArray(payload) ? payload : payload?.data || [];
  },

  async getById(id) {
    const response = await fetchWithAuth(`${SPONSORS_URL}/${id}`);
    const payload = await parseJsonResponse(response);

    return unwrapData(payload) || null;
  },

  async getSponsorships(id) {
    const response = await fetchWithAuth(`${SPONSORS_URL}/${id}/sponsorships`);
    const payload = await parseJsonResponse(response);

    return Array.isArray(payload) ? payload : payload?.data || [];
  },

  async create(data) {
    const response = await fetchWithAuth(SPONSORS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(normalizeSponsorPayload(data)),
    });
    const payload = await parseJsonResponse(response);

    return unwrapData(payload);
  },

  async update(id, data) {
    const response = await fetchWithAuth(`${SPONSORS_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(normalizeSponsorPayload(data)),
    });
    const payload = await parseJsonResponse(response);

    return unwrapData(payload);
  },

  async updateStatus(id, status) {
    const response = await fetchWithAuth(`${SPONSORS_URL}/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const payload = await parseJsonResponse(response);

    return unwrapData(payload);
  },

  async delete(id) {
    const response = await fetchWithAuth(`${SPONSORS_URL}/${id}`, { method: "DELETE" });

    return parseJsonResponse(response);
  },
};
