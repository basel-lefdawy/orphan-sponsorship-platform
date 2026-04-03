import styles from "./DashboardCard.module.css";

export default function DashboardCard({
  icon,
  label,
  value,
  trend,
  trendDirection = "up",
  accentColor = "#4f8ef7",
  bgColor = "#eef4ff",
}) {
  return (
    <div
      className={styles.card}
      style={{
        "--card-accent": accentColor,
        "--card-bg": bgColor,
      }}
    >
      <div className={styles.iconWrap}>{icon}</div>
      <div className={styles.content}>
        <p className={styles.label}>{label}</p>
        <p className={styles.value}>{value}</p>
        {trend && (
          <span
            className={`${styles.trend} ${
              trendDirection === "up" ? styles.trendUp : styles.trendDown
            }`}
          >
            {trendDirection === "up" ? "↑" : "↓"} {trend}
          </span>
        )}
      </div>
    </div>
  );
}
