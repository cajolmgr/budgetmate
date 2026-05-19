import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
// import Income from "./pages/Income";
// import Budgets from "./pages/Budgets";
// import Goals from "./pages/Goals";

import "./App.css";

export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <main className="main-content">

        {activePage === "Dashboard" && <Dashboard />}

        {activePage === "Expenses" && <AddExpense />}

        {/* {activePage === "Income" && <Income />}

        {activePage === "Budgets" && <Budgets />}

        {activePage === "Goals" && <Goals />} */}

      </main>
    </div>
  );
}