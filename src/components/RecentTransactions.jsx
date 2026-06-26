import "./RecentTransactions.css";
import {
  FaShoppingCart,
  FaBriefcase,
  FaFilm,
  FaBolt,
  FaDumbbell
} from "react-icons/fa";
const transactions = [
  { id: 1, title: "Grocery Shopping", date: "May 24, 2024", icon: <FaShoppingCart/>,        amount: -1250, category: "Food" },
  { id: 2, title: "Salary Credit",    date: "May 23, 2024", icon: <FaBriefcase/>,      amount: 85000, category: "Salary" },
  { id: 3, title: "Netflix",          date: "May 22, 2024", icon: <FaFilm/>, amount: -599, category: "Entertainment" },
  { id: 4, title: "Electricity Bill", date: "May 21, 2024", icon: <FaBolt/>,       amount: -2400, category: "Electricity" },
  { id: 5, title: "Gym Membership",   date: "May 20, 2024", icon: <FaDumbbell/>,      amount: -1500, category: "Health" },
];

export default function RecentTransactions() {
  return (
    <div className="transactions-list">
      {transactions.map((tx) => (
        <div key={tx.id} className="transaction-item">
          <div className="tx-icon">{tx.icon}</div>
          <div className="tx-info">
            <span className="tx-title">{tx.title}</span>
            <span className="tx-date">{tx.date}</span>
          </div>
          <span className="tx-category">{tx.category}</span>
          <span className={`tx-amount ${tx.amount < 0 ? "negative" : "positive"}`}>
            {tx.amount < 0 ? "- " : "+ "}NPR {Math.abs(tx.amount).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
