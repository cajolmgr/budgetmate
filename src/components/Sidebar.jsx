import "./Sidebar.css";

const navItems = [
  { label: "Dashboard", icon: "🏠" },
  { label: "Expenses", icon: "💳" },
  { label: "Income", icon: "💰" },
  { label: "Budgets", icon: "📊" },
  { label: "Goals", icon: "🎯" },
  { label: "Analytics", icon: "📈" },
  { label: "Reports", icon: "📄" },
  { label: "Recommendations", icon: "⚙️" },
  { label: "Settings", icon: "🔧" },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">💼</span>
        <span className="logo-text">BudgetWise</span>
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
