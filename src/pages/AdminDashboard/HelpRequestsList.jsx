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
  {
    key: "reviewActions",
    label: "الإجراء",
    render: (_, row) => row.reviewActions,
  },
];

const statusMap = {
  Pending: "yellow",
  Approved: "green",
  Rejected: "red",
  "قيد المراجعة": "yellow",
  "تمت الموافقة": "green",
  "منتهية": "gray",
  "مرفوضة": "red",
};

export default function HelpRequestsList() {
  const [helpRequests, setHelpRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  const fetchHelpRequests = async () => {
    try {
      setError("");
      const data = await helpRequestService.getAll();
      setHelpRequests(data);
    } catch (err) {
      console.error(err);
      setError("تعذر تحميل طلبات المساعدة من الباكند.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHelpRequests();
  }, []);

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setError("");
      await helpRequestService.delete(deleteTarget.id);
      setDeleteTarget(null);
      fetchHelpRequests();
    } catch (err) {
      console.error(err);
      setError("تعذر حذف طلب المساعدة.");
    }
  };

  const handleReview = async (row, action) => {
    try {
      setError("");
      setProcessingId(row.id);

      if (action === "approve") {
        await helpRequestService.approve(row.id);
      } else {
        await helpRequestService.reject(row.id);
      }

      fetchHelpRequests();
    } catch (err) {
      console.error(err);
      setError(err.message || "تعذر تحديث حالة طلب المساعدة.");
    } finally {
      setProcessingId(null);
    }
  };

  const dataWithActions = helpRequests.map((request) => {
    const isPending =
      request.status === "Pending" || request.status === "قيد المراجعة";
    const isProcessing = processingId === request.id;

    return {
      ...request,
      reviewActions: isPending ? (
        <div className={styles.actionGroup}>
          <button
            type="button"
            onClick={() => handleReview(request, "approve")}
            disabled={isProcessing}
            className={styles.approveBtn}
          >
            قبول
          </button>
          <button
            type="button"
            onClick={() => handleReview(request, "reject")}
            disabled={isProcessing}
            className={styles.rejectBtn}
          >
            رفض
          </button>
        </div>
      ) : (
        "-"
      ),
    };
  });

  if (loading) {
    return (
      <p style={{ color: "#94a3b8", textAlign: "center", paddingTop: 40 }}>
        جاري التحميل...
      </p>
    );
  }

  return (
    <div className={styles.page} id="admin-help-requests-page">
      {error && (
        <p style={{ color: "#dc2626", textAlign: "center", marginBottom: 16 }}>
          {error}
        </p>
      )}

      <DataTable
        title="إدارة طلبات المساعدة"
        columns={columns}
        data={dataWithActions}
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
