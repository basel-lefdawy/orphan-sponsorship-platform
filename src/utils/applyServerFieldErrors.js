export function applyServerFieldErrors(errors, setError) {
  if (!Array.isArray(errors) || typeof setError !== "function") {
    return false;
  }

  let applied = false;

  errors.forEach((error) => {
    const fieldName = Array.isArray(error?.path)
      ? error.path.filter(Boolean).join(".")
      : error?.path;

    if (!fieldName) return;

    setError(
      fieldName,
      {
        type: "server",
        message: error?.message || "قيمة هذا الحقل غير صحيحة",
      },
      { shouldFocus: !applied }
    );
    applied = true;
  });

  return applied;
}
