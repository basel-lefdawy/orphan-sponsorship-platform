import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable/DataTable";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { orphanService } from "../../services/orphanService";
import styles from "./AdminPage.module.css";

const NOT_CONNECTED_MESSAGE = "هذا الإجراء غير متصل بالباكند بعد.";

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
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchOrphans = async () => {
    try {
      setError("");
      const data = await orphanService.getAll();
      setOrphans(data);
    } catch (err) {
      console.error(err);
      setOrphans([]);
      setError("تعذر تحميل بيانات الأيتام من الباكند.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrphans();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setError("");
      await orphanService.delete(deleteTarget.id);
      setDeleteTarget(null);
      fetchOrphans();
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
    <div className={styles.page} id="admin-orphans-page">
      {error && (
        <p style={{ color: "#dc2626", textAlign: "center", marginBottom: 16 }}>
          {error}
        </p>
      )}

      <DataTable
        title="إدارة الأيتام"
        columns={columns}
        data={orphans}
        onAdd={() => setError(NOT_CONNECTED_MESSAGE)}
        addLabel="إضافة يتيم"
        onEdit={() => setError(NOT_CONNECTED_MESSAGE)}
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
