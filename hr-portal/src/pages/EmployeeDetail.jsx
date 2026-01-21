import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeFull } from "../services/employees";
import { useToast } from "../context/ToastContext";
import "./EmployeeDetail.css";

export default function EmployeeDetail() {
    const { empId } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const data = await getEmployeeFull(empId);
                setEmployee(data);
            } catch (err) {
                showToast(err.message, "error");
                navigate("/dashboard/junior-hr");
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [empId]);

    if (loading) return <div className="loading">Loading detailed information...</div>;
    if (!employee) return <div>Employee not found.</div>;

    const mgmnt = employee.management || {};

    return (
        <div className="employee-detail-page">
            <header className="page-header">
                <div className="title-row">
                    <button className="back-btn" onClick={() => navigate(-1)}>←</button>
                    <h1>{employee.name}'s Profile</h1>
                </div>
                <p>{employee.emp_id} • {employee.role} ({employee.seniority})</p>
            </header>

            <div className="detail-layout">
                {/* Sidebar Info */}
                <aside className="detail-sidebar">
                    <div className="profile-card">
                        <div className="avatar">{employee.name[0]}</div>
                        <h3>{employee.name}</h3>
                        <span className="email">{employee.email}</span>
                        <div className={`status-pill active`}>Active</div>
                    </div>

                    <div className="quick-info">
                        <h4>Employment</h4>
                        <div className="info-item">
                            <label>Designation</label>
                            <span>{mgmnt.employment?.designation || "N/A"}</span>
                        </div>
                        <div className="info-item">
                            <label>Department</label>
                            <span>{mgmnt.employment?.department || "N/A"}</span>
                        </div>
                        <div className="info-item">
                            <label>Joined On</label>
                            <span>{mgmnt.employment?.date_of_joining || "N/A"}</span>
                        </div>
                    </div>
                </aside>

                {/* Main Sections */}
                <main className="detail-main">
                    {/* Assets Section */}
                    <section className="detail-section">
                        <h3>Assigned Assets</h3>
                        <div className="assets-grid">
                            {mgmnt.assets?.laptop && (
                                <div className="asset-card">
                                    <span className="asset-icon">💻</span>
                                    <div className="asset-info">
                                        <strong>Laptop</strong>
                                        <span>{mgmnt.assets.laptop.brand} {mgmnt.assets.laptop.model}</span>
                                        <small>SN: {mgmnt.assets.laptop.serial_number}</small>
                                    </div>
                                </div>
                            )}
                            {/* Other assets can be listed here */}
                        </div>
                    </section>

                    {/* Salary & Advances Section */}
                    <section className="detail-section">
                        <h3>Salary & Compensation History</h3>
                        <div className="table-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Basic</th>
                                        <th>Bonus</th>
                                        <th>Tax</th>
                                        <th className="highlight">Advances</th>
                                        <th>Net Salary</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mgmnt.compensation && mgmnt.compensation.length > 0 ? (
                                        mgmnt.compensation.map((comp, i) => (
                                            <tr key={i}>
                                                <td>{comp.payment_date || "N/A"}</td>
                                                <td>${comp.basic_salary}</td>
                                                <td>${comp.bonus}</td>
                                                <td>-${comp.tax}</td>
                                                <td className="advance-cell">${comp.advances || 0}</td>
                                                <td className="net-salary-cell">${comp.net_salary}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr><td colSpan="6" className="empty-row">No payroll history found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* Personal Section */}
                    <section className="detail-section">
                        <h3>General Information</h3>
                        <div className="general-grid">
                            <div className="info-box">
                                <strong>Gender</strong>
                                <span>{mgmnt.personal?.gender || "N/A"}</span>
                            </div>
                            <div className="info-box">
                                <strong>Birth Date</strong>
                                <span>{mgmnt.personal?.dob || "N/A"}</span>
                            </div>
                            <div className="info-box">
                                <strong>Phone</strong>
                                <span>{mgmnt.personal?.contact?.phone || "N/A"}</span>
                            </div>
                            <div className="info-box">
                                <strong>Location</strong>
                                <span>{mgmnt.personal?.address?.city}, {mgmnt.personal?.address?.state}</span>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
