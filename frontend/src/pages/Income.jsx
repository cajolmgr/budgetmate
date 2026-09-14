import { useEffect, useMemo, useState } from "react";
import Navbar from '../components/Navbar';
import {
  FaBriefcase,
  FaLaptopCode,
  FaStore,
  FaChartLine,
  FaGift,
  FaMoneyBillWave,
} from "react-icons/fa";


const COLORS = {
  salary: { bg: "#E1F5EE", text: "#0F6E56", dot: "#1D9E75" },
  freelance: { bg: "#E6F1FB", text: "#185FA5", dot: "#378ADD" },
  business: { bg: "#FAEEDA", text: "#854F0B", dot: "#EF9F27" },
  investment: { bg: "#EEEDFE", text: "#534AB7", dot: "#7F77DD" },
  other: { bg: "#FCEBEB", text: "#A32D2D", dot: "#E24B4A" },
};


const INCOME_SOURCES = ["Salary", "Freelance", "Business", "Investment", "Other"];
const PAYMENT_METHODS = ["Cash", "eSewa", "Khalti", "Bank Transfer"]; 


const BAR_DATA = [
  { month: "Jan", value: 48000 },
  { month: "Feb", value: 55000 },
  { month: "Mar", value: 62000 },
  { month: "Apr", value: 44000 },
  { month: "May", value: 70000 },
  { month: "Jun", value: 85000 },
];

const DONUT_SEGMENTS = [
  { label: "Salary", pct: 71, color: "#1D9E75", offset: 0 },
  { label: "Freelance", pct: 14, color: "#378ADD", offset: 71 },
  { label: "Business", pct: 7, color: "#EF9F27", offset: 85 },
  { label: "Investment", pct: 5, color: "#7F77DD", offset: 92 },
  { label: "Other", pct: 3, color: "#E24B4A", offset: 97 },
];

const CIRCUMFERENCE = 2 * Math.PI * 44; // r=44

function SourceBadge({ source }) {
  const key = source.toLowerCase().replace(/\s+/g, "");
  const style = COLORS[key] || COLORS.other;
  const icons = {
    salary: <FaBriefcase size={14} />,
    freelance: <FaLaptopCode size={14} />,
    business: <FaStore size={14} />,
    investment: <FaChartLine size={14} />,
    other: <FaGift size={14} />,  
  };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        background: style.bg,
        color: style.text,
        fontSize: 13,
        fontWeight: 500,
        padding: "8px 14px",
        borderRadius: 20,
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icons[key] || <FaMoneyBillWave size={14} />}
  </span>

  <span>{source}</span>
</span>
  );
}

function StatCard({ icon, iconBg, iconColor, label, value, sub, subIcon }) {
  return (
    <div style={{
      background: "#fff", border: "0.5px solid #e5e7eb",
      borderRadius: 12, padding: "16px", display: "flex",
      alignItems: "center", gap: 14,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: "50%",
        background: iconBg, color: iconColor,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 20, flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 4 }}>{label}</div>
        <div style={{ fontSize: 19, fontWeight: 600, color: "#111827" }}>{value}</div>
        {sub && (
          <div style={{ fontSize: 12, color: subIcon === "up" ? "#059669" : "#6b7280", marginTop: 3, display: "flex", alignItems: "center", gap: 3 }}>
            {subIcon === "up" && <span>↑</span>} {sub}
          </div>
        )}
      </div>
    </div>
  );
}

function BarChart({ data }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const step = max / 5;
  const yLabels = [5, 4, 3, 2, 1, 0].map((n) => Math.round((step * n) / 1000));
  console.log("BarChart max:", max, "yLabels:", yLabels);
  
  return (
    <div>
      <div style={{ display: "flex", gap: 4 }}>
        <div style={{
          display: "flex", flexDirection: "column",
          justifyContent: "space-between", fontSize: 10,
          color: "#9ca3af", height: 140, paddingBottom: 22,
          marginRight: 4, textAlign: "right", minWidth: 28,
        }}>
          {yLabels.map((l) => <span key={l}>{l}k</span>)}
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, flex: 1, height: 140 }}>
          {data.map((d) => (
            <div key={d.month} style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", flex: 1, height: "100%",
              justifyContent: "flex-end", gap: 6,
            }}>
              <div
                title={`${d.month}: NPR ${d.value.toLocaleString()}`}
                style={{
                  background: "#1D9E75",
                  borderRadius: "4px 4px 0 0",
                  width: "100%",
                  height: `${(d.value / max) * 118}px`,
                  cursor: "pointer", transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.75)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
              />
              <span style={{ fontSize: 11, color: "#9ca3af" }}>{d.month}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: 12, color: "#9ca3af" }}>
        <span style={{ display: "inline-block", width: 14, height: 8, background: "#1D9E75", borderRadius: 2 }} />
        Income (NPR)
      </div>
    </div>
  );
}

function DonutChart({ segments }) {
  return (
    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
      <svg width={120} height={120} viewBox="0 0 120 120" style={{ flexShrink: 0 }}>
        {segments.map((seg) => (
          <circle
            key={seg.label}
            cx={60} cy={60} r={44}
            fill="none"
            stroke={seg.color}
            strokeWidth={20}
            strokeDasharray={`${(seg.pct / 100) * CIRCUMFERENCE} ${CIRCUMFERENCE}`}
            strokeDashoffset={-(seg.offset / 100) * CIRCUMFERENCE}
            transform="rotate(-90 60 60)"
          />
        ))}
        <circle cx={60} cy={60} r={30} fill="#fff" />
      </svg>
      <div style={{ flex: 1 }}>
        {segments.map((seg) => (
          <div key={seg.label} style={{
            display: "flex", alignItems: "center", gap: 8,
            marginBottom: 8, fontSize: 13, color: "#111827",
          }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: seg.color, flexShrink: 0 }} />
            {seg.label}
            <span style={{ marginLeft: "auto", color: "#6b7280", fontSize: 12 }}>{seg.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const PAGE_SIZE = 5;

export default function Income({ onNavigate }) {
  
  const [search, setSearch] = useState("");
  const [sourceFilter, setSourceFilter] = useState("All Sources");
  const [monthFilter, setMonthFilter] = useState("This Month");
  const [page, setPage] = useState(1);
  const [chartRange, setChartRange] = useState("Last 6 Months");

  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
  fetchIncome();
  }, []);

 const fetchIncome = async () => {
  try {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      console.error("No logged-in user");
      return;
    }

    const user = JSON.parse(storedUser);

    if (!user.id) {
      console.error("User ID not found");
      return;
    }

    const response = await fetch(
      `/api/income/${user.id}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch income");
    }

    const data = await response.json();

    const formatted = data.map((item) => ({
      id: item.id,
      date: new Date(item.income_date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      rawDate: item.income_date, 
      source: item.source,
      note: item.note,
      amount: item.amount,
      method: item.payment_method,
    }));

    setTransactions(formatted);

  } catch (err) {
    console.error("Error fetching income:", err);
  }
};

  const monthlyTotals = useMemo(() => {
  const map = new Map(); // "YYYY-MM" -> total amount

  transactions.forEach((t) => {
    const d = new Date(t.rawDate);
    if (isNaN(d)) return;
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    map.set(key, (map.get(key) || 0) + Number(t.amount || 0));
  });

  return map;
}, [transactions]);

const stats = useMemo(() => {
  const now = new Date();
  const thisMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthKey = `${lastMonthDate.getFullYear()}-${String(lastMonthDate.getMonth() + 1).padStart(2, "0")}`;

  const totalIncome = transactions.reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const thisMonthTotal = monthlyTotals.get(thisMonthKey) || 0;
  const lastMonthTotal = monthlyTotals.get(lastMonthKey) || 0;

  const thisMonthChangePct =
    lastMonthTotal > 0
      ? Math.round(((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100)
      : null;

  const sourceTotals = new Map();
  transactions.forEach((t) => {
    sourceTotals.set(t.source, (sourceTotals.get(t.source) || 0) + Number(t.amount || 0));
  });

  let highestSource = null;
  let highestSourceAmount = 0;
  sourceTotals.forEach((amount, source) => {
    if (amount > highestSourceAmount) {
      highestSourceAmount = amount;
      highestSource = source;
    }
  });

  const highestSourcePct =
    totalIncome > 0 ? Math.round((highestSourceAmount / totalIncome) * 100) : 0;

  const monthsWithData = monthlyTotals.size;
  const avgMonthlyIncome = monthsWithData > 0 ? totalIncome / monthsWithData : 0;

  return {
    totalIncome,
    thisMonthTotal,
    thisMonthChangePct,
    highestSource,
    highestSourceAmount,
    highestSourcePct,
    avgMonthlyIncome,
    sourceTotals,
  };
}, [transactions, monthlyTotals]);

const trendData = useMemo(() => {                                    // 👈 ADD HERE (Step 4)
  const now = new Date();
  let monthsBack = 6;
  if (chartRange === "Last 3 Months") monthsBack = 3;
  if (chartRange === "This Year") monthsBack = now.getMonth() + 1;

  const result = [];
  for (let i = monthsBack - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    result.push({
      month: d.toLocaleDateString("en-US", { month: "short" }),
      value: monthlyTotals.get(key) || 0,
    });
  }
  return result;
}, [monthlyTotals, chartRange]);

  const filtered = transactions.filter((t) => {
    const matchSource = sourceFilter === "All Sources" || t.source === sourceFilter;
    const matchSearch =
      (t.note || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.source || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.method || "").toLowerCase().includes(search.toLowerCase());
    return matchSource && matchSearch;
  });


  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleDelete = (id) => {
    alert(`Delete transaction #${id}? (demo only)`);
  };
  const handleEdit = (id) => {
    alert(`Edit transaction #${id}? (demo only)`);
  };

  const inputStyle = {
    border: "0.5px solid #d1d5db", borderRadius: 6,
    padding: "6px 10px", fontSize: 13, color: "#111827",
    background: "#fff", outline: "none",
  };

  return (
    <div style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#f9fafb", minHeight: "100vh" }}>
      {/* Top Bar */}
      <div style={{
        background: "#fff", borderBottom: "0.5px solid #e5e7eb",
        padding: "14px 24px", display: "flex",
        alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 10,
      }}>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 600, color: "#111827", margin: 0 }}>Income</h1>
          <p style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>Track and manage all your income sources</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ position: "relative", cursor: "pointer", fontSize: 20, color: "#6b7280" }}>
            
            {/* <span style={{
              position: "absolute", top: -2, right: -2,
              width: 8, height: 8, background: "#E24B4A",
              borderRadius: "50%", display: "block",
            }} /> */}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 500, color: "#111827" }}>
            {/* <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "#5DCAA5", display: "flex",
              alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 600, color: "#085041",
            }}>
              
            </div> */}
            <Navbar/>
          </div>
          <button
            type="button"
            style={{
              background: "#534AB7", color: "#fff", border: "none",
              borderRadius: 8, padding: "8px 14px", fontSize: 13,
              fontWeight: 500, cursor: "pointer", display: "flex",
              alignItems: "center", gap: 6,
            }}
            onClick={() => onNavigate("Add Income")}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#3C3489")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#534AB7")}
          >
            + Add Income
          </button>

        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px 24px" }}>

        {/* Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 20 }}>
          <StatCard
            icon="💼" iconBg="#E1F5EE" iconColor="#0F6E56"
            label="Total Income"
            value={`NPR ${stats.totalIncome.toLocaleString()}`}
            sub={transactions.length > 0 ? `${transactions.length} transactions` : undefined}
          />
          <StatCard
            icon="📅" iconBg="#E6F1FB" iconColor="#185FA5"
            label="This Month"
            value={`NPR ${stats.thisMonthTotal.toLocaleString()}`}
            sub={stats.thisMonthChangePct !== null ? `${Math.abs(stats.thisMonthChangePct)}% vs last month` : "No data last month"}
            subIcon={stats.thisMonthChangePct !== null && stats.thisMonthChangePct >= 0 ? "up" : undefined}
          />
          <StatCard
            icon="🏆" iconBg="#FAEEDA" iconColor="#854F0B"
            label="Highest Source"
            value={stats.highestSource || "—"}
            sub={stats.highestSource ? `NPR ${stats.highestSourceAmount.toLocaleString()} (${stats.highestSourcePct}%)` : undefined}
          />
          <StatCard
            icon="📈" iconBg="#EEEDFE" iconColor="#534AB7"
            label="Avg Monthly Income"
            value={`NPR ${Math.round(stats.avgMonthlyIncome).toLocaleString()}`}
          />
        </div>

        {/* Charts Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginBottom: 20 }}>
          <div style={{ background: "#fff", border: "0.5px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>Income Trend</span>
              <select
                value={chartRange}
                onChange={(e) => setChartRange(e.target.value)}
                style={{ ...inputStyle, padding: "4px 8px", fontSize: 12 }}
              >
                <option>Last 6 Months</option>
                <option>Last 3 Months</option>
                <option>This Year</option>
              </select>
            </div>
            <BarChart data={trendData} />
          </div>

          <div style={{ background: "#fff", border: "0.5px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>Income by Source</span>
            </div>
            <DonutChart segments={DONUT_SEGMENTS} />
          </div>
        </div>

        {/* Transactions Table */}
        <div style={{ background: "#fff", border: "0.5px solid #e5e7eb", borderRadius: 12, padding: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: "#111827" }}>Recent Income Transactions</span>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", fontSize: 15, color: "#9ca3af", pointerEvents: "none" }}>🔍</span>
                <input
                  type="text"
                  placeholder="Search income..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  style={{ ...inputStyle, paddingLeft: 30, width: 160 }}
                />
              </div>
              <select
                value={sourceFilter}
                onChange={(e) => { setSourceFilter(e.target.value); setPage(1); }}
                style={inputStyle}
              >
                {["All Sources", "Salary", "Freelance", "Business", "Investment", "Other"].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <select
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
                style={inputStyle}
              >
                {["This Month", "Last Month", "Last 3 Months"].map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Date", "Source", "Note", "Amount", "Payment Method", "Actions"].map((h) => (
                    <th key={h} style={{
                      fontSize: 12, fontWeight: 500, color: "#6b7280",
                      textAlign: "left", padding: "8px 12px",
                      borderBottom: "0.5px solid #e5e7eb",
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paged.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center", padding: 24, color: "#9ca3af", fontSize: 14 }}>
                      No transactions found.
                    </td>
                  </tr>
                ) : (
                  paged.map((t) => (
                    <tr
                      key={t.id}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ fontSize: 13, color: "#111827", padding: "11px 12px", borderBottom: "0.5px solid #f3f4f6" }}>{t.date}</td>
                      <td style={{ padding: "11px 12px", borderBottom: "0.5px solid #f3f4f6" }}><SourceBadge source={t.source} /></td>
                      <td style={{ fontSize: 13, color: "#6b7280", padding: "11px 12px", borderBottom: "0.5px solid #f3f4f6" }}>{t.note}</td>
                      <td style={{ fontSize: 13, fontWeight: 600, color: "#059669", padding: "11px 12px", borderBottom: "0.5px solid #f3f4f6" }}>
                        + NPR {t.amount.toLocaleString()}
                      </td>
                      <td style={{ fontSize: 13, color: "#6b7280", padding: "11px 12px", borderBottom: "0.5px solid #f3f4f6" }}>{t.method}</td>
                      <td style={{ padding: "11px 12px", borderBottom: "0.5px solid #f3f4f6" }}>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button
                            title="Edit"
                            onClick={() => handleEdit(t.id)}
                            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#185FA5", padding: "2px 4px", borderRadius: 4 }}
                          >✏️</button>
                          <button
                            title="Delete"
                            onClick={() => handleDelete(t.id)}
                            style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#E24B4A", padding: "2px 4px", borderRadius: 4 }}
                          >🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 14, flexWrap: "wrap", gap: 10 }}>
            <span style={{ fontSize: 13, color: "#6b7280" }}>
              Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1} to {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} entries
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{
                    width: 30, height: 30, borderRadius: 6,
                    border: "0.5px solid #d1d5db", background: "#fff",
                    cursor: page === 1 ? "not-allowed" : "pointer",
                    fontSize: 13, color: "#6b7280", opacity: page === 1 ? 0.4 : 1,
                  }}
                >‹</button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    style={{
                      width: 30, height: 30, borderRadius: 6,
                      border: "0.5px solid #d1d5db",
                      background: page === n ? "#534AB7" : "#fff",
                      color: page === n ? "#fff" : "#6b7280",
                      cursor: "pointer", fontSize: 13,
                      fontWeight: page === n ? 600 : 400,
                    }}
                  >{n}</button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages || totalPages === 0}
                  style={{
                    width: 30, height: 30, borderRadius: 6,
                    border: "0.5px solid #d1d5db", background: "#fff",
                    cursor: page === totalPages || totalPages === 0 ? "not-allowed" : "pointer",
                    fontSize: 13, color: "#6b7280",
                    opacity: page === totalPages || totalPages === 0 ? 0.4 : 1,
                  }}
                >›</button>
              </div>
              <button style={{
                background: "#534AB7", color: "#fff", border: "none",
                borderRadius: 6, padding: "6px 14px", fontSize: 13,
                fontWeight: 500, cursor: "pointer", display: "flex",
                alignItems: "center", gap: 6,
              }}>
                ⬇ Export
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
