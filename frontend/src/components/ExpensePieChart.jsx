import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Food",          value: 30, color: "#4548ee" },
  { name: "Transport",     value: 20, color: "#27a7df" },
  { name: "Shopping",      value: 15, color: "#b4770c" },
  { name: "Bills",         value: 15, color: "#12ca87" },
  { name: "Entertainment", value: 10, color: "#6549b9" },
  { name: "Others",        value: 10, color: "#314c71" },
];

export default function ExpensePieChart() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <ResponsiveContainer width={160} height={160}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={48}
            outerRadius={72}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value}%`} />
        </PieChart>
      </ResponsiveContainer>

      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {data.map((item) => (
          <div key={item.name} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            <span style={{
              width: 10, height: 10, borderRadius: "50%",
              background: item.color, flexShrink: 0
            }} />
            <span style={{ color: "#555", minWidth: 100 }}>{item.name}</span>
            <span style={{ fontWeight: 600, color: "#1e1e2d" }}>{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
