import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import BudgetsGoalPlanner from "./components/BudgetsGoalPlanner";
import Income from "./pages/Income";
import AddIncome from "./pages/AddIncome";
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
        
        {/* Budgets-> label of sidebar, BudgetGoalPlanner->Component(file name) */}
        {activePage === "Budgets" && <BudgetsGoalPlanner />} 
        {activePage === "Income" && (
          <Income onNavigate={setActivePage} />
        )}

        {activePage === "Add Income" && (
          <AddIncome onNavigate={setActivePage} />
        )}
        {/* 

        {activePage === "Budgets" && <Budgets />}

        {activePage === "Goals" && <Goals />} */}

      </main>
    </div>
  );
}