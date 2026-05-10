import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable/DataTable";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { helpRequestService } from "../../services/helpRequestService";
import styles from "./AdminPage.module.css";

const columns = [
  { key: "id", label: "#" },
  { key: "requesterName", label: "مقدم الطلب" },
  { key: "requestType", label: "نوع الطلب" },
  { key: "date", label: "التاريخ" },
  { key: "urgency", label: "الأولوية" },
  { key: "status", label: "الحالة", isStatus: true },
  { key: "phone", label: "الهاتف" },
];

const statusMap = {
  "قيد المراجعة": "yellow",
  "تمت الموافقة": "green",
  "منتهية": "gray",
  "مرفوضة": "red",
};

export default function HelpRequestsList() {
  const [helpRequests, setHelpRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchHelpRequests = async () => {
    try {
      const data = await helpRequestService.getAll();
      setHelpRequests(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHelpRequests();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await helpRequestService.delete(deleteTarget.id);
    setDeleteTarget(null);
    fetchHelpRequests();
  };

  if (loading) {
    return <p style={{ color: "#94a3b8", textAlign: "center", paddingTop: 40 }}>جاري التحميل...</p>;
  }

  return (
    <div className={styles.page} id="admin-help-requests-page">
      <DataTable
        title="إدارة طلبات المساعدة"
        columns={columns}
        data={helpRequests}
        onEdit={(row) => alert(`تعديل الطلب #${row.id}`)}
        onDelete={(row) => setDeleteTarget(row)}
        searchPlaceholder="ابحث باسم مقدم الطلب..."
        emptyMessage="لا توجد طلبات مساعدة"
        statusMap={statusMap}
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="حذف طلب"
        message={`هل أنت متأكد من حذف طلب "${deleteTarget?.requesterName}"؟`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
