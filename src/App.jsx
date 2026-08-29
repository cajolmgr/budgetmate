import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import BudgetsGoalPlanner from "./components/BudgetsGoalPlanner";
import Income from "./pages/Income";
import AddIncome from "./pages/AddIncome";

import Login from "./pages/login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import "./App.css";


function App() {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const [activePage, setActivePage] = useState("Dashboard");


  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };


  return (
    <BrowserRouter>

      <Routes>

        {/* PROFILE */}

        <Route path="/profile" element={<Profile />} />

        {/* LOGIN */}

        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login
                onLoginSuccess={handleLoginSuccess}
              />
            )
          }
        />


        {/* REGISTER */}

        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Register />
            )
          }
        />


        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={
            user ? (
              <div className="app-layout">

                <Sidebar
                  activePage={activePage}
                  onNavigate={setActivePage}
                  onLogout={handleLogout}
                />

                <main className="main-content">

                  {activePage === "Profile" && (
                    <Profile onLogout={handleLogout} />
                  )}

                  {activePage === "Dashboard" && (
                    <Dashboard />
                  )}

                  {activePage === "Expenses" && (
                    <AddExpense />
                  )}

                  {activePage === "Budgets" && (
                    <BudgetsGoalPlanner />
                  )}

                  {activePage === "Income" && (
                    <Income
                      onNavigate={setActivePage}
                    />
                  )}

                  {activePage === "Add Income" && (
                    <AddIncome
                      onNavigate={setActivePage}
                    />
                  )}

                </main>

              </div>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />


        {/* DEFAULT */}

        <Route
          path="/"
          element={
            <Navigate
              to={user ? "/dashboard" : "/login"}
              replace
            />
          }
        />


        {/* UNKNOWN URL */}

        <Route
          path="*"
          element={
            <Navigate
              to={user ? "/dashboard" : "/login"}
              replace
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;