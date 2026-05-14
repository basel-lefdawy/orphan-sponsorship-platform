import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable/DataTable";
import { sponsorService } from "../../services/sponsorService";
import styles from "./AdminPage.module.css";

const NOT_AVAILABLE = "غير متوفر";

function getFullName(sponsor) {
  const parts = [
    sponsor.firstName,
    sponsor.fatherName,
    sponsor.grandfatherName,
    sponsor.familyName,
  ].filter(Boolean);

  return parts.length ? parts.join(" ") : NOT_AVAILABLE;
}

function getContactNumber(sponsor) {
  return sponsor.mobile || sponsor.phone || NOT_AVAILABLE;
}

function getMonthlyAmount(sponsor) {
  const amount = sponsor.sponsorships?.[0]?.monthlySAmount;

  if (amount === undefined || amount === null || amount === "") {
    return NOT_AVAILABLE;
  }

  const numericAmount = Number(amount);
  return Number.isNaN(numericAmount) ? String(amount) : numericAmount.toLocaleString();
}

function getStatusLabel(status) {
  if (status === "active") return "نشط";
  if (status === "inactive") return "غير نشط";
  return status || NOT_AVAILABLE;
}

const columns = [
  { key: "id", label: "#" },
  {
    key: "fullName",
    label: "اسم الكفيل",
    render: (_, row) => getFullName(row),
  },
  {
    key: "mobile",
    label: "الهاتف",
    render: (_, row) => getContactNumber(row),
  },
  {
    key: "email",
    label: "البريد",
    render: (value) => value || NOT_AVAILABLE,
  },
  {
    key: "monthlySAmount",
    label: "المبلغ الشهري",
    render: (_, row) => getMonthlyAmount(row),
  },
  {
    key: "status",
    label: "الحالة",
    isStatus: true,
    render: (value) => getStatusLabel(value),
  },
];

const statusMap = {
  active: "green",
  inactive: "red",
};

export default function SponsorsList() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSponsors = async () => {
    try {
      const data = await sponsorService.getAll();
      setSponsors(data);
    } catch (err) {
      console.error(err);
      setSponsors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  if (loading) {
    return (
      <p style={{ color: "#94a3b8", textAlign: "center", paddingTop: 40 }}>
        جاري التحميل...
      </p>
    );
  }

  return (
    <div className={styles.page} id="admin-sponsors-page">
      <DataTable
        title="إدارة الكفالات"
        columns={columns}
        data={sponsors}
        searchPlaceholder="ابحث باسم الكفيل..."
        emptyMessage="لا توجد كفالات"
        statusMap={statusMap}
      />
    </div>
  );
}
