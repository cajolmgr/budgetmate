import {
  FaHome,
  FaWallet,
  FaChartPie,
  FaBullseye,
  FaChartLine,
  FaFileAlt,
  FaCog,
  FaUser,
} from "react-icons/fa";

import "./Sidebar.css";

const navItems = [
  { label: "Profile", icon: <FaUser /> },
  { label: "Dashboard", icon: <FaHome /> },
  { label: "Expenses", icon: <FaWallet /> },
  { label: "Income", icon: <FaWallet /> },
  { label: "Budgets", icon: <FaChartPie /> },
  { label: "Goals", icon: <FaBullseye /> },
  { label: "Analytics", icon: <FaChartLine /> },
  { label: "Reports", icon: <FaFileAlt /> },
  { label: "Recommendations", icon: <FaCog /> },
  { label: "Settings", icon: <FaCog /> },
];

export default function Sidebar({ activePage, onNavigate, onLogout }) {
  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <span className="logo-icon">💼</span>
        <span className="logo-text">BudgetMate</span>
      </div>

      {/* Main Navigation */}
      <nav className="sidebar-nav">

        {navItems.map((item) => (
          <button
            key={item.label}
            className={`nav-item ${
              activePage === item.label ? "active" : ""
            }`}
            onClick={() => onNavigate(item.label)}
          >
            <span className="nav-icon">
              {item.icon}
            </span>

            <span className="nav-label">
              {item.label}
            </span>
          </button>
        ))}

      </nav>

      {/* Logout */}
      <button
        className="nav-item logout-btn"
        onClick={onLogout}
      >
        <span className="nav-icon">🚪</span>
        <span className="nav-label">Logout</span>
      </button>

    </aside>
  );
}