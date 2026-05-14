import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";
import { orphanService } from "../../services/orphanService";
import styles from "./AdminPage.module.css";

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
            name: orphan.name,
            age: String(orphan.age),
            gender: orphan.gender,
            dateOfBirth: orphan.dateOfBirth,
            status: orphan.status,
            healthStatus: orphan.healthStatus || "",
            educationLevel: orphan.educationLevel || "",
            notes: orphan.notes || "",
          });
        } else {
          setLoadError("This action is not connected to the backend yet.");
        }
      } catch (err) {
        console.error(err);
        setLoadError(err.message || "Unable to load this orphan from the backend.");
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
    if (!form.name.trim()) errs.name = "الاسم مطلوب";
    if (!form.age || isNaN(form.age) || Number(form.age) < 0)
      errs.age = "العمر مطلوب";
    if (!form.gender) errs.gender = "الجنس مطلوب";
    if (!form.dateOfBirth) errs.dateOfBirth = "تاريخ الميلاد مطلوب";
    if (!form.status) errs.status = "الحالة مطلوبة";
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
      await orphanService.update(id, {
        ...form,
        age: Number(form.age),
      });
      navigate("/admin/orphans");
    } catch (err) {
      console.error(err);
      setSubmitError(err.message || "This action is not connected to the backend yet.");
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
          {loadError || "This action is not connected to the backend yet."}
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
            label="الاسم الكامل"
            name="name"
            value={form.name}
            onChange={handleChange}
            error={errors.name}
            required
          />
          <FormInput
            label="العمر"
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
            error={errors.age}
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
            options={[
              { value: "ذكر", label: "ذكر" },
              { value: "أنثى", label: "أنثى" },
            ]}
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
            label="الحالة"
            name="status"
            type="select"
            value={form.status}
            onChange={handleChange}
            error={errors.status}
            required
            options={[
              { value: "مكفول", label: "مكفول" },
              { value: "غير مكفول", label: "غير مكفول" },
            ]}
          />
          <FormInput
            label="الحالة الصحية"
            name="healthStatus"
            value={form.healthStatus}
            onChange={handleChange}
          />
          <FormInput
            label="المرحلة الدراسية"
            name="educationLevel"
            value={form.educationLevel}
            onChange={handleChange}
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
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={submitting}
          >
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
