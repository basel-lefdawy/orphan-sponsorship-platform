import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";
import { orphanService } from "../../services/orphanService";
import styles from "./AdminPage.module.css";

const initialState = {
  code: "",
  name: "",
  gender: "",
  dateOfBirth: "",
  guaranteeType: "",
  guardianId: "",
  requestId: "",
  notes: "",
};

const genderOptions = [
  { value: "male", label: "ذكر" },
  { value: "female", label: "أنثى" },
];

const guaranteeOptions = [
  { value: "كفالة كاملة", label: "كفالة كاملة" },
  { value: "كفالة جزئية", label: "كفالة جزئية" },
  { value: "كفالة مدرسية", label: "كفالة مدرسية" },
];

export default function AddOrphan() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.code.trim()) errs.code = "رقم اليتيم مطلوب";
    if (!form.name.trim()) errs.name = "الاسم مطلوب";
    if (!form.gender) errs.gender = "الجنس مطلوب";
    if (!form.dateOfBirth) errs.dateOfBirth = "تاريخ الميلاد مطلوب";
    if (!form.guaranteeType) errs.guaranteeType = "نوع الكفالة مطلوب";
    if (!form.guardianId.trim()) errs.guardianId = "رقم الوصي مطلوب";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      await orphanService.create(form);
      navigate("/admin/orphans");
    } catch (err) {
      console.error(err);
      setSubmitError(err.message || "تعذر إضافة اليتيم في الباكند.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page} id="add-orphan-page">
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>إضافة يتيم جديد</h1>
      </div>

      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        {submitError && (
          <p style={{ color: "#dc2626", textAlign: "center", marginBottom: 16 }}>
            {submitError}
          </p>
        )}

        <div className={styles.formGrid}>
          <FormInput
            label="رقم اليتيم"
            name="code"
            value={form.code}
            onChange={handleChange}
            error={errors.code}
            required
            placeholder="مثال: ORH100"
          />
          <FormInput
            label="الاسم الكامل"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            required
            placeholder="أدخل اسم اليتيم"
          />
          <FormInput
            label="الجنس"
            name="gender"
            type="select"
            value={form.gender}
            onChange={handleChange}
            error={errors.gender}
            required
            options={genderOptions}
          />
          <FormInput
            label="تاريخ الميلاد"
            name="dateOfBirth"
            type="date"
            value={form.dateOfBirth}
            onChange={handleChange}
            error={errors.dateOfBirth}
            required
          />
          <FormInput
            label="نوع الكفالة"
            name="guaranteeType"
            type="select"
            value={form.guaranteeType}
            onChange={handleChange}
            error={errors.guaranteeType}
            required
            options={guaranteeOptions}
          />
          <FormInput
            label="رقم الوصي"
            name="guardianId"
            value={form.guardianId}
            onChange={handleChange}
            error={errors.guardianId}
            required
            placeholder="مثال: GUAR100"
          />
          <FormInput
            label="رقم الطلب"
            name="requestId"
            type="number"
            value={form.requestId}
            onChange={handleChange}
            placeholder="اختياري"
          />
          <FormInput
            label="ملاحظات"
            name="notes"
            type="textarea"
            value={form.notes}
            onChange={handleChange}
            placeholder="ملاحظات إضافية..."
          />
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitBtn} disabled={submitting}>
            {submitting ? "جاري الحفظ..." : "حفظ"}
          </button>
          <Link to="/admin/orphans" className={styles.cancelBtn}>
            إلغاء
          </Link>
        </div>
      </form>
    </div>
  );
}
