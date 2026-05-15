import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable/DataTable";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { donationService } from "../../services/donationService";
import styles from "./AdminPage.module.css";

const NOT_CONNECTED_MESSAGE = "هذا الإجراء غير متصل بالباكند بعد.";

const columns = [
  { key: "id", label: "#" },
  { key: "donationNumber", label: "رقم التبرع" },
  { key: "donorName", label: "اسم المتبرع" },
  {
    key: "amount",
    label: "المبلغ",
    render: (value, row) => (value > 0 ? `${value.toLocaleString()} ${row.currency}` : "-"),
  },
  { key: "method", label: "طريقة الدفع" },
  { key: "email", label: "البريد", render: (value) => value || "-" },
  { key: "date", label: "التاريخ" },
  { key: "status", label: "الحالة", isStatus: true },
];

const statusMap = {
  مستلمة: "green",
  معلقة: "yellow",
};

function formatDate(value) {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString();
}

function getStatusLabel(status) {
  if (status === "paid") return "مستلمة";
  if (status === "pending") return "معلقة";

  return status || "";
}

function mapDonation(donation) {
  return {
    ...donation,
    donationNumber: donation.donationNumber || "-",
    donorName: donation.donorName || (donation.isAnonymous ? "متبرع مجهول" : "-"),
    method: donation.method || "-",
    date: formatDate(donation.createdAt),
    rawStatus: donation.status || "pending",
    status: getStatusLabel(donation.status),
    currency: donation.currency || "",
  };
}

export default function DonationsList() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [editStatus, setEditStatus] = useState("pending");
  const [saving, setSaving] = useState(false);

  const fetchDonations = async () => {
    try {
      setError("");
      const data = await donationService.getAll();
      setDonations(data.map(mapDonation));
    } catch (err) {
      console.error(err);
      setDonations([]);
      setError("تعذر تحميل بيانات التبرعات من الباكند.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setError("");
      await donationService.delete(deleteTarget.id);
      setDeleteTarget(null);
      fetchDonations();
    } catch (err) {
      console.error(err);
      setDeleteTarget(null);
      setError(err.message || NOT_CONNECTED_MESSAGE);
    }
  };

  const handleEdit = (row) => {
    setError("");
    setEditTarget(row);
    setEditStatus(row.rawStatus || "pending");
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    if (!editTarget) return;

    try {
      setSaving(true);
      setError("");
      await donationService.update(editTarget.id, { status: editStatus });
      setEditTarget(null);
      fetchDonations();
    } catch (err) {
      console.error(err);
      setError(err.message || NOT_CONNECTED_MESSAGE);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <p style={{ color: "#94a3b8", textAlign: "center", paddingTop: 40 }}>
        جاري التحميل...
      </p>
    );
  }

  return (
    <div className={styles.page} id="admin-donations-page">
      {error && (
        <p style={{ color: "#dc2626", textAlign: "center", marginBottom: 16 }}>
          {error}
        </p>
      )}

      {editTarget && (
        <form
          className={styles.formWrapper}
          onSubmit={handleUpdateStatus}
          style={{ marginBottom: 20 }}
        >
          <div className={styles.formGrid}>
            <label style={{ display: "grid", gap: 8, color: "#334155" }}>
              <span>حالة التبرع</span>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: 10,
                  padding: "11px 12px",
                  font: "inherit",
                }}
              >
                <option value="pending">معلقة</option>
                <option value="paid">مستلمة</option>
              </select>
            </label>
          </div>
          <div className={styles.formActions}>
            <button type="submit" className={styles.submitBtn} disabled={saving}>
              {saving ? "جاري الحفظ..." : "حفظ"}
            </button>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => setEditTarget(null)}
              disabled={saving}
            >
              إلغاء
            </button>
          </div>
        </form>
      )}

      <DataTable
        title="إدارة التبرعات"
        columns={columns}
        data={donations}
        onEdit={handleEdit}
        onDelete={(row) => setDeleteTarget(row)}
        searchPlaceholder="ابحث باسم المتبرع أو رقم التبرع..."
        emptyMessage="لا توجد تبرعات"
        statusMap={statusMap}
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="حذف تبرع"
        message={`هل أنت متأكد من حذف تبرع "${deleteTarget?.donorName}"؟`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
