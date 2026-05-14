import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { getTokenPayload } from "../../utils/authToken";
import styles from "./AdminLayout.module.css";

export default function AdminLayout() {
  const token = localStorage.getItem("token");
  const user = token ? getTokenPayload(token) : null;

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return (
      <div className={styles.layout} id="admin-layout">
        <main className={styles.content}>
          <p style={{ color: "#dc2626", textAlign: "center", paddingTop: 80 }}>
            غير مصرح لك بالدخول. هذه الصفحة مخصصة للمسؤول فقط.
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.layout} id="admin-layout">
      <Sidebar />
      <div className={styles.mainArea}>
        <Navbar />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
