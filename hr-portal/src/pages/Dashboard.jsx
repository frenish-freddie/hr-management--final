import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Loading statistics...</div>;
  }

  return (
    <motion.div
      className="dashboard"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <header className="dashboard-header">
        <motion.div className="title-group" variants={itemVariants}>
          <h1>Welcome, {localStorage.getItem("name")}</h1>
          <p className="subtitle">Here's what's happening today.</p>
        </motion.div>
        <motion.span variants={itemVariants} className="role-pill">{seniority.replace("_", " ") || "HR"}</motion.span>
      </header>

      <motion.section className="stats-grid" variants={containerVariants}>
        <motion.div className="stat-card" variants={itemVariants} whileHover={{ y: -5 }}>
          <div className="stat-icon jobs">💼</div>
          <div className="stat-info">
            <h4>Open Positions</h4>
            <p className="stat-number">{stats.total_jobs}</p>
          </div>
        </motion.div>

        <motion.div className="stat-card" variants={itemVariants} whileHover={{ y: -5 }}>
          <div className="stat-icon apps">📄</div>
          <div className="stat-info">
            <h4>Applications</h4>
            <p className="stat-number">{stats.total_applications}</p>
          </div>
        </motion.div>

        <motion.div className="stat-card" variants={itemVariants} whileHover={{ y: -5 }}>
          <div className="stat-icon hrs">👥</div>
          <div className="stat-info">
            <h4>Junior HRs</h4>
            <p className="stat-number">{stats.total_junior_hrs}</p>
          </div>
        </motion.div>
      </motion.section>

      <div className="dashboard-content-grid">
        <motion.section className="recent-activity-section" variants={itemVariants}>
          <h3>Recent Applications</h3>
          <div className="activity-list">
            {stats.recent_applications.length > 0 ? (
              stats.recent_applications.map((app, index) => (
                <motion.div
                  key={index}
                  className="activity-item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="activity-avatar">
                    {app.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="activity-details">
                    <p className="activity-text">
                      <strong>{app.name}</strong> applied for <strong>{app.job_title}</strong>
                    </p>
                    <span className="activity-time">{app.applied_on}</span>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="no-data">No recent applications found.</p>
            )}
          </div>
        </motion.section>

        <motion.section className="quick-actions-section" variants={itemVariants}>
          <h3>Quick Actions</h3>
          <div className="actions-grid">
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="action-btn primary" onClick={() => navigate("/dashboard/jobs/add")}>
              <span className="icon">+</span> Post New Job
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="action-btn primary" onClick={() => navigate("/dashboard/add-employee")}>
              <span className="icon">+</span> Add Employee
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="action-btn secondary" onClick={() => navigate("/dashboard/jobs")}>
              <span className="icon">📋</span> View All Jobs
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="action-btn secondary" onClick={() => navigate("/dashboard/candidate-status")}>
              <span className="icon">👤</span> Review Candidates
            </motion.button>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
