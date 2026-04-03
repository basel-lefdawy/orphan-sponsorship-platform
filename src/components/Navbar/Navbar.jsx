import styles from "./Navbar.module.css";

export default function Navbar({ title = "لوحة التحكم", breadcrumb = "" }) {
  return (
    <header className={styles.navbar} id="admin-navbar">
      <div className={styles.right}>
        <div>
          <h1 className={styles.pageTitle}>{title}</h1>
          {breadcrumb && <p className={styles.breadcrumb}>{breadcrumb}</p>}
        </div>
      </div>

      <div className={styles.left}>
        <button className={styles.notifBtn} id="notif-btn" title="الإشعارات">
          🔔
          <span className={styles.notifBadge}></span>
        </button>

        <div className={styles.avatar}>
          <div>
            <div className={styles.avatarName}>مدير النظام</div>
            <div className={styles.avatarRole}>مسؤول</div>
          </div>
          <div className={styles.avatarImg}>م</div>
        </div>
      </div>
    </header>
  );
}
