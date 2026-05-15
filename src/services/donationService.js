const NOT_CONNECTED_MESSAGE = "هذا الإجراء غير متصل بالباكند بعد.";
const AUTH_EXPIRED_MESSAGE = "انتهت الجلسة. يرجى تسجيل الدخول مرة أخرى.";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const ADMIN_DONATIONS_URL = `${API_BASE_URL}/api/admin/donations`;

function notConnected() {
  throw new Error(NOT_CONNECTED_MESSAGE);
}

function getStoredToken() {
  return localStorage.getItem("token") || localStorage.getItem("accessToken");
}

function clearAuthStorage() {
  localStorage.removeItem("token");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  const payload = await response.json().catch(() => null);

  if (!response.ok || payload?.success === false) {
    clearAuthStorage();
    return null;
  }

  const tokens = payload?.data || payload;
  if (!tokens?.accessToken) return null;

  localStorage.setItem("token", tokens.accessToken);
  localStorage.setItem("accessToken", tokens.accessToken);
  if (tokens.refreshToken) {
    localStorage.setItem("refreshToken", tokens.refreshToken);
  }

  return tokens.accessToken;
}

function getAuthHeaders(extraHeaders = {}, token = getStoredToken()) {
  return {
    ...extraHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function fetchWithAuth(url, options = {}) {
  let token = getStoredToken();
  let response = await fetch(url, {
    ...options,
    headers: getAuthHeaders(options.headers || {}, token),
  });

  if (response.status === 401) {
    token = await refreshAccessToken();
    if (!token) {
      throw new Error(AUTH_EXPIRED_MESSAGE);
    }

    response = await fetch(url, {
      ...options,
      headers: getAuthHeaders(options.headers || {}, token),
    });
  }

  return response;
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
