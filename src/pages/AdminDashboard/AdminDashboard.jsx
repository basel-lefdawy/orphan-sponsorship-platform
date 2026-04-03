import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import { orphanService } from "../../services/orphanService";
import { donationService } from "../../services/donationService";

import { helpRequestService } from "../../services/helpRequestService";
import { sponsorService } from "../../services/sponsorService";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    orphans: [],
    donations: [],
    helpRequests: [],
    sponsors: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [orphans, donations, helpRequests, sponsors] =
          await Promise.all([
            orphanService.getAll(),
            donationService.getAll(),
            helpRequestService.getAll(),
            sponsorService.getAll(),
          ]);
        setStats({ orphans, donations, helpRequests, sponsors });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className={styles.page} style={{ textAlign: "center", paddingTop: 80 }}>
        <p style={{ color: "#94a3b8", fontSize: "1.1rem" }}>جاري التحميل...</p>
      </div>
    );
  }

  const { orphans, donations, helpRequests, sponsors } = stats;
  const sponsoredCount = orphans.filter((o) => o.status === "مكفول").length;
  const sponsorshipRate =
    orphans.length > 0
      ? Math.round((sponsoredCount / orphans.length) * 100)
      : 0;
  const totalDonations = donations.reduce((s, d) => s + d.amount, 0);
  const pendingRequests = helpRequests.filter(
    (h) => h.status === "قيد المراجعة"
  );

  return (
    <div className={styles.page} id="admin-dashboard-page">
      {/* Greeting */}
      <div className={styles.greeting}>
        <h1 className={styles.greetTitle}>مرحباً بك، مدير النظام 👋</h1>
        <p className={styles.greetSub}>
          إليك نظرة عامة على نشاط المركز اليوم
        </p>
      </div>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <Link to="/admin/orphans" className={styles.quickBtn}>
          👶 إدارة الأيتام
        </Link>
        <Link to="/admin/donations" className={styles.quickBtn}>
          💰 التبرعات
        </Link>

        <Link to="/admin/help-requests" className={styles.quickBtn}>
          🆘 طلبات المساعدة
        </Link>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <DashboardCard
          icon="👶"
          label="إجمالي الأيتام"
          value={orphans.length}
          trend={`${sponsoredCount} مكفول`}
          trendDirection="up"
          accentColor="#4f8ef7"
          bgColor="#eef4ff"
        />
        <DashboardCard
          icon="🤝"
          label="الكفلاء النشطين"
          value={sponsors.length}
          accentColor="#8b5cf6"
          bgColor="#f3f0ff"
        />
        <DashboardCard
          icon="💰"
          label="إجمالي التبرعات"
          value={`${totalDonations.toLocaleString()} ر.س`}
          trend={`${donations.length} تبرع`}
          trendDirection="up"
          accentColor="#059669"
          bgColor="#ecfdf5"
        />

        <DashboardCard
          icon="🆘"
          label="طلبات معلقة"
          value={pendingRequests.length}
          trend={`${helpRequests.length} إجمالي`}
          trendDirection={pendingRequests.length > 2 ? "down" : "up"}
          accentColor="#ef4444"
          bgColor="#fef2f2"
        />
        <DashboardCard
          icon="⭐"
          label="نسبة الكفالة"
          value={`${sponsorshipRate}%`}
          accentColor="#4f8ef7"
          bgColor="#eef4ff"
        />
      </div>

      {/* Recent Activity Section */}
      <h2 className={styles.sectionTitle}>📋 أحدث النشاطات</h2>
      <div className={styles.recentGrid}>
        {/* Recent Orphans */}
        <div className={styles.recentCard}>
          <div className={styles.recentHeader}>
            <h3 className={styles.recentTitle}>أحدث الأيتام</h3>
            <Link to="/admin/orphans" className={styles.viewAll}>
              عرض الكل ←
            </Link>
          </div>
          <ul className={styles.recentList}>
            {orphans.slice(0, 4).map((o) => (
              <li key={o.id} className={styles.recentItem}>
                <div
                  className={styles.recentIcon}
                  style={{ background: "#eef4ff" }}
                >
                  👶
                </div>
                <div className={styles.recentItemInfo}>
                  <p className={styles.recentItemName}>{o.name}</p>
                  <p className={styles.recentItemDetail}>
                    {o.age} سنوات — {o.educationLevel}
                  </p>
                </div>
                <span
                  className={`${styles.recentItemBadge} ${
                    o.status === "مكفول"
                      ? styles.badgeGreen
                      : styles.badgeYellow
                  }`}
                >
                  {o.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Donations */}
        <div className={styles.recentCard}>
          <div className={styles.recentHeader}>
            <h3 className={styles.recentTitle}>أحدث التبرعات</h3>
            <Link to="/admin/donations" className={styles.viewAll}>
              عرض الكل ←
            </Link>
          </div>
          <ul className={styles.recentList}>
            {donations.slice(0, 4).map((d) => (
              <li key={d.id} className={styles.recentItem}>
                <div
                  className={styles.recentIcon}
                  style={{ background: "#ecfdf5" }}
                >
                  💰
                </div>
                <div className={styles.recentItemInfo}>
                  <p className={styles.recentItemName}>{d.donorName}</p>
                  <p className={styles.recentItemDetail}>
                    {d.amount > 0
                      ? `${d.amount.toLocaleString()} ${d.currency}`
                      : d.type}{" "}
                    — {d.date}
                  </p>
                </div>
                <span
                  className={`${styles.recentItemBadge} ${
                    d.status === "مستلمة"
                      ? styles.badgeGreen
                      : styles.badgeYellow
                  }`}
                >
                  {d.status}
                </span>
              </li>
            ))}
          </ul>
        </div>


      </div>
    </div>
  );
}
