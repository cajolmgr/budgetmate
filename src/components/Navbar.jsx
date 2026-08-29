
import '../pages/Dashboard.css';
import { FaBell } from 'react-icons/fa';
export default function Navbar(){
    return(
    //  <div className="dashboard-header">
    //     <h1 className="dashboard-title">Dashboard</h1>
        <div
          className="header-right"
          style={{ paddingBottom: "10px" }}
        >
            <button className="notif-btn" title="Notifications">
            <FaBell />
            </button>
        </div>
    //   </div>
    );
}
