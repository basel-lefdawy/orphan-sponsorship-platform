import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../components/DataTable/DataTable";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { orphanService } from "../../services/orphanService";
import styles from "./AdminPage.module.css";

const columns = [
  { key: "id", label: "#" },
  { key: "name", label: "الاسم" },
  { key: "age", label: "العمر" },
  { key: "gender", label: "الجنس" },
  {
    key: "status",
    label: "الحالة",
    isStatus: true,
  },
  { key: "sponsor", label: "الكفيل", render: (v) => v || "—" },
  { key: "educationLevel", label: "المرحلة الدراسية" },
];

const statusMap = {
  "مكفول": "green",
  "غير مكفول": "yellow",
};

export default function OrphansList() {
  const [orphans, setOrphans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();

  const fetchOrphans = async () => {
    try {
      const data = await orphanService.getAll();
      setOrphans(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrphans();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await orphanService.delete(deleteTarget.id);
    setDeleteTarget(null);
    fetchOrphans();
  };

  if (loading) {
    return <p style={{ color: "#94a3b8", textAlign: "center", paddingTop: 40 }}>جاري التحميل...</p>;
  }

  return (
    <div className={styles.page} id="admin-orphans-page">
      <DataTable
        title="إدارة الأيتام"
        columns={columns}
        data={orphans}
        onAdd={() => navigate("/admin/orphans/add")}
        addLabel="إضافة يتيم"
        onEdit={(row) => navigate(`/admin/orphans/edit/${row.id}`)}
        onDelete={(row) => setDeleteTarget(row)}
        searchPlaceholder="ابحث بالاسم أو الحالة..."
        emptyMessage="لا يوجد أيتام مسجلين"
        statusMap={statusMap}
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="حذف يتيم"
        message={`هل أنت متأكد من حذف "${deleteTarget?.name}"؟ لا يمكن التراجع عن هذا الإجراء.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
