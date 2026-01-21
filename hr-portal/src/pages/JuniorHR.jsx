import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllEmployees, deleteEmployees } from "../services/employees";
import "./JuniorHR.css";

export default function JuniorHR() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removeMode, setRemoveMode] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await getAllEmployees();
      setEmployees(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleRemoveClick = () => {
    if (selectedEmployees.length === 0) {
      alert("Please select at least one employee to remove");
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmRemove = async () => {
    try {
      await deleteEmployees(selectedEmployees);
      await fetchEmployees(); // Refresh the list
      setSelectedEmployees([]);
      setRemoveMode(false);
      setShowConfirmModal(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const toggleEmployeeSelection = (empId) => {
    if (selectedEmployees.includes(empId)) {
      setSelectedEmployees(selectedEmployees.filter(id => id !== empId));
    } else {
      setSelectedEmployees([...selectedEmployees, empId]);
    }
  };

  return (
    <div className="junior-hr-page">
      <header className="page-header">
        <h1>Employee Management</h1>
        <p>Monitor performance, attendance, and details of your entire team.</p>
        {!removeMode ? (
          <button className="add-btn" style={{ backgroundColor: '#ef4444' }} onClick={() => setRemoveMode(true)}>
            - Remove Employee
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="add-btn" style={{ backgroundColor: '#22c55e' }} onClick={handleRemoveClick}>
              Confirm Remove ({selectedEmployees.length})
            </button>
            <button className="add-btn" style={{ backgroundColor: '#6b7280' }} onClick={() => {
              setRemoveMode(false);
              setSelectedEmployees([]);
            }}>
              Cancel
            </button>
          </div>
        )}
      </header>

      {loading ? (
        <div className="loading">Loading employees...</div>
      ) : (
        <div className="junior-grid">
          {employees.map((emp) => (
            <div
              key={emp.emp_id}
              className={`junior-card ${selectedEmployees.includes(emp.emp_id) ? 'selected' : ''}`}
              onClick={() => removeMode ? toggleEmployeeSelection(emp.emp_id) : navigate(`/dashboard/employee-details/${emp.emp_id}`)}
              style={{
                cursor: 'pointer',
                border: selectedEmployees.includes(emp.emp_id) ? '2px solid #ef4444' : '1px solid #e2e8f0',
                backgroundColor: selectedEmployees.includes(emp.emp_id) ? '#fee2e2' : 'white'
              }}
            >
              {removeMode && (
                <div style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: '2px solid #ef4444',
                  backgroundColor: selectedEmployees.includes(emp.emp_id) ? '#ef4444' : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}>
                  {selectedEmployees.includes(emp.emp_id) && '✓'}
                </div>
              )}
              <div className="junior-info">
                <h3>{emp.name}</h3>
                <span>{emp.emp_id} • {emp.role}</span>
              </div>
              <div className="junior-stats">
                <div className="mini-stat">
                  <label>Seniority</label>
                  <span className="stat-value">{emp.seniority || "Junior"}</span>
                </div>
                <div className="mini-stat">
                  <label>Designation</label>
                  <span className="stat-value">{emp.management?.employment?.designation || "N/A"}</span>
                </div>
              </div>
              {!removeMode && <div className="view-link">View Detailed Profile →</div>}
            </div>
          ))}
          {employees.length === 0 && <p className="empty-msg">No employees found. Start by adding one!</p>}
        </div>
      )}

      {/* Custom Confirmation Modal */}
      {showConfirmModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '450px',
            width: '90%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#fee2e2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <span style={{ fontSize: '28px', color: '#ef4444' }}>⚠️</span>
            </div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              textAlign: 'center',
              marginBottom: '12px',
              color: '#1e293b'
            }}>
              Remove Employees?
            </h2>
            <p style={{
              textAlign: 'center',
              color: '#64748b',
              marginBottom: '28px',
              fontSize: '1rem'
            }}>
              Are you sure you want to remove <strong>{selectedEmployees.length}</strong> employee(s)? This action cannot be undone.
            </p>
            <div style={{
              display: 'flex',
              gap: '12px'
            }}>
              <button
                onClick={() => setShowConfirmModal(false)}
                style={{
                  flex: 1,
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  backgroundColor: 'white',
                  color: '#64748b',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRemove}
                style={{
                  flex: 1,
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
