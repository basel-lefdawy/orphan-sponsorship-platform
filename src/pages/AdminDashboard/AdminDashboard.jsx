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
  return orphan.name || orphan.OrphanName || "Unknown orphan";
}

function getOrphanDetail(orphan) {
  const birthDate = orphan.OrphanBirthDate
    ? new Date(orphan.OrphanBirthDate).toLocaleDateString()
    : null;

  return [birthDate, orphan.GuaranteeType].filter(Boolean).join(" - ") || "No details available";
}

function getDonationName(donation) {
  return donation.donorName || donation.firstName || donation.name || "Unknown donor";
}

function getDonationDetail(donation) {
  const amount = Number(donation.amount || 0);
  const amountText = amount > 0 ? amount.toLocaleString() : donation.type || "No amount";
  return [amountText, donation.date].filter(Boolean).join(" - ");
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
          throw new Error(payload.message || "Failed to load dashboard data");
        }

        setDashboard(mergeDashboardData(payload.data));
      } catch (err) {
        console.error(err);
        setDashboard(fallbackDashboard);
        setError("Unable to load dashboard data from the backend.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className={styles.page} style={{ textAlign: "center", paddingTop: 80 }}>
        <p style={{ color: "#94a3b8", fontSize: "1.1rem" }}>Loading dashboard data...</p>
      </div>
    );
  }

  const { counts, totalDonations, sponsorshipRate, recent, warnings } = dashboard;
  const recentOrphans = recent.orphans || [];
  const recentDonations = recent.donations || [];

  return (
    <div className={styles.page} id="admin-dashboard-page">
      <div className={styles.greeting}>
        <h1 className={styles.greetTitle}>Admin Dashboard</h1>
        <p className={styles.greetSub}>
          Live backend summary for the center activity.
        </p>
      </div>

      {error && (
        <div className={styles.errorBanner} role="alert">
          {error}
        </div>
      )}

      {warnings.length > 0 && (
        <div className={styles.warningPanel}>
          <h2 className={styles.warningTitle}>Dashboard data warnings</h2>
          <ul className={styles.warningList}>
            {warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.quickActions}>
        <Link to="/admin/orphans" className={styles.quickBtn}>
          Orphans
        </Link>
        <Link to="/admin/donations" className={styles.quickBtn}>
          Donations
        </Link>
        <Link to="/admin/help-requests" className={styles.quickBtn}>
          Help Requests
        </Link>
      </div>

      <div className={styles.statsGrid}>
        <DashboardCard
          icon="O"
          label="Total orphans"
          value={counts.orphans}
          trend={`${counts.sponsoredOrphans} sponsored`}
          trendDirection="up"
          accentColor="#4f8ef7"
          bgColor="#eef4ff"
        />
        <DashboardCard
          icon="S"
          label="Active sponsors"
          value={counts.sponsors}
          accentColor="#8b5cf6"
          bgColor="#f3f0ff"
        />
        <DashboardCard
          icon="D"
          label="Total donations"
          value={`${totalDonations.toLocaleString()} SAR`}
          trend={`${counts.donations} donations`}
          trendDirection="up"
          accentColor="#059669"
          bgColor="#ecfdf5"
        />
        <DashboardCard
          icon="H"
          label="Pending requests"
          value={counts.pendingHelpRequests}
          trend={`${counts.helpRequests} total`}
          trendDirection={counts.pendingHelpRequests > 2 ? "down" : "up"}
          accentColor="#ef4444"
          bgColor="#fef2f2"
        />
        <DashboardCard
          icon="%"
          label="Sponsorship rate"
          value={`${sponsorshipRate}%`}
          accentColor="#4f8ef7"
          bgColor="#eef4ff"
        />
      </div>

      <h2 className={styles.sectionTitle}>Recent Activity</h2>
      <div className={styles.recentGrid}>
        <div className={styles.recentCard}>
          <div className={styles.recentHeader}>
            <h3 className={styles.recentTitle}>Recent orphans</h3>
            <Link to="/admin/orphans" className={styles.viewAll}>
              View all
            </Link>
          </div>
          {recentOrphans.length === 0 ? (
            <p className={styles.emptyState}>No recent orphans available.</p>
          ) : (
            <ul className={styles.recentList}>
              {recentOrphans.map((orphan, index) => (
                <li key={orphan.id || orphan.OrphanID || index} className={styles.recentItem}>
                  <div
                    className={styles.recentIcon}
                    style={{ background: "#eef4ff" }}
                  >
                    O
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
            <h3 className={styles.recentTitle}>Recent donations</h3>
            <Link to="/admin/donations" className={styles.viewAll}>
              View all
            </Link>
          </div>
          {recentDonations.length === 0 ? (
            <p className={styles.emptyState}>No recent donations available.</p>
          ) : (
            <ul className={styles.recentList}>
              {recentDonations.map((donation, index) => (
                <li key={donation.id || index} className={styles.recentItem}>
                  <div
                    className={styles.recentIcon}
                    style={{ background: "#ecfdf5" }}
                  >
                    D
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
