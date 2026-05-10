import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable/DataTable";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { sponsorService } from "../../services/sponsorService";
import styles from "./AdminPage.module.css";

const columns = [
  { key: "id", label: "#" },
  { key: "name", label: "اسم الكفيل" },
  { key: "phone", label: "الهاتف" },
  { key: "email", label: "البريد" },
  { key: "orphanName", label: "اسم اليتيم" },
  {
    key: "monthlyAmount",
    label: "المبلغ الشهري",
    render: (v) => `${v.toLocaleString()} ر.س`,
  },
  { key: "status", label: "الحالة", isStatus: true },
];

const statusMap = {
  "نشط": "green",
  "متوقف": "red",
};

export default function SponsorsList() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchSponsors = async () => {
    try {
      const data = await sponsorService.getAll();
      setSponsors(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await sponsorService.delete(deleteTarget.id);
    setDeleteTarget(null);
    fetchSponsors();
  };

  if (loading) {
    return <p style={{ color: "#94a3b8", textAlign: "center", paddingTop: 40 }}>جاري التحميل...</p>;
  }

  return (
    <div className={styles.page} id="admin-sponsors-page">
      <DataTable
        title="إدارة الكفالات"
        columns={columns}
        data={sponsors}
        onEdit={(row) => alert(`تعديل الكفيل #${row.id}`)}
        onDelete={(row) => setDeleteTarget(row)}
        searchPlaceholder="ابحث باسم الكفيل..."
        emptyMessage="لا توجد كفالات"
        statusMap={statusMap}
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="حذف كفالة"
        message={`هل أنت متأكد من حذف كفالة "${deleteTarget?.name}"؟`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
