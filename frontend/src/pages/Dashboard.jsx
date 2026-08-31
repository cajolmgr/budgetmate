import StatCard from "../components/StatCard";
import MonthlyOverviewChart from "../components/MonthlyOverviewChart";
import ExpensePieChart from "../components/ExpensePieChart";
import RecentTransactions from "../components/RecentTransactions";
import Navbar from "../components/Navbar";
import "./Dashboard.css";

const stats = [
  { label: "Total Balance",      value: "NPR 45,750",  change: "12%", changeDir: "up",   color: "green", icon: "$" },
  { label: "Total Income",       value: "NPR 85,000",  change: "8%",  changeDir: "up",   color: "blue",  icon: "" },
  { label: "Total Expenses",     value: "NPR 39,250",  change: "5%",  changeDir: "down", color: "red",   icon: "" },
  { label: "Savings This Month", value: "NPR 15,750",  change: "18%", changeDir: "up",   color: "green", icon: "" },
];

export default function Dashboard() {
  return (
    <div className="dashboard">
      {/* Header */}
       <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        {/*<div className="header-right">
          <button className="notif-btn" title="Notifications">🔔</button>
          <div className="user-info">
            <span className="user-name">Anxa</span>
            <div className="user-avatar">AA</div>
          </div>
        </div>*/}
      </div> 
      <Navbar/>

      {/* Stat Cards */}
      <div className="stats-grid">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Charts row */}
      <div className="charts-row">
        <div className="card chart-card">
          <h3 className="card-title">Monthly Overview</h3>
          <MonthlyOverviewChart />
        </div>
        <div className="card chart-card">
          <h3 className="card-title">Expense by Category</h3>
          <ExpensePieChart />
        </div>
      </div>

      {/* Bottom row */}
      <div className="bottom-row">
        <div className="card transactions-card">
          <h3 className="card-title">Recent Transactions</h3>
          <RecentTransactions />
        </div>
        <div className="card ai-card">
          <div className="ai-header">
            <span className="ai-badge"> AI Insight</span>
          </div>
          <div className="ai-body">
            {/* <div className="ai-avatar">🤖</div> */}
            <p className="ai-text">
              You spent <strong>15% more on Food</strong> compared to last month.
              Try to reduce it by <strong>NPR 1,000</strong>.
            </p>
          </div>
          <div className="ai-body">
            {/* <div className="ai-avatar">🤖</div> */}
            <p className="ai-text">
              Your <strong>savings rate is 18.5%</strong> — great progress toward your goals!
            </p>
          </div>
          <div className="ai-body">
            {/* <div className="ai-avatar">🤖</div> */}
            <p className="ai-text">
              Transport expenses dropped <strong>8% this month</strong>. Keep it up!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
