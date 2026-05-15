import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";
import { orphanService } from "../../services/orphanService";
import styles from "./AdminPage.module.css";

const genderOptions = [
  { value: "male", label: "ذكر" },
  { value: "female", label: "أنثى" },
];

const guaranteeOptions = [
  { value: "كفالة كاملة", label: "كفالة كاملة" },
  { value: "كفالة جزئية", label: "كفالة جزئية" },
  { value: "كفالة مدرسية", label: "كفالة مدرسية" },
];

export default function EditOrphan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});
  const [loadError, setLoadError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        setLoadError("");
        const orphan = await orphanService.getById(id);
        if (orphan) {
          setForm({
            code: orphan.code,
            name: orphan.name,
            gender: orphan.gender,
            dateOfBirth: orphan.dateOfBirth,
            guaranteeType: orphan.guaranteeType,
            guardianId: orphan.guardianId,
            requestId: orphan.requestId || "",
            notes: orphan.notes || "",
          });
        } else {
          setLoadError("لم يتم العثور على اليتيم.");
        }
      } catch (err) {
        console.error(err);
        setLoadError(err.message || "تعذر تحميل بيانات هذا اليتيم من الباكند.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

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
      await orphanService.update(id, form);
      navigate("/admin/orphans");
    } catch (err) {
      console.error(err);
      setSubmitError(err.message || "تعذر تحديث بيانات اليتيم في الباكند.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p style={{ color: "#94a3b8", textAlign: "center", paddingTop: 40 }}>جاري التحميل...</p>;
  }

  if (loadError || !form) {
    return (
      <div className={styles.page} id="edit-orphan-page">
        <p style={{ color: "#dc2626", textAlign: "center", paddingTop: 40 }}>
          {loadError || "لم يتم العثور على اليتيم."}
        </p>
        <div className={styles.formActions}>
          <Link to="/admin/orphans" className={styles.cancelBtn}>
            إلغاء
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page} id="edit-orphan-page">
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>تعديل بيانات اليتيم</h1>
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
          />
          <FormInput
            label="الاسم الكامل"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            required
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
          />
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitBtn} disabled={submitting}>
            {submitting ? "جاري الحفظ..." : "تحديث"}
          </button>
          <Link to="/admin/orphans" className={styles.cancelBtn}>
            إلغاء
          </Link>
        </div>
      </form>
    </div>
  );
}
