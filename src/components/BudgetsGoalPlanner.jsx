import { useState } from "react";

const budgets = [
  { category: "Food", budget: 12000, spent: 9000 },
  { category: "Transport", budget: 6000, spent: 4800 },
  { category: "Shopping", budget: 8000, spent: 8500 },
  { category: "Bills", budget: 8000, spent: 6200 },
  { category: "Entertainment", budget: 4000, spent: 4200 },
];

const goals = [
  {
    name: "Buy Laptop",
    target: 90000,
    saved: 56700,
    deadline: "Jun 30, 2024",
    daysLeft: 60,
    color: "#6C63FF",
  },
  {
    name: "Vacation Trip",
    target: 50000,
    saved: 16000,
    deadline: "Aug 15, 2024",
    daysLeft: 106,
    color: "#00C896",
  },
];

function formatNPR(amount) {
  return `NPR ${amount.toLocaleString()}`;
}

function getStatus(budget, spent) {
  const remaining = budget - spent;
  if (remaining >= 0) return { label: "On Track", color: "#00C896", bg: "#E6FFF8" };
  return { label: "Over Budget", color: "#FF4D4D", bg: "#FFF0F0" };
}

function BudgetRow({ category, budget, spent }) {
  const remaining = budget - spent;
  const status = getStatus(budget, spent);
  return (
    <tr style={{ borderBottom: "1px solid #F0EEFF" }}>
      <td style={td}>{category}</td>
      <td style={td}>{formatNPR(budget)}</td>
      <td style={td}>{formatNPR(spent)}</td>
      <td style={{ ...td, color: remaining < 0 ? "#FF4D4D" : "#1A1A2E", fontWeight: remaining < 0 ? 600 : 400 }}>
        {remaining < 0 ? `-NPR ${Math.abs(remaining).toLocaleString()}` : formatNPR(remaining)}
      </td>
      <td style={td}>
        <span style={{
          background: status.bg,
          color: status.color,
          borderRadius: 20,
          padding: "3px 12px",
          fontSize: 12,
          fontWeight: 600,
        }}>
          {status.label}
        </span>
      </td>
    </tr>
  );
}

function GoalCard({ name, target, saved, deadline, daysLeft, color }) {
  const pct = Math.round((saved / target) * 100);
  return (
    <div style={{
      background: "#fff",
      borderRadius: 14,
      border: "1px solid #F0EEFF",
      padding: "18px 20px",
      marginBottom: 14,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#1A1A2E" }}>{name}</div>
          <div style={{ fontSize: 12, color: "#9A94BC", marginTop: 2 }}>Target: NPR {target.toLocaleString()}</div>
        </div>
        <span style={{ fontSize: 13, color: "#9A94BC", fontWeight: 500 }}>{pct}%</span>
      </div>

      {/* Progress bar */}
      <div style={{ margin: "12px 0 6px", background: "#EEE8FF", borderRadius: 8, height: 8 }}>
        <div style={{
          width: `${pct}%`,
          height: 8,
          borderRadius: 8,
          background: color,
          transition: "width 0.6s ease",
        }} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
        <span style={{ color: "#6C63FF", fontWeight: 600 }}>{pct}%</span>
        <div style={{ display: "flex", gap: 20 }}>
          <span style={{ color: "#9A94BC" }}>Deadline: {deadline}</span>
          <span style={{ color: "#9A94BC" }}>Saved {formatNPR(saved)}</span>
          <span style={{ color: "#9A94BC" }}>{daysLeft} days left</span>
        </div>
      </div>
    </div>
  );
}

const td = {
  padding: "12px 10px",
  fontSize: 13,
  color: "#1A1A2E",
};

const thStyle = {
  padding: "10px 10px",
  fontSize: 12,
  fontWeight: 600,
  color: "#9A94BC",
  textAlign: "left",
  background: "#FAFAFE",
};

export default function BudgetsGoalPlanner() {
  const [activeTab, setActiveTab] = useState("budgets");

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Poppins', 'Segoe UI', sans-serif", background: "#F5F3FF" }}>


      {/* Main Content */}
      <div style={{ marginLeft: 20, flex: 1, padding: "32px 36px" }}>


        {/* Tabs */}
        <div style={{ display: "flex", gap: 0, marginBottom: 28, borderBottom: "2px solid #EEE8FF" }}>
          {["budgets", "savings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "8px 24px",
                background: "transparent",
                border: "none",
                borderBottom: activeTab === tab ? "2.5px solid #6C63FF" : "2.5px solid transparent",
                color: activeTab === tab ? "#6C63FF" : "#9A94BC",
                fontWeight: activeTab === tab ? 600 : 400,
                fontSize: 14,
                cursor: "pointer",
                marginBottom: -2,
                transition: "all 0.2s",
              }}
            >
              {tab === "budgets" ? "Budgets" : "Savings Goals"}
            </button>
          ))}
        </div>

        {/* Monthly Budgets Section */}
        <div style={{
          background: "#fff",
          borderRadius: 16,
          border: "1px solid #EEE8FF",
          padding: "20px 22px",
          marginBottom: 28,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1A1A2E", margin: 0 }}>Monthly Budgets</h3>
            <button style={{
              background: "#6C63FF",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}>
              + Add Budget
            </button>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Category", "Budget", "Spent", "Remaining", "Status"].map((h) => (
                    <th key={h} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {budgets.map((b) => <BudgetRow key={b.category} {...b} />)}
              </tbody>
            </table>
          </div>
        </div>

        {/* Savings Goals Section */}
        <div style={{
          background: "#fff",
          borderRadius: 16,
          border: "1px solid #EEE8FF",
          padding: "20px 22px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1A1A2E", margin: 0 }}>Savings Goals</h3>
            <button style={{
              background: "#6C63FF",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}>
              + Add Goal
            </button>
          </div>

          {goals.map((g) => <GoalCard key={g.name} {...g} />)}
        </div>
      </div>
    </div>
  );
}
