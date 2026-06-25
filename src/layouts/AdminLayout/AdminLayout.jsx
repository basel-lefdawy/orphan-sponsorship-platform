import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getStoredAccessToken } from "../../services/authService";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./AdminLayout.module.css";

export default function AdminLayout() {
  const [authStatus, setAuthStatus] = useState("checking");
  const [adminUser, setAdminUser] = useState(null);

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = getStoredAccessToken();

      if (!token) {
        setAuthStatus("login");
        return;
      }

      try {
        const apiBaseUrl =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

        const { data } = await axios.get(`${apiBaseUrl}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        const user = data?.data?.user || data?.user || data;
        setAdminUser(user || null);
        setAuthStatus(user?.role === "admin" ? "admin" : "denied");
      } catch (err) {
        console.error("Failed to verify admin user:", err);
        // Clear only in-memory token and any stored user profile
        try {
          localStorage.removeItem("user");
        } catch (e) {}
        setAdminUser(null);
        setAuthStatus("login");
      }
    };

    verifyAdmin();
  }, []);

  if (authStatus === "checking") {
    return (
      <div className={styles.layout} id="admin-layout">
        <main className={styles.content}>
          <p style={{ color: "#64748b", textAlign: "center", paddingTop: 80 }}>
            جاري التحقق من صلاحيات الدخول...
          </p>
        </main>
      </div>
    );
  }

  if (authStatus === "login") {
    return <Navigate to="/login" replace />;
  }

  if (authStatus === "denied") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.layout} id="admin-layout">
      <Sidebar />
      <div className={styles.mainArea}>
        <Navbar user={adminUser} />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
