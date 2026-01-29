import { NavLink, useNavigate } from "react-router-dom";
import { LogOut, Home, LayoutDashboard, Briefcase, UserPlus, Users, ClipboardList, Calendar } from "lucide-react";
import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <h2 className="brand">Aptivora</h2>

      <nav>
        <NavLink to="/home" className={({ isActive }) => isActive ? "active" : ""}>
          <Home size={18} /> Home
        </NavLink>
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)', margin: '8px 0' }}></div>

        <NavLink to="/dashboard" end>
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>
        <NavLink to="/dashboard/jobs" end>
          <Briefcase size={18} /> Job List
        </NavLink>
        <NavLink to="/dashboard/add-employee">
          <UserPlus size={18} /> Add Employee
        </NavLink>
        <NavLink to="/dashboard/junior-hr">
          <Users size={18} /> Employee Management
        </NavLink>
        <NavLink to="/dashboard/jobs/add">
          <ClipboardList size={18} /> Add Jobs
        </NavLink>
        <NavLink to="/dashboard/candidate-status">
          <Users size={18} /> Candidate Status
        </NavLink>
        <NavLink to="/dashboard/attendance">
          <Calendar size={18} /> Attendance
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
}
