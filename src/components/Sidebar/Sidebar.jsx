import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [homeDialogOpen, setHomeDialogOpen] = useState(false);

  const handleHomeClick = () => {
    setHomeDialogOpen(true);
  };

  const handleHomeCancel = () => {
    setHomeDialogOpen(false);
  };

  const handleHomeConfirm = () => {
    setHomeDialogOpen(false);
    navigate("/");
  };

  return (
    <>
      <aside className={styles.sidebar} id="admin-sidebar">
        <div className={styles.brand}>
          <h2 className={styles.brandTitle}>دار الأيتام</h2>
          <span className={styles.brandSub}>لوحة الإدارة</span>
        </div>

        <nav className={styles.nav}>
          <button
            type="button"
            className={styles.navLink}
            onClick={handleHomeClick}
          >
            <span className={styles.navIcon}>⌂</span>
            الصفحة الرئيسية
          </button>

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

      <Dialog
        open={homeDialogOpen}
        onClose={handleHomeCancel}
        maxWidth="xs"
        fullWidth
        dir="rtl"
        PaperProps={{
          dir: "rtl",
          style: {
            direction: "rtl",
            textAlign: "right",
          },
          sx: {
            borderRadius: "12px",
            mx: 2,
          },
        }}
      >
        <DialogTitle
          style={{ textAlign: "right", direction: "rtl" }}
          sx={{
            fontWeight: 700,
            color: "#1a1f2e",
            pb: 1,
          }}
        >
          الصفحة الرئيسية
        </DialogTitle>
        <DialogContent style={{ textAlign: "right", direction: "rtl" }}>
          <Typography style={{ textAlign: "right", direction: "rtl" }} sx={{ color: "#475569" }}>
            هل تريد العودة إلى الصفحة الرئيسية؟
          </Typography>
        </DialogContent>
        <DialogActions
          style={{ direction: "rtl", justifyContent: "flex-start" }}
          sx={{ px: 3, pb: 2, gap: 1 }}
        >
          <Button
            variant="outlined"
            onClick={handleHomeCancel}
            sx={{
              borderColor: "#cbd5e1",
              color: "#334155",
              borderRadius: "8px",
              fontWeight: 700,
              "&:hover": {
                borderColor: "#94a3b8",
                backgroundColor: "#f8fafc",
              },
            }}
          >
            إلغاء
          </Button>
          <Button
            variant="contained"
            onClick={handleHomeConfirm}
            sx={{
              backgroundColor: "#4f8ef7",
              borderRadius: "8px",
              fontWeight: 700,
              "&:hover": {
                backgroundColor: "#2563eb",
              },
            }}
          >
            العودة
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
