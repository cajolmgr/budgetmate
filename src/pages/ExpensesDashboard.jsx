import React, { useState } from "react";
import {
  Bell,
  Plus,
  Wallet,
  Calendar,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Download,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  UtensilsCrossed,
  Bus,
  ShoppingBag,
  Receipt,
  Film,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const summaryCards = [
  {
    label: "Total Expenses",
    value: "NPR 39,250",
    delta: "5% vs last month",
    deltaDirection: "down",
    icon: Wallet,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-500",
  },
  {
    label: "This Month",
    value: "NPR 12,450",
    delta: "8% vs last month",
    deltaDirection: "down",
    icon: Calendar,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    valueColor: "text-blue-600",
  },
  {
    label: "Highest Category",
    value: "Food",
    delta: "NPR 11,800 (30%)",
    deltaDirection: null,
    icon: TrendingUp,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
  },
  {
    label: "Avg Monthly Expense",
    value: "NPR 18,200",
    delta: "6% vs last 3 months",
    deltaDirection: "up",
    icon: TrendingUp,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
    valueColor: "text-emerald-600",
  },
];

const trendData = [
  { month: "Jan", value: 28000 },
  { month: "Feb", value: 22000 },
  { month: "Mar", value: 38000 },
  { month: "Apr", value: 24500 },
  { month: "May", value: 32000 },
  { month: "Jun", value: 39250 },
];

const categoryData = [
  { name: "Food", value: 30, color: "#6E5BDE" },
  { name: "Transport", value: 20, color: "#4C7DF0" },
  { name: "Shopping", value: 15, color: "#F2B632" },
  { name: "Bills", value: 15, color: "#3FB87F" },
  { name: "Entertainment", value: 10, color: "#9D6BD8" },
  { name: "Others", value: 10, color: "#A9ADB8" },
];

const transactions = [
  {
    date: "May 24, 2024",
    category: "Food",
    description: "Lunch at Newari Restaurant",
    amount: "- NPR 850",
    payment: "eSewa",
    icon: UtensilsCrossed,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-500",
  },
  {
    date: "May 23, 2024",
    category: "Transport",
    description: "Bus Fare",
    amount: "- NPR 120",
    payment: "Cash",
    icon: Bus,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    date: "May 22, 2024",
    category: "Shopping",
    description: "Groceries",
    amount: "- NPR 1,250",
    payment: "Bank Transfer",
    icon: ShoppingBag,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
  },
  {
    date: "May 21, 2024",
    category: "Bills",
    description: "Electricity Bill",
    amount: "- NPR 2,500",
    payment: "Bank Transfer",
    icon: Receipt,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
  },
  {
    date: "May 20, 2024",
    category: "Entertainment",
    description: "Movie Ticket",
    amount: "- NPR 600",
    payment: "eSewa",
    icon: Film,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-500",
  },
];

function SummaryCard({ card }) {
  const Icon = card.icon;
  const DeltaIcon = card.deltaDirection === "up" ? TrendingUp : TrendingDown;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4">
      <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${card.iconBg}`}>
        <Icon className={`w-5 h-5 ${card.iconColor}`} />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-gray-500">{card.label}</p>
        <p className={`text-xl font-semibold mt-1 ${card.valueColor || "text-gray-900"}`}>
          {card.value}
        </p>
        {card.delta && (
          <div className="flex items-center gap-1 mt-1 text-xs">
            {card.deltaDirection && (
              <DeltaIcon
                className={`w-3.5 h-3.5 ${
                  card.deltaDirection === "up" ? "text-emerald-500" : "text-rose-500"
                }`}
              />
            )}
            <span
              className={
                card.deltaDirection === "up"
                  ? "text-emerald-500"
                  : card.deltaDirection === "down"
                  ? "text-rose-500"
                  : "text-gray-500"
              }
            >
              {card.delta}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function TrendChart() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Expense Trend</h3>
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 focus:outline-none">
          <option>Last 6 Months</option>
          <option>Last 12 Months</option>
        </select>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span className="w-3 h-3 rounded-sm bg-rose-400 inline-block" />
        <span className="text-xs text-gray-500">Expenses (NPR)</span>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={trendData} barCategoryGap="35%">
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9CA3AF" }}
              tickFormatter={(v) => `${v / 1000}k`}
            />
            <Tooltip
              formatter={(value) => [`NPR ${value.toLocaleString()}`, "Expenses"]}
              cursor={{ fill: "rgba(0,0,0,0.03)" }}
            />
            <Bar dataKey="value" fill="#EF6E6E" radius={[4, 4, 0, 0]} maxBarSize={48} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function CategoryChart() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <h3 className="font-semibold text-gray-900 mb-4">Expense by Category</h3>
      <div className="flex items-center gap-6">
        <div className="w-44 h-44 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                innerRadius={48}
                outerRadius={78}
                paddingAngle={2}
                stroke="none"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="flex-1 space-y-2.5">
          {categoryData.map((cat) => (
            <li key={cat.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-gray-700">{cat.name}</span>
              </div>
              <span className="text-gray-500">{cat.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TransactionsTable() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h3 className="font-semibold text-gray-900">Recent Expense Transactions</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search expense..."
              className="pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300 w-44"
            />
          </div>
          <button className="flex items-center gap-1.5 text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600">
            <Filter className="w-3.5 h-3.5" />
            All Categories
          </button>
          <button className="flex items-center gap-1.5 text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600">
            <Calendar className="w-3.5 h-3.5" />
            This Month
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100">
              <th className="py-2.5 pr-4 font-medium">Date</th>
              <th className="py-2.5 pr-4 font-medium">Category</th>
              <th className="py-2.5 pr-4 font-medium">Description</th>
              <th className="py-2.5 pr-4 font-medium">Amount</th>
              <th className="py-2.5 pr-4 font-medium">Payment Method</th>
              <th className="py-2.5 pr-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, i) => {
              const Icon = tx.icon;
              return (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-3 pr-4 text-gray-600 whitespace-nowrap">{tx.date}</td>
                  <td className="py-3 pr-4">
                    <span className="flex items-center gap-2">
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center ${tx.iconBg}`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${tx.iconColor}`} />
                      </span>
                      <span className="text-gray-700">{tx.category}</span>
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-gray-600 whitespace-nowrap">{tx.description}</td>
                  <td className="py-3 pr-4 text-rose-500 font-medium whitespace-nowrap">
                    {tx.amount}
                  </td>
                  <td className="py-3 pr-4 text-gray-600 whitespace-nowrap">{tx.payment}</td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <button className="text-gray-400 hover:text-indigo-500" aria-label="Edit">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-rose-500" aria-label="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
        <p className="text-sm text-gray-500">Showing 1 to 5 of 20 entries</p>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400">
            <ChevronLeft className="w-4 h-4" />
          </button>
          {[1, 2, 3, 4].map((p) => (
            <button
              key={p}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm ${
                p === 1
                  ? "bg-indigo-600 text-white"
                  : "border border-gray-200 text-gray-600"
              }`}
            >
              {p}
            </button>
          ))}
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <button className="flex items-center gap-1.5 text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600">
          <Download className="w-3.5 h-3.5" />
          Export
        </button>
      </div>
    </div>
  );
}

export default function ExpensesDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
            <p className="text-gray-500 text-sm mt-1">Track and manage all your expenses</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 text-gray-500">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-rose-500" />
            </button>
            <div className="flex items-center gap-2">
              <img
                src="https://i.pravatar.cc/40?img=12"
                alt="Rahul Sharma"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm font-medium text-gray-700">Rahul Sharma</span>
            </div>
          </div>
        </div>

        {/* Add expense button */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors">
            <Plus className="w-4 h-4" />
            Add Expense
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((card) => (
            <SummaryCard key={card.label} card={card} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrendChart />
          <CategoryChart />
        </div>

        {/* Transactions */}
        <TransactionsTable />
      </div>
    </div>
  );
}
