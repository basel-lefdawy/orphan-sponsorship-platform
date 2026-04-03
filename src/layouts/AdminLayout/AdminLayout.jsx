import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./AdminLayout.module.css";

export default function AdminLayout() {
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
