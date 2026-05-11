import styles from "./ConfirmModal.module.css";

export default function ConfirmModal({
  isOpen,
  title = "تأكيد الحذف",
  message = "هل أنت متأكد من أنك تريد حذف هذا العنصر؟ لا يمكن التراجع عن هذا الإجراء.",
  onConfirm,
  onCancel,
  confirmText = "حذف",
  cancelText = "إلغاء",
}) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onCancel} id="confirm-modal-overlay">
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        id="confirm-modal"
      >
        <div className={styles.icon}>⚠️</div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button
            className={styles.cancelBtn}
            onClick={onCancel}
            id="confirm-modal-cancel"
          >
            {cancelText}
          </button>
          <button
            className={styles.confirmBtn}
            onClick={onConfirm}
            id="confirm-modal-confirm"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
