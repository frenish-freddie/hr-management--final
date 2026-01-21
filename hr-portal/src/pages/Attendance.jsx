import { useEffect, useState } from "react";
import { getAttendance } from "../services/attendance";
import "./JuniorHR.css"; // Reuse card styles

export default function Attendance() {
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);
  const empId = localStorage.getItem("emp_id");

  useEffect(() => {
    if (empId) {
      getAttendance(empId)
        .then(setAttendance)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [empId]);

  if (loading) return <div className="page">Loading attendance...</div>;

  const stats = attendance?.summary || {
    total_working_days: 0,
    present_days: 0,
    absent_days: 0,
    leave_days: 0
  };

  const attendancePercentage = stats.total_working_days > 0
    ? Math.round((stats.present_days / stats.total_working_days) * 100)
    : 0;

  return (
    <div className="junior-hr-page">
      <header className="page-header">
        <h1>My Attendance</h1>
        <p>Track your presence and leave balance for the current cycle.</p>
      </header>

      <div className="junior-grid">
        <div className="junior-card active">
          <div className="junior-info">
            <h3>Attendance Overview</h3>
            <span>Employee ID: {empId}</span>
          </div>

          <div className="junior-stats" style={{ marginTop: '20px' }}>
            <div className="mini-stat">
              <label>Attendance Rate</label>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${attendancePercentage}%` }}></div>
              </div>
              <span className="stat-value">{attendancePercentage}%</span>
            </div>
          </div>
        </div>
      </div>

      <section className="junior-details slide-up" style={{ marginTop: '30px', position: 'relative' }}>
        <div className="details-header">
          <h2>Summary</h2>
        </div>

        <div className="details-grid">
          <div className="detail-item">
            <h4>Work Days</h4>
            <ul>
              <li><strong>Total Working Days:</strong> {stats.total_working_days}</li>
              <li><strong>Days Present:</strong> {stats.present_days}</li>
            </ul>
          </div>

          <div className="detail-item">
            <h4>Absence & Leaves</h4>
            <ul>
              <li><strong>Days Absent:</strong> {stats.absent_days}</li>
              <li><strong>Leave Days:</strong> {stats.leave_days}</li>
            </ul>
          </div>

          <div className="detail-item">
            <h4>Quick Stats</h4>
            <p>Your performance is in sync with HR policies. {attendancePercentage < 90 ? 'Try to maintain above 90%.' : 'Excellent consistency!'}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
