import styles from "./FormInput.module.css";

export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  placeholder = "",
  options,
  rows,
}) {
  const id = `form-input-${name}`;

  // Select
  if (type === "select" && options) {
    return (
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor={id}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
        <select
          id={id}
          name={name}
          className={`${styles.select} ${error ? styles.inputError : ""}`}
          value={value}
          onChange={onChange}
        >
          {/* for the الحالة of the orphan */}
          <option value="">-- اختر --</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className={styles.errorMsg}>⚠ {error}</p>}
      </div>
    );
  }

  // Textarea
  if (type === "textarea") {
    return (
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor={id}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
        <textarea
          id={id}
          name={name}
          className={`${styles.textarea} ${error ? styles.inputError : ""}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows || 3}
        />
        {error && <p className={styles.errorMsg}>⚠ {error}</p>}
      </div>
    );
  }

  // Default input
  return (
    <div className={styles.formGroup}>
      <label className={styles.label} htmlFor={id}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className={`${styles.input} ${error ? styles.inputError : ""} ${
          !error && value ? styles.inputSuccess : ""
        }`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <p className={styles.errorMsg}>⚠ {error}</p>}
    </div>
  );
}
