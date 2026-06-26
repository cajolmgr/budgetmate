// import { FaBullseye, FaChartLine, FaCog, FaFileAlt } from "react-icons/fa";
import {
  FaHome,
  FaWallet,
  FaChartPie,
  FaBullseye,
  FaChartLine,
  FaFileAlt,
  FaCog,
} from "react-icons/fa";
import "./Sidebar.css";

const navItems = [
  { label: "Dashboard", icon:<FaHome/>},
  { label: "Expenses", icon: <FaWallet/> },
  { label: "Income", icon:  <FaWallet/> },
  { label: "Budgets", icon:<FaChartPie/> },
  { label: "Goals", icon:<FaBullseye/> },
  { label: "Analytics", icon: <FaChartLine/> },
  { label: "Reports", icon: <FaFileAlt/> },
  { label: "Recommendations", icon: <FaCog/> },
  { label: "Settings", icon: <FaCog/> },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">💼</span>
        <span className="logo-text">BudgetMate</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`nav-item ${activePage === item.label ? "active" : ""}`}
            onClick={() => onNavigate(item.label)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <button className="nav-item logout-btn" onClick={() => alert("Logged out!")}>
        <span className="nav-icon">🚪</span>
        <span className="nav-label">Logout</span>
      </button>
    </aside>
  );
}
