import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable/DataTable";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { donationService } from "../../services/donationService";
import styles from "./AdminPage.module.css";

const NOT_CONNECTED_MESSAGE = "هذا الإجراء غير متصل بالباكند بعد.";

const columns = [
  { key: "id", label: "#" },
  { key: "donorName", label: "اسم المتبرع" },
  {
    key: "amount",
    label: "المبلغ",
    render: (v, row) => (v > 0 ? `${v.toLocaleString()} ${row.currency}` : "—"),
  },
  { key: "type", label: "النوع" },
  { key: "date", label: "التاريخ" },
  { key: "status", label: "الحالة", isStatus: true },
  { key: "notes", label: "ملاحظات" },
];

const statusMap = {
  "مستلمة": "green",
  "معلقة": "yellow",
};

export default function DonationsList() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchDonations = async () => {
    try {
      setError("");
      const data = await donationService.getAll();
      setDonations(data);
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

  if (loading) {
    return <p style={{ color: "#94a3b8", textAlign: "center", paddingTop: 40 }}>جاري التحميل...</p>;
  }

  return (
    <div className={styles.page} id="admin-donations-page">
      {error && (
        <p style={{ color: "#dc2626", textAlign: "center", marginBottom: 16 }}>
          {error}
        </p>
      )}

      <DataTable
        title="إدارة التبرعات"
        columns={columns}
        data={donations}
        onEdit={() => setError(NOT_CONNECTED_MESSAGE)}
        onDelete={(row) => setDeleteTarget(row)}
        searchPlaceholder="ابحث باسم المتبرع..."
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
