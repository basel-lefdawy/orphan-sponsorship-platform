import { useState, useMemo } from "react";
import styles from "./DataTable.module.css";

const ROWS_PER_PAGE = 6;

export default function DataTable({
  title,
  columns,
  data,
  onEdit,
  onDelete,
  onAdd,
  addLabel = "إضافة جديد",
  searchPlaceholder = "بحث...",
  emptyMessage = "لا توجد بيانات",
  statusMap,
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Filter data based on search
  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.trim().toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const val = row[col.key];
        return val != null && String(val).toLowerCase().includes(q);
      })
    );
  }, [data, search, columns]);

  // Paginate
  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  // Reset page when search changes
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const getStatusClass = (value) => {
    if (!statusMap) return "";
    const mapping = statusMap[value];
    if (mapping === "green") return styles.statusGreen;
    if (mapping === "yellow") return styles.statusYellow;
    if (mapping === "red") return styles.statusRed;
    return styles.statusGray;
  };

  return (
    <div className={styles.wrapper} id={`datatable-${title}`}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarRight}>
          <h2 className={styles.tableTitle}>{title}</h2>
        </div>
        <div className={styles.toolbarRight}>
          <div className={styles.searchWrap}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              className={styles.searchInput}
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={handleSearch}
              id={`search-${title}`}
            />
          </div>
          {onAdd && (
            <button className={styles.addBtn} onClick={onAdd} id={`add-${title}`}>
              + {addLabel}
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableContainer}>
        {paginated.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📋</div>
            <p className={styles.emptyText}>{emptyMessage}</p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
                {(onEdit || onDelete) && <th>إجراءات</th>}
              </tr>
            </thead>
            <tbody>
              {paginated.map((row) => (
                <tr key={row.id}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.isStatus ? (
                        <span
                          className={`${styles.statusBadge} ${getStatusClass(
                            row[col.key]
                          )}`}
                        >
                          {col.render ? col.render(row[col.key], row) : row[col.key]}
                        </span>
                      ) : col.render ? (
                        col.render(row[col.key], row)
                      ) : (
                        row[col.key]
                      )}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td>
                      <div className={styles.actions}>
                        {onEdit && (
                          <button
                            className={styles.editBtn}
                            onClick={() => onEdit(row)}
                            title="تعديل"
                          >
                            ✏️
                          </button>
                        )}
                        {onDelete && (
                          <button
                            className={styles.deleteBtn}
                            onClick={() => onDelete(row)}
                            title="حذف"
                          >
                            🗑️
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            className={styles.pageBtn}
            onClick={() => setPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            ›
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              className={`${styles.pageBtn} ${
                p === currentPage ? styles.pageBtnActive : ""
              }`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          <button
            className={styles.pageBtn}
            onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            ‹
          </button>
        </div>
      )}
    </div>
  );
}
