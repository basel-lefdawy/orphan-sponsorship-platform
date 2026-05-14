const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const SPONSORS_URL = `${API_BASE_URL}/api/sponsors`;

async function parseJsonResponse(response) {
  const payload = await response.json().catch(() => null);

  if (!response.ok || payload?.success === false) {
    throw new Error(payload?.message || "Failed to load sponsors");
  }

  return payload;
}

export const sponsorService = {
  async getAll() {
    const response = await fetch(SPONSORS_URL);
    const payload = await parseJsonResponse(response);

    return Array.isArray(payload) ? payload : payload?.data || [];
  },

  async getById(id) {
    const response = await fetch(`${SPONSORS_URL}/${id}`);
    const payload = await parseJsonResponse(response);

    return payload?.data || payload || null;
  },

  async create() {
    throw new Error("Sponsor create is not connected yet.");
  },

  async update() {
    throw new Error("Sponsor update is not connected yet.");
  },

  async delete() {
    throw new Error("Sponsor delete is not connected yet.");
  },
};
