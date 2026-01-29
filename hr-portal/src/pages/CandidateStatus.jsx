import { useState, useEffect } from "react";
import { useToast } from "../context/ToastContext";
import { usePermission } from "../hooks/usePermission";
import "./CandidateStatus.css";

const STATUS_OPTIONS = ["Applied", "Screening", "Interview", "HR Round", "Hired", "Rejected"];

const STATUS_COLORS = {
  "Applied": { bg: "#dbeafe", text: "#1d4ed8" },
  "Screening": { bg: "#fef3c7", text: "#b45309" },
  "Interview": { bg: "#e0e7ff", text: "#4338ca" },
  "HR Round": { bg: "#fce7f3", text: "#be185d" },
  "Hired": { bg: "#d1fae5", text: "#047857" },
  "Rejected": { bg: "#fee2e2", text: "#b91c1c" }
};

export default function CandidateStatus() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const { showToast } = useToast();
  const { isSenior } = usePermission();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/applications/all/list");
      if (!response.ok) throw new Error("Failed to fetch applications");
      const data = await response.json();
      setApplications(data);
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (appId, newStatus) => {
    if (!isSenior) {
      showToast("You don't have permission to update status", "error");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8000/applications/${appId}/status?status=${newStatus}`, {
        method: "PATCH"
      });
      if (!response.ok) throw new Error("Failed to update status");

      setApplications(prev =>
        prev.map(app => app.id === appId ? { ...app, status: newStatus } : app)
      );
      showToast(`Status updated to ${newStatus}`);
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const filteredApps = filter === "All"
    ? applications
    : applications.filter(app => app.status === filter);

  const statusCounts = STATUS_OPTIONS.reduce((acc, status) => {
    acc[status] = applications.filter(app => app.status === status).length;
    return acc;
  }, {});

  if (loading) return <div className="loading">Loading candidates...</div>;

  return (
    <div className="candidate-status-page">
      <header className="page-header">
        <h1>Candidate Tracking</h1>
        <p>Track candidates through the interview pipeline</p>
      </header>

      {/* Status Summary Cards */}
      <div className="status-summary">
        <div
          className={`summary-card ${filter === "All" ? "active" : ""}`}
          onClick={() => setFilter("All")}
        >
          <span className="count">{applications.length}</span>
          <span className="label">All</span>
        </div>
        {STATUS_OPTIONS.map(status => (
          <div
            key={status}
            className={`summary-card ${filter === status ? "active" : ""}`}
            style={{ borderColor: STATUS_COLORS[status].text }}
            onClick={() => setFilter(status)}
          >
            <span className="count" style={{ color: STATUS_COLORS[status].text }}>
              {statusCounts[status]}
            </span>
            <span className="label">{status}</span>
          </div>
        ))}
      </div>

      {/* Candidates Table */}
      <div className="table-container">
        <table className="candidates-table">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Job Position</th>
              <th>Experience</th>
              <th>Expected CTC</th>
              <th>Status</th>
              {isSenior && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredApps.length === 0 ? (
              <tr>
                <td colSpan={isSenior ? 6 : 5} className="empty-row">
                  No candidates found
                </td>
              </tr>
            ) : (
              filteredApps.map(app => (
                <tr key={app.id}>
                  <td>
                    <div className="candidate-info">
                      <strong>{app.name}</strong>
                      <span className="email">{app.email}</span>
                    </div>
                  </td>
                  <td>{app.job_title}</td>
                  <td>{app.experience} yrs</td>
                  <td>₹{(app.expected_ctc / 100000).toFixed(1)} LPA</td>
                  <td>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: STATUS_COLORS[app.status]?.bg || "#f3f4f6",
                        color: STATUS_COLORS[app.status]?.text || "#374151"
                      }}
                    >
                      {app.status}
                    </span>
                  </td>
                  {isSenior && (
                    <td>
                      <select
                        value={app.status}
                        onChange={(e) => updateStatus(app.id, e.target.value)}
                        className="status-select"
                      >
                        {STATUS_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
