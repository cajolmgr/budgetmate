import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import "./App.css";

export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="main-content">
        {activePage === "Dashboard" && <Dashboard />}
        {activePage !== "Dashboard" && (
          <div className="placeholder-page">
            <h2>{activePage}</h2>
            <AddExpense/>
          </div>
        )}
      </main>
    </div>
  );
}
