import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
  const [stats, setStats] = useState({
    total_jobs: 0,
    total_applications: 0,
    total_junior_hrs: 0,
    recent_applications: []
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const seniority = (localStorage.getItem("seniority") || "").toLowerCase();

  useEffect(() => {
    fetch("http://localhost:8000/stats")
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch stats:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Loading statistics...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="title-group">
          <h1>Welcome, {localStorage.getItem("name")}</h1>
          <p className="subtitle">Here's what's happening today.</p>
        </div>
        <span className="role-pill">{seniority.replace("_", " ") || "HR"}</span>
      </header>

      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon jobs">💼</div>
          <div className="stat-info">
            <h4>Open Positions</h4>
            <p className="stat-number">{stats.total_jobs}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon apps">📄</div>
          <div className="stat-info">
            <h4>Applications</h4>
            <p className="stat-number">{stats.total_applications}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon hrs">👥</div>
          <div className="stat-info">
            <h4>Junior HRs</h4>
            <p className="stat-number">{stats.total_junior_hrs}</p>
          </div>
        </div>
      </section>

      <div className="dashboard-content-grid">
        <section className="recent-activity-section">
          <h3>Recent Applications</h3>
          <div className="activity-list">
            {stats.recent_applications.length > 0 ? (
              stats.recent_applications.map((app, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-avatar">
                    {app.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="activity-details">
                    <p className="activity-text">
                      <strong>{app.name}</strong> applied for <strong>{app.job_title}</strong>
                    </p>
                    <span className="activity-time">{app.applied_on}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No recent applications found.</p>
            )}
          </div>
        </section>

        <section className="quick-actions-section">
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <button className="action-btn primary" onClick={() => navigate("/dashboard/jobs/add")}>
              <span className="icon">+</span> Post New Job
            </button>
            <button className="action-btn primary" onClick={() => navigate("/dashboard/add-employee")}>
              <span className="icon">+</span> Add Employee
            </button>
            <button className="action-btn secondary" onClick={() => navigate("/dashboard/jobs")}>
              <span className="icon">📋</span> View All Jobs
            </button>
            <button className="action-btn secondary" onClick={() => navigate("/dashboard/candidate-status")}>
              <span className="icon">👤</span> Review Candidates
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
