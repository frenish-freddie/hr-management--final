import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const seniority = (localStorage.getItem("seniority") || "").toLowerCase();
  const isSenior = seniority.includes("senior");

  return (
    <aside className="sidebar">
      <h2 className="brand">HR MAG</h2>

      <nav>
        <NavLink to="/dashboard" end>Dashboard</NavLink>
        <NavLink to="/dashboard/jobs">Job List</NavLink>

        {isSenior && (
          <>
            <NavLink to="/dashboard/add-employee">Add Employee</NavLink>
            <NavLink to="/dashboard/junior-hr">Employee Management</NavLink>
            <NavLink to="/dashboard/jobs/add">Add Jobs</NavLink>
            <NavLink to="/dashboard/candidate-status">Candidate Status</NavLink>
          </>
        )}

        <NavLink to="/dashboard/attendance">Attendance</NavLink>
      </nav>
    </aside>
  );
}
