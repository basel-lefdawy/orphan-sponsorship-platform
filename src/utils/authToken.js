export function getTokenPayload(token) {
  try {
    const payload = token?.split(".")[1];
    if (!payload) return null;

    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(normalizedPayload));
  } catch (error) {
    return null;
  }
}

export function isAdminToken(token) {
  const payload = getTokenPayload(token);
  return payload?.role === "admin";
}
