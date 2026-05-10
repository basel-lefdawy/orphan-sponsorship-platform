import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import FormInput from "../../components/FormInput/FormInput";
import { orphanService } from "../../services/orphanService";
import styles from "./AdminPage.module.css";

const initialState = {
  name: "",
  age: "",
  gender: "",
  dateOfBirth: "",
  status: "",
  healthStatus: "",
  educationLevel: "",
  notes: "",
};

export default function AddOrphan() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "الاسم مطلوب";
    if (!form.age || isNaN(form.age) || Number(form.age) < 0)
      errs.age = "العمر مطلوب ويجب أن يكون رقماً صحيحاً";
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
    try {
      await orphanService.create({
        ...form,
        age: Number(form.age),
        enrollmentDate: new Date().toISOString().split("T")[0],
        sponsorId: null,
      });
      navigate("/admin/orphans");
    } catch (err) {
      console.error(err);
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
        <div className={styles.formGrid}>
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
            label="العمر"
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
            error={errors.age}
            required
            placeholder="أدخل العمر"
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
            placeholder="مثال: جيد"
          />
          <FormInput
            label="المرحلة الدراسية"
            name="educationLevel"
            value={form.educationLevel}
            onChange={handleChange}
            placeholder="مثال: الصف الثالث"
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
          <button
            type="submit"
            className={styles.submitBtn}
            disabled={submitting}
          >
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
