
import '../pages/Dashboard.css';
export default function Navbar(){
    return(
    //  <div className="dashboard-header">
    //     <h1 className="dashboard-title">Dashboard</h1>
        <div className="header-right">
          <button className="notif-btn" title="Notifications">🔔</button>
          <div className="user-info">
            <span className="user-name">Anxa</span>
            <div className="user-avatar">AA</div>
          </div>
        </div>
    //   </div>
    );
}
