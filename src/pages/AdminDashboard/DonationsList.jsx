import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable/DataTable";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { donationService } from "../../services/donationService";
import styles from "./AdminPage.module.css";

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
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchDonations = async () => {
    try {
      const data = await donationService.getAll();
      setDonations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await donationService.delete(deleteTarget.id);
    setDeleteTarget(null);
    fetchDonations();
  };

  if (loading) {
    return <p style={{ color: "#94a3b8", textAlign: "center", paddingTop: 40 }}>جاري التحميل...</p>;
  }

  return (
    <div className={styles.page} id="admin-donations-page">
      <DataTable
        title="إدارة التبرعات"
        columns={columns}
        data={donations}
        onEdit={(row) => alert(`تعديل التبرع #${row.id}`)}
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
