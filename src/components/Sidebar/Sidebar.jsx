import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const navItems = [
  {
    section: "عام",
    links: [
      { to: "/admin", label: "لوحة التحكم", icon: "📊" },
    ],
  },
  {
    section: "إدارة",
    links: [
      { to: "/admin/orphans", label: "الأيتام", icon: "👶" },
      { to: "/admin/donations", label: "التبرعات", icon: "💰" },
      { to: "/admin/sponsors", label: "الكفالات", icon: "🤝" },
    ],
  },
  {
    section: "أخرى",
    links: [
      { to: "/admin/help-requests", label: "طلبات المساعدة", icon: "🆘" },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className={styles.sidebar} id="admin-sidebar">
      <div className={styles.brand}>
        <h2 className={styles.brandTitle}>دار الأيتام</h2>
        <span className={styles.brandSub}>لوحة الإدارة</span>
      </div>

      <nav className={styles.nav}>
        {navItems.map((section) => (
          <div key={section.section}>
            <div className={styles.sectionLabel}>{section.section}</div>
            {section.links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/admin"}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ""}`
                }
              >
                <span className={styles.navIcon}>{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      <div className={styles.footer}>
        <p className={styles.footerText}>© 2026 مركز رعاية الأيتام</p>
      </div>
    </aside>
  );
}
