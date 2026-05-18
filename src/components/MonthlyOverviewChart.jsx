import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", Income: 70000, Expenses: 42000, Savings: 21000 },
  { month: "Mar", Income: 82000, Expenses: 45000, Savings: 24000 },
  { month: "Apr", Income: 68000, Expenses: 38000, Savings: 26000 },
  { month: "May", Income: 80000, Expenses: 47000, Savings: 28000 },
  { month: "Jun", Income: 75000, Expenses: 46000, Savings: 30000 },
];

const formatY = (value) => `${(value / 1000).toFixed(0)}k`;

export default function MonthlyOverviewChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <ComposedChart data={data} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#888" }} axisLine={false} tickLine={false} />
        <YAxis tickFormatter={formatY} tick={{ fontSize: 11, fill: "#aaa" }} axisLine={false} tickLine={false} />
        <Tooltip
          formatter={(value) => `NPR ${value.toLocaleString()}`}
          contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,0.1)", fontSize: 13 }}
        />
        <Legend
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
        />
        <Bar dataKey="Income" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={22} />
        <Bar dataKey="Expenses" fill="#e02316" radius={[4, 4, 0, 0]} maxBarSize={22} />
        <Line
          type="monotone"
          dataKey="Savings"
          stroke="#818cf8"
          strokeWidth={2}
          dot={{ r: 3, fill: "#818cf8" }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
