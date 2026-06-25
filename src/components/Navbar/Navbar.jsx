import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, clearInMemoryToken } from "../../services/authService";
import styles from "./Navbar.module.css";

const notifications = [
  {
    title: "طلبات مساعدة بانتظار المراجعة",
    description: "راجع الطلبات الجديدة واتخذ القرار المناسب.",
    to: "/admin/help-requests",
  },
  {
    title: "طلبات كفالة جديدة",
    description: "تابع طلبات الكفالة التي وصلت مؤخرا.",
    to: "/admin/sponsorship-requests",
  },
  {
    title: "تبرعات تحتاج متابعة",
    description: "افتح سجل التبرعات لمراجعة آخر العمليات.",
    to: "/admin/donations",
  },
];

export default function Navbar({ title = "لوحة التحكم", breadcrumb = "", user }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const displayName = user?.name || "مدير النظام";
  const displayRole = user?.role === "admin" ? "مسؤول" : "مستخدم";
  const initial = displayName.trim().charAt(0) || "م";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const toggleMenu = (menuName) => {
    setActiveMenu((currentMenu) => (currentMenu === menuName ? null : menuName));
  };

  const closeMenu = () => {
    setActiveMenu(null);
  };

  const handleLogout = async () => {
    await logout();
    clearInMemoryToken();
    localStorage.removeItem("user");
    closeMenu();
    navigate("/login", { replace: true });
  };

  return (
    <header className={styles.navbar} id="admin-navbar">
      <div className={styles.right}>
        <div>
          <h1 className={styles.pageTitle}>{title}</h1>
          {breadcrumb && <p className={styles.breadcrumb}>{breadcrumb}</p>}
        </div>
      </div>

      <div className={styles.left} ref={menuRef}>
        <div className={styles.menuWrap}>
          <button
            className={styles.notifBtn}
            id="notif-btn"
            type="button"
            title="الإشعارات"
            aria-label="فتح الإشعارات"
            aria-expanded={activeMenu === "notifications"}
            onClick={() => toggleMenu("notifications")}
          >
            🔔
            <span className={styles.notifBadge}></span>
          </button>

          {activeMenu === "notifications" && (
            <div className={`${styles.dropdown} ${styles.notificationsMenu}`}>
              <div className={styles.dropdownHeader}>
                <strong>الإشعارات</strong>
                <span>{notifications.length} جديد</span>
              </div>

              {notifications.map((item) => (
                <Link
                  className={styles.notificationItem}
                  key={item.to}
                  to={item.to}
                  onClick={closeMenu}
                >
                  <span className={styles.notificationDot}></span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.description}</small>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className={styles.menuWrap}>
          <button
            className={styles.avatar}
            type="button"
            aria-label="فتح قائمة الحساب"
            aria-expanded={activeMenu === "profile"}
            onClick={() => toggleMenu("profile")}
          >
            <div>
              <div className={styles.avatarName}>{displayName}</div>
              <div className={styles.avatarRole}>{displayRole}</div>
            </div>
            <div className={styles.avatarImg}>{initial}</div>
          </button>

          {activeMenu === "profile" && (
            <div className={`${styles.dropdown} ${styles.profileMenu}`}>
              <div className={styles.profileSummary}>
                <div className={styles.avatarImg}>{initial}</div>
                <div>
                  <strong>{displayName}</strong>
                  <span>{user?.email || "حساب مسؤول"}</span>
                </div>
              </div>

              <Link to="/admin" className={styles.menuItem} onClick={closeMenu}>
                لوحة التحكم
              </Link>
              <Link to="/" className={styles.menuItem} onClick={closeMenu}>
                عرض الموقع
              </Link>
              <button className={styles.logoutBtn} type="button" onClick={handleLogout}>
                تسجيل الخروج
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
