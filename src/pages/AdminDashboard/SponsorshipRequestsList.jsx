import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable/DataTable";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import { sponsorshipRequestService } from "../../services/sponsorshipRequestService";
import styles from "./AdminPage.module.css";

const columns = [
  { key: "id", label: "#" },
  { key: "sponsorName", label: "اسم الكفيل" },
  { key: "orphanIdDisplay", label: "رقم اليتيم" },
  { key: "monthlySAmountDisplay", label: "المبلغ الشهري" },
  { key: "paymentLabel", label: "طريقة الدفع" },
  { key: "createdDate", label: "التاريخ" },
  { key: "statusLabel", label: "الحالة", isStatus: true },
  {
    key: "reviewActions",
    label: "الإجراء",
    render: (_, row) => row.reviewActions,
  },
];

const statusMap = {
  "قيد المراجعة": "yellow",
  "تمت الموافقة": "green",
  "مرفوضة": "red",
};

export default function SponsorshipRequestsList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [processingId, setProcessingId] = useState(null);

  const fetchRequests = async () => {
    try {
      setError("");
      const data = await sponsorshipRequestService.getAll();
      setRequests(data);
    } catch (err) {
      console.error(err);
      setError("تعذر تحميل طلبات الكفالة من الباكند.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleReview = async (row, action) => {
    try {
      setError("");
      setProcessingId(row.id);

      if (action === "approve") {
        await sponsorshipRequestService.approve(row.id);
      } else {
        await sponsorshipRequestService.reject(row.id);
      }

      fetchRequests();
    } catch (err) {
      console.error(err);
      setError(err.message || "تعذر تحديث حالة طلب الكفالة.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      setError("");
      await sponsorshipRequestService.delete(deleteTarget.id);
      setDeleteTarget(null);
      fetchRequests();
    } catch (err) {
      console.error(err);
      setError(err.message || "تعذر حذف طلب الكفالة.");
    }
  };

  const dataWithActions = requests.map((request) => {
    const isPending =
      request.rawStatus === "pending" || request.rawStatus === "Pending";
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
    <div className={styles.page} id="admin-sponsorship-requests-page">
      {error && (
        <p style={{ color: "#dc2626", textAlign: "center", marginBottom: 16 }}>
          {error}
        </p>
      )}

      <DataTable
        title="إدارة طلبات الكفالة"
        columns={columns}
        data={dataWithActions}
        onDelete={(row) => setDeleteTarget(row)}
        searchPlaceholder="ابحث باسم الكفيل..."
        emptyMessage="لا توجد طلبات كفالة"
        statusMap={statusMap}
      />

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="حذف طلب كفالة"
        message={`هل أنت متأكد من حذف طلب "${deleteTarget?.sponsorName}"؟`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
