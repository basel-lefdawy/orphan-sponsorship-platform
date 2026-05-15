import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./AdminLayout.module.css";

export default function AdminLayout() {
  const [authStatus, setAuthStatus] = useState("checking");

  useEffect(() => {
    const verifyAdmin = async () => {
      const token = localStorage.getItem("token");

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
        });

        const user = data?.data?.user || data?.user || data;
        setAuthStatus(user?.role === "admin" ? "admin" : "denied");
      } catch (err) {
        console.error("Failed to verify admin user:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
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
        <Navbar />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
