const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

function buildUrl(input) {
  if (typeof input !== "string") return input;
  if (!input.startsWith("/")) return input;
  return API_BASE_URL ? `${API_BASE_URL}${input}` : input;
}

export function getStoredAccessToken() {
  return (
    localStorage.getItem("accessToken") ||
    localStorage.getItem("token") ||
    null
  );
}

export function getStoredRefreshToken() {
  return localStorage.getItem("refreshToken") || null;
}

export function setAuthTokens({ accessToken, refreshToken }) {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("token", accessToken);
  }

  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }
}

export function clearAuthStorage() {
  localStorage.removeItem("token");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
}

export async function refreshAccessToken() {
  const refreshToken = getStoredRefreshToken();
  if (!refreshToken) return null;

  const response = await fetch(buildUrl("/api/auth/refresh"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok || payload?.success === false) {
    clearAuthStorage();
    return null;
  }

  const tokens = payload?.data || payload;
  if (!tokens?.accessToken) {
    clearAuthStorage();
    return null;
  }

  setAuthTokens(tokens);

  return tokens.accessToken;
}

export function getAuthHeaders(token) {
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
}

export async function fetchWithAuth(input, options = {}) {
  const url = buildUrl(input);
  let token = getStoredAccessToken();

  const requestOptions = {
    ...options,
    headers: {
      ...options.headers,
      ...getAuthHeaders(token),
    },
  };

  let response = await fetch(url, requestOptions);

  if (response.status === 401) {
    token = await refreshAccessToken();
    if (!token) {
      throw new Error("Authentication expired");
    }

    response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        ...getAuthHeaders(token),
      },
    });
  }

  return response;
}

export async function parseJsonResponse(response) {
  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const message = payload?.message || payload?.error || "فشل تنفيذ الطلب";
    throw new Error(message);
  }
  return payload;
}
