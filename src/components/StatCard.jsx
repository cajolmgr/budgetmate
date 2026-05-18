import "./StatCard.css";

export default function StatCard({ label, value, change, changeDir, color, icon }) {
  const isUp = changeDir === "up";
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className={`stat-icon ${color}`}>{icon}</span>
        <span className="stat-label">{label}</span>
      </div>
      <div className={`stat-value ${color}`}>{value}</div>
      <div className={`stat-change ${isUp ? "up" : "down"}`}>
        <span>{isUp ? "↑" : "↓"}</span>
        <span>{change} vs last month</span>
      </div>
    </div>
  );
}
