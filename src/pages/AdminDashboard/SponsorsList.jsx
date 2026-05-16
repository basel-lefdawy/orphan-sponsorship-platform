import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable/DataTable";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import FormInput from "../../components/FormInput/FormInput";
import { sponsorService } from "../../services/sponsorService";
import styles from "./AdminPage.module.css";

const NOT_AVAILABLE = "غير متوفر";

const initialForm = {
  identityNumber: "",
  firstName: "",
  fatherName: "",
  grandfatherName: "",
  familyName: "",
  dateOfBirth: "",
  gender: "",
  jobType: "",
  country: "",
  city: "",
  street: "",
  mobile: "",
  phone: "",
  email: "",
  status: "pending",
};

const statusOptions = [
  { value: "pending", label: "قيد المراجعة" },
  { value: "approved", label: "مقبول" },
  { value: "rejected", label: "مرفوض" },
];

const genderOptions = [
  { value: "male", label: "ذكر" },
  { value: "female", label: "أنثى" },
];

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
}

function getFullName(sponsor) {
  const parts = [
    sponsor.firstName,
    sponsor.fatherName,
    sponsor.grandfatherName,
    sponsor.familyName,
  ].filter(Boolean);

  return parts.length ? parts.join(" ") : NOT_AVAILABLE;
}

function getContactNumber(sponsor) {
  return sponsor.mobile || sponsor.phone || NOT_AVAILABLE;
}

function getMonthlyAmount(sponsor) {
  const amount = sponsor.sponsorships?.[0]?.monthlySAmount;

  if (amount === undefined || amount === null || amount === "") {
    return NOT_AVAILABLE;
  }

  const numericAmount = Number(amount);
  return Number.isNaN(numericAmount) ? String(amount) : numericAmount.toLocaleString();
}

function getOrphanFullName(sponsor) {
  const orphan = sponsor.sponsorships?.[0]?.orphan;

  if (!orphan) {
    return NOT_AVAILABLE;
  }

  const parts = [
    orphan.OrphanName,
    orphan.OrphanFatherName,
    orphan.OrphanGrandfatherName,
    orphan.OrphanFamilyName,
  ].filter(Boolean);

  return parts.length ? parts.join(" ") : NOT_AVAILABLE;
}

function getStatusLabel(status) {
  if (status === "pending") return "قيد المراجعة";
  if (status === "approved") return "مقبول";
  if (status === "rejected") return "مرفوض";
  return status || NOT_AVAILABLE;
}

const columns = [
  { key: "id", label: "#" },
  {
    key: "fullName",
    label: "اسم الكفيل",
    render: (_, row) => getFullName(row),
  },
  {
    key: "mobile",
    label: "الهاتف",
    render: (_, row) => getContactNumber(row),
  },
  {
    key: "email",
    label: "البريد",
    render: (value) => value || NOT_AVAILABLE,
  },
  {
    key: "monthlySAmount",
    label: "المبلغ الشهري",
    render: (_, row) => getMonthlyAmount(row),
  },
  {
    key: "status",
    label: "الحالة",
    isStatus: true,
    render: (value) => getStatusLabel(value),
  },
  {
    key: "statusAction",
    label: "تغيير الحالة",
    render: (_, row) => row.statusAction,
  },
];

const statusMap = {
  pending: "yellow",
  approved: "green",
  rejected: "red",
};

export default function SponsorsList() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editingSponsor, setEditingSponsor] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(initialForm);

  const fetchSponsors = async () => {
    try {
      setError("");
      const data = await sponsorService.getAll();
      setSponsors(data);
    } catch (err) {
      console.error(err);
      setSponsors([]);
      setError(err.message || "تعذر تحميل بيانات الكفالات من الباكند.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const resetForm = () => {
    setForm(initialForm);
    setEditingSponsor(null);
    setShowForm(false);
    setFormError("");
  };

  const startCreate = () => {
    setForm(initialForm);
    setEditingSponsor(null);
    setShowForm(true);
    setFormError("");
  };

  const startEdit = async (sponsor) => {
    try {
      setFormError("");
      const fullSponsor = await sponsorService.getById(sponsor.id);
      setEditingSponsor(fullSponsor);
      setForm({
        identityNumber: fullSponsor.identityNumber || "",
        firstName: fullSponsor.firstName || "",
        fatherName: fullSponsor.fatherName || "",
        grandfatherName: fullSponsor.grandfatherName || "",
        familyName: fullSponsor.familyName || "",
        dateOfBirth: formatDate(fullSponsor.dateOfBirth),
        gender: fullSponsor.gender || "",
        jobType: fullSponsor.jobType || "",
        country: fullSponsor.country || "",
        city: fullSponsor.city || "",
        street: fullSponsor.street || "",
        mobile: fullSponsor.mobile || "",
        phone: fullSponsor.phone || "",
        email: fullSponsor.email || "",
        status: fullSponsor.status || "pending",
      });
      setShowForm(true);
    } catch (err) {
      console.error(err);
      setError(err.message || "تعذر تحميل بيانات الكفيل.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const requiredFields = [
      "identityNumber",
      "firstName",
      "fatherName",
      "grandfatherName",
      "familyName",
      "dateOfBirth",
      "gender",
      "jobType",
      "country",
      "city",
      "mobile",
      "email",
      "status",
    ];

    return requiredFields.every((field) => String(form[field] || "").trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setFormError("يرجى تعبئة جميع الحقول المطلوبة.");
      return;
    }

    try {
      setSubmitting(true);
      setFormError("");

      if (editingSponsor) {
        await sponsorService.update(editingSponsor.id, form);
      } else {
        await sponsorService.create(form);
      }

      resetForm();
      await fetchSponsors();
    } catch (err) {
      console.error(err);
      setFormError(err.message || "تعذر حفظ بيانات الكفيل.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setError("");
      await sponsorService.delete(deleteTarget.id);
      setDeleteTarget(null);
      await fetchSponsors();
    } catch (err) {
      console.error(err);
      setError(err.message || "تعذر حذف الكفيل.");
    }
  };

  const handleStatusChange = async (sponsor, status) => {
    if (status === sponsor.status) return;

    try {
      setError("");
      await sponsorService.updateStatus(sponsor.id, status);
      await fetchSponsors();
    } catch (err) {
      console.error(err);
      setError(err.message || "تعذر تحديث حالة الكفيل.");
    }
  };

  const dataWithActions = sponsors.map((sponsor) => ({
    ...sponsor,
    fullName: getFullName(sponsor),
    statusAction: (
      <select
        value={sponsor.status || "pending"}
        onChange={(e) => handleStatusChange(sponsor, e.target.value)}
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ),
  }));

  if (loading) {
    return (
      <p style={{ color: "#94a3b8", textAlign: "center", paddingTop: 40 }}>
        جاري التحميل...
      </p>
    );
  }

  return (
    <div className={styles.page} id="admin-sponsors-page">
      {error && (
        <p className={styles.errorBanner} role="alert">
          {error}
        </p>
      )}

      {showForm && (
        <form className={styles.formWrapper} onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>
              {editingSponsor ? "تعديل بيانات الكفيل" : "إضافة كفيل"}
            </h1>
          </div>

          {formError && (
            <p className={styles.errorBanner} role="alert">
              {formError}
            </p>
          )}

          <div className={styles.formGrid}>
            <FormInput label="رقم الهوية" name="identityNumber" value={form.identityNumber} onChange={handleChange} required />
            <FormInput label="الاسم" name="firstName" value={form.firstName} onChange={handleChange} required />
            <FormInput label="اسم الأب" name="fatherName" value={form.fatherName} onChange={handleChange} required />
            <FormInput label="اسم الجد" name="grandfatherName" value={form.grandfatherName} onChange={handleChange} required />
            <FormInput label="العائلة" name="familyName" value={form.familyName} onChange={handleChange} required />
            <FormInput label="تاريخ الميلاد" name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} required />
            <FormInput label="الجنس" name="gender" type="select" value={form.gender} onChange={handleChange} options={genderOptions} required />
            <FormInput label="نوع العمل" name="jobType" value={form.jobType} onChange={handleChange} required />
            <FormInput label="الدولة" name="country" value={form.country} onChange={handleChange} required />
            <FormInput label="المدينة" name="city" value={form.city} onChange={handleChange} required />
            <FormInput label="الشارع" name="street" value={form.street} onChange={handleChange} />
            <FormInput label="الجوال" name="mobile" value={form.mobile} onChange={handleChange} required />
            <FormInput label="الهاتف" name="phone" value={form.phone} onChange={handleChange} />
            <FormInput label="البريد الإلكتروني" name="email" type="email" value={form.email} onChange={handleChange} required />
            <FormInput label="الحالة" name="status" type="select" value={form.status} onChange={handleChange} options={statusOptions} required />
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.submitBtn} disabled={submitting}>
              {submitting ? "جاري الحفظ..." : "حفظ"}
            </button>
            <button type="button" className={styles.cancelBtn} onClick={resetForm}>
              إلغاء
            </button>
          </div>
        </form>
      )}

      <DataTable
        title="إدارة الكفالات"
        columns={columns}
        data={dataWithActions}
        onAdd={startCreate}
        addLabel="إضافة كفيل"
        onEdit={startEdit}
        onDelete={(row) => setDeleteTarget(row)}
        searchPlaceholder="ابحث باسم الكفيل..."
        emptyMessage="لا توجد كفالات"
        statusMap={statusMap}
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="حذف كفيل"
        message={`هل أنت متأكد من حذف "${deleteTarget ? getFullName(deleteTarget) : ""}"؟`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
