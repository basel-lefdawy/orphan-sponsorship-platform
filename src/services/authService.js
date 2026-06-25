const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

let inMemoryAccessToken = null;

function buildUrl(input) {
  if (typeof input !== "string") return input;
  if (!input.startsWith("/")) return input;
  return API_BASE_URL ? `${API_BASE_URL}${input}` : input;
}

export function getStoredAccessToken() {
  return inMemoryAccessToken || null;
}

export function setAuthTokens({ accessToken }) {
  inMemoryAccessToken = accessToken || null;
}

export function clearInMemoryToken() {
  inMemoryAccessToken = null;
}

export function clearAuthStorage() {
  // Clear in-memory access token only. Do not persistently remove keys
  // so frontend never relies on localStorage for tokens.
  inMemoryAccessToken = null;
}

export async function refreshAccessToken() {
  const response = await fetch(buildUrl("/api/auth/refresh"), {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
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

  setAuthTokens({ accessToken: tokens.accessToken });

  return tokens.accessToken;
}

export async function logout() {
  try {
    await fetch(buildUrl("/api/auth/logout"), {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    // Silence errors; logout should still clear local access token state.
    console.error("Logout request failed:", err);
  }
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
    credentials: "include",
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
      ...requestOptions,
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

export async function initAuth() {
  // Remove any stale tokens left in localStorage from older app versions
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("accessToken");
  } catch (e) {
    // ignore (e.g., when running in environments without localStorage)
  }

  // Attempt to rehydrate access token from refresh cookie on app load
  await refreshAccessToken();
}
