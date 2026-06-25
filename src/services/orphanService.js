import { fetchWithAuth } from "./authService";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const ORPHANS_URL = `${API_BASE_URL}/api/orphans`;
const ADMIN_ORPHANS_URL = `${API_BASE_URL}/api/admin/orphans`;

function formatDate(value) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toISOString().split("T")[0];
}

function getAge(value) {
  if (!value) return "";

  const birthDate = new Date(value);
  if (Number.isNaN(birthDate.getTime())) return "";

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age >= 0 ? age : "";
}

function getFullName(orphan) {
  return [
    orphan.OrphanName,
    orphan.OrphanFatherName,
    orphan.OrphanGrandfatherName,
    orphan.OrphanFamilyName,
  ]
    .filter(Boolean)
    .join(" ");
}

function splitName(name) {
  const parts = String(name || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return {
    OrphanName: parts[0] || "",
    OrphanFatherName: parts[1] || "",
    OrphanGrandfatherName: parts[2] || "",
    OrphanFamilyName: parts.slice(3).join(" ") || "",
  };
}

function mapOrphan(orphan) {
  return {
    ...orphan,
    id: orphan.id,
    code: orphan.OrphanID || "",
    name: getFullName(orphan) || orphan.OrphanName || "",
    dateOfBirth: formatDate(orphan.OrphanBirthDate),
    age: getAge(orphan.OrphanBirthDate),
    gender: orphan.gender || "",
    status: orphan.GuaranteeType || "",
    guaranteeType: orphan.GuaranteeType || "",
    guardianId: orphan.GuardianID || "",
    requestId: orphan.RequestID || "",
    notes: orphan.description || "",
    description: orphan.description || "",
    sponsor: "",
    educationLevel: "",
  };
}

function mapOrphanPayload(data) {
  return {
    OrphanID: data.code,
    ...splitName(data.name),
    OrphanBirthDate: data.dateOfBirth || null,
    gender: data.gender,
    GuaranteeType: data.guaranteeType || data.status,
    description: data.notes || data.description || null,
    GuardianID: data.guardianId,
    RequestID: data.requestId ? Number(data.requestId) : null,
  };
}

async function parseJsonResponse(response) {
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.message || "فشل تنفيذ الطلب");
  }

  return payload;
}

export const orphanService = {
  async getAll() {
    const response = await fetch(ORPHANS_URL);
    const payload = await parseJsonResponse(response);
    const orphans = Array.isArray(payload) ? payload : payload?.data || [];

    return orphans.map(mapOrphan);
  },

  async getById(id) {
    const response = await fetch(`${ORPHANS_URL}/${id}`);
    const payload = await parseJsonResponse(response);
    const orphan = payload?.data || payload;

    return orphan ? mapOrphan(orphan) : null;
  },

  async create(data) {
    const response = await fetchWithAuth(ADMIN_ORPHANS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mapOrphanPayload(data)),
    });
    const payload = await parseJsonResponse(response);
    const orphan = payload?.data || payload;

    return mapOrphan(orphan);
  },

  async update(id, data) {
    const response = await fetchWithAuth(`${ADMIN_ORPHANS_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mapOrphanPayload(data)),
    });
    const payload = await parseJsonResponse(response);
    const orphan = payload?.data || payload;

    return mapOrphan(orphan);
  },

  async delete(id) {
    const response = await fetchWithAuth(`${ADMIN_ORPHANS_URL}/${id}`, { method: "DELETE" });

    return parseJsonResponse(response);
  },
};
