import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardCard from "../../components/DashboardCard/DashboardCard";
import styles from "./AdminDashboard.module.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const DASHBOARD_API_URL = `${API_BASE_URL}/api/admin/dashboard`;

const fallbackDashboard = {
  counts: {
    orphans: 0,
    sponsors: 0,
    donations: 0,
    helpRequests: 0,
    sponsoredOrphans: 0,
    pendingHelpRequests: 0,
  },
  helpRequestStatuses: {
    pending: 0,
    approved: 0,
    rejected: 0,
  },
  totalDonations: 0,
  sponsorshipRate: 0,
  recent: {
    orphans: [],
    donations: [],
  },
  warnings: [],
};

function mergeDashboardData(data) {
  return {
    ...fallbackDashboard,
    ...(data || {}),
    counts: {
      ...fallbackDashboard.counts,
      ...(data?.counts || {}),
    },
    helpRequestStatuses: {
      ...fallbackDashboard.helpRequestStatuses,
      ...(data?.helpRequestStatuses || {}),
    },
    recent: {
      ...fallbackDashboard.recent,
      ...(data?.recent || {}),
    },
    warnings: data?.warnings || [],
  };
}

function getOrphanName(orphan) {
  return orphan.name || orphan.OrphanName || "يتيم غير معروف";
}

function getOrphanDetail(orphan) {
  const birthDate = orphan.OrphanBirthDate
    ? new Date(orphan.OrphanBirthDate).toLocaleDateString()
    : null;

  return [birthDate, orphan.GuaranteeType].filter(Boolean).join(" - ") || "لا توجد تفاصيل متاحة";
}

function getDonationName(donation) {
  return donation.donorName || donation.firstName || donation.name || "متبرع غير معروف";
}

function formatDonationAmount(donation) {
  const amount = Number(donation.amount || 0);
  if (amount <= 0) return donation.type || "لا يوجد مبلغ";

  const currency = donation.currency ? ` ${donation.currency}` : "";
  return `${amount.toLocaleString()}${currency}`;
}

function formatDonationDate(donation) {
  const rawDate = donation.date || donation.createdAt;
  if (!rawDate) return "";

  const date = new Date(rawDate);
  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString();
}

function getDonationDetail(donation) {
  return [formatDonationAmount(donation), formatDonationDate(donation)]
    .filter(Boolean)
    .join(" - ");
}

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(fallbackDashboard);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchDashboard() {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        const response = await fetch(DASHBOARD_API_URL, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        const payload = await response.json();

        if (!response.ok || !payload.success) {
          throw new Error(payload.message || "فشل تحميل بيانات لوحة التحكم");
        }

        setDashboard(mergeDashboardData(payload.data));
      } catch (err) {
        console.error(err);
        setDashboard(fallbackDashboard);
        setError("تعذر تحميل بيانات لوحة التحكم من الباكند.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className={styles.page} style={{ textAlign: "center", paddingTop: 80 }}>
        <p style={{ color: "#94a3b8", fontSize: "1.1rem" }}>جاري تحميل بيانات لوحة التحكم...</p>
      </div>
    );
  }

  const { counts, totalDonations, sponsorshipRate, recent, warnings } = dashboard;
  const recentOrphans = recent.orphans || [];
  const recentDonations = recent.donations || [];

  return (
    <div className={styles.page} id="admin-dashboard-page">
      <div className={styles.greeting}>
        <h1 className={styles.greetTitle}>لوحة تحكم المسؤول</h1>
        <p className={styles.greetSub}>
          ملخص مباشر من الباكند لنشاط المركز.
        </p>
      </div>

      {error && (
        <div className={styles.errorBanner} role="alert">
          {error}
        </div>
      )}

      {warnings.length > 0 && (
        <div className={styles.warningPanel}>
          <h2 className={styles.warningTitle}>تنبيهات بيانات لوحة التحكم</h2>
          <ul className={styles.warningList}>
            {warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.quickActions}>
        <Link to="/admin/orphans" className={styles.quickBtn}>
          الأيتام
        </Link>
        <Link to="/admin/donations" className={styles.quickBtn}>
          التبرعات
        </Link>
        <Link to="/admin/help-requests" className={styles.quickBtn}>
          طلبات المساعدة
        </Link>
      </div>

      <div className={styles.statsGrid}>
        <DashboardCard
          icon="ي"
          label="إجمالي الأيتام"
          value={counts.orphans}
          trend={`${counts.sponsoredOrphans} مكفول`}
          trendDirection="up"
          accentColor="#4f8ef7"
          bgColor="#eef4ff"
        />
        <DashboardCard
          icon="ك"
          label="الكفلاء النشطون"
          value={counts.sponsors}
          accentColor="#8b5cf6"
          bgColor="#f3f0ff"
        />
        <DashboardCard
          icon="ت"
          label="إجمالي التبرعات"
          value={`${totalDonations.toLocaleString()} ر.س`}
          trend={`${counts.donations} تبرع`}
          trendDirection="up"
          accentColor="#059669"
          bgColor="#ecfdf5"
        />
        <DashboardCard
          icon="ط"
          label="الطلبات المعلقة"
          value={counts.pendingHelpRequests}
          trend={`${counts.helpRequests} إجمالي`}
          trendDirection={counts.pendingHelpRequests > 2 ? "down" : "up"}
          accentColor="#ef4444"
          bgColor="#fef2f2"
        />
        <DashboardCard
          icon="%"
          label="نسبة الكفالة"
          value={`${sponsorshipRate}%`}
          accentColor="#4f8ef7"
          bgColor="#eef4ff"
        />
      </div>

      <h2 className={styles.sectionTitle}>النشاط الأخير</h2>
      <div className={styles.recentGrid}>
        <div className={styles.recentCard}>
          <div className={styles.recentHeader}>
            <h3 className={styles.recentTitle}>آخر الأيتام</h3>
            <Link to="/admin/orphans" className={styles.viewAll}>
              عرض الكل
            </Link>
          </div>
          {recentOrphans.length === 0 ? (
            <p className={styles.emptyState}>لا يوجد أيتام حديثون.</p>
          ) : (
            <ul className={styles.recentList}>
              {recentOrphans.map((orphan, index) => (
                <li key={orphan.id || orphan.OrphanID || index} className={styles.recentItem}>
                  <div
                    className={styles.recentIcon}
                    style={{ background: "#eef4ff" }}
                  >
                    ي
                  </div>
                  <div className={styles.recentItemInfo}>
                    <p className={styles.recentItemName}>{getOrphanName(orphan)}</p>
                    <p className={styles.recentItemDetail}>{getOrphanDetail(orphan)}</p>
                  </div>
                  {orphan.status && (
                    <span className={`${styles.recentItemBadge} ${styles.badgeYellow}`}>
                      {orphan.status}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.recentCard}>
          <div className={styles.recentHeader}>
            <h3 className={styles.recentTitle}>آخر التبرعات</h3>
            <Link to="/admin/donations" className={styles.viewAll}>
              عرض الكل
            </Link>
          </div>
          {recentDonations.length === 0 ? (
            <p className={styles.emptyState}>لا توجد تبرعات حديثة.</p>
          ) : (
            <ul className={styles.recentList}>
              {recentDonations.map((donation, index) => (
                <li key={donation.id || index} className={styles.recentItem}>
                  <div
                    className={styles.recentIcon}
                    style={{ background: "#ecfdf5" }}
                  >
                    ت
                  </div>
                  <div className={styles.recentItemInfo}>
                    <p className={styles.recentItemName}>{getDonationName(donation)}</p>
                    <p className={styles.recentItemDetail}>{getDonationDetail(donation)}</p>
                  </div>
                  {donation.status && (
                    <span className={`${styles.recentItemBadge} ${styles.badgeGreen}`}>
                      {donation.status}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
