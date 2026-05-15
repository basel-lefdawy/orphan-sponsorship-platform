const NOT_CONNECTED_MESSAGE = "هذا الإجراء غير متصل بالباكند بعد.";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const ORPHANS_URL = `${API_BASE_URL}/api/orphans`;

function notConnected() {
  throw new Error(NOT_CONNECTED_MESSAGE);
}

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
    sponsor: "",
    educationLevel: "",
  };
}

async function parseJsonResponse(response) {
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.message || "Failed to load orphans");
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

  async getById() {
    return null;
  },

  async create() {
    notConnected();
  },

  async update() {
    notConnected();
  },

  async delete() {
    notConnected();
  },
};

export { NOT_CONNECTED_MESSAGE as ORPHAN_SERVICE_NOT_CONNECTED };
