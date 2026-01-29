import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { usePermission } from "../hooks/usePermission";
import { createEmployeeFull } from "../services/employees";
import {
    User,
    Briefcase,
    DollarSign,
    Calendar,
    Monitor,
    FileText,
    LogOut,
    Check,
    ShieldAlert
} from "lucide-react";
import "./AddEmployee.css";

export default function AddEmployee() {
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { isSenior } = usePermission();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("personal");

    const [form, setForm] = useState({
        emp_id: "",
        name: "",
        email: "",
        password: "password123", // Default password
        role: "junior_hr",
        seniority: "junior", // Default seniority
        team_name: "",
        personal: {
            dob: "",
            gender: "",
            nationality: "Indian",
            marital_status: "",
            contact: { phone: "" },
            personal_email: "",
            work_email: "",
            address: {
                permanent: "",
                current: ""
            }
        },
        employment: {
            designation: "",
            department: "",
            date_of_joining: ""
        },
        compensation: {},
        attendance: {},
        assets: {
            laptop: { brand: "", model: "", serial_number: "" },
            other_assets: []
        },
        documents: {},
        exit_details: {}
    });

    const tabs = [
        { id: "personal", label: "Personal", icon: User },
        { id: "employment", label: "Employment", icon: Briefcase },
        { id: "compensation", label: "Compensation", icon: DollarSign },
        { id: "attendance", label: "Attendance", icon: Calendar },
        { id: "assets", label: "Assets", icon: Monitor },
        { id: "documents", label: "Documents", icon: FileText },
        { id: "exit", label: "Exit Details", icon: LogOut },
    ];

    const handleChange = (e, section, subSection) => {
        const { name, value } = e.target;
        if (subSection) {
            setForm(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [subSection]: { ...prev[section][subSection], [name]: value }
                }
            }));
        } else if (section) {
            setForm(prev => ({
                ...prev,
                [section]: { ...prev[section], [name]: value }
            }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Permission check: only seniors can add employees
        if (!isSenior) {
            showToast("You don't have permission to add employees", "error");
            return;
        }

        // Validation: email is required for the backend record
        if (!form.personal.work_email && !form.email) {
            showToast("Work email is required for account creation", "error");
            return;
        }

        setLoading(true);

        // Helper to convert empty strings to null or remove them
        const cleanEmptyStrings = (obj) => {
            if (Array.isArray(obj)) return obj.map(cleanEmptyStrings);
            if (obj && typeof obj === 'object') {
                const newObj = {};
                Object.keys(obj).forEach(key => {
                    const val = cleanEmptyStrings(obj[key]);
                    if (val !== "") {
                        newObj[key] = val;
                    }
                });
                return newObj;
            }
            return obj;
        };

        const cleanedForm = cleanEmptyStrings(form);

        // Ensure compensation is a list as expected by the backend
        let compensationList = [];
        if (form.compensation && Object.keys(form.compensation).length > 0) {
            const hasValues = Object.values(form.compensation).some(val => val !== "" && val !== null && val !== undefined);
            if (hasValues) {
                compensationList = [form.compensation];
            }
        }

        const submissionData = {
            ...cleanedForm,
            email: form.email || form.personal.work_email,
            compensation: compensationList
        };

        // Explicitly ensure employment has designation if empty (or handle per backend needs)
        // actually cleanEmptyStrings might have removed 'designation' if it was "", checking if that's safe.
        // Backend default for employment is valid.

        try {
            await createEmployeeFull(submissionData);
            showToast("Employee created successfully!");
            navigate("/dashboard/junior-hr");
        } catch (err) {
            showToast(err.message, "error");
        } finally {
            setLoading(false);
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "personal":
                return (
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Employee ID</label>
                            <input
                                name="emp_id"
                                placeholder="EMP001"
                                value={form.emp_id}
                                onChange={(e) => handleChange(e)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                name="name"
                                placeholder="John Doe"
                                value={form.name}
                                onChange={(e) => handleChange(e)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input
                                name="dob"
                                type="date"
                                value={form.personal.dob}
                                onChange={(e) => handleChange(e, "personal")}
                            />
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <select
                                name="gender"
                                value={form.personal.gender}
                                onChange={(e) => handleChange(e, "personal")}
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Nationality</label>
                            <input
                                name="nationality"
                                placeholder="Indian"
                                value={form.personal.nationality}
                                onChange={(e) => handleChange(e, "personal")}
                            />
                        </div>
                        <div className="form-group">
                            <label>Marital Status</label>
                            <select
                                name="marital_status"
                                value={form.personal.marital_status}
                                onChange={(e) => handleChange(e, "personal")}
                            >
                                <option value="">Select Status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Contact Number</label>
                            <input
                                name="phone"
                                placeholder="+91 9876543210"
                                value={form.personal.contact.phone}
                                onChange={(e) => handleChange(e, "personal", "contact")}
                            />
                        </div>
                        <div className="form-group">
                            <label>Personal Email</label>
                            <input
                                name="personal_email"
                                type="email"
                                placeholder="john@gmail.com"
                                value={form.personal.personal_email}
                                onChange={(e) => handleChange(e, "personal")}
                            />
                        </div>
                        <div className="form-group">
                            <label>Work Email</label>
                            <input
                                name="work_email"
                                type="email"
                                placeholder="john@company.com"
                                value={form.personal.work_email}
                                onChange={(e) => handleChange(e, "personal")}
                            />
                        </div>
                        <div className="address-grid">
                            <div className="form-group">
                                <label>Permanent Address</label>
                                <textarea
                                    name="permanent"
                                    rows="3"
                                    placeholder="Enter permanent address"
                                    value={form.personal.address.permanent}
                                    onChange={(e) => handleChange(e, "personal", "address")}
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Current Address</label>
                                <textarea
                                    name="current"
                                    rows="3"
                                    placeholder="Enter current address"
                                    value={form.personal.address.current}
                                    onChange={(e) => handleChange(e, "personal", "address")}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                );
            case "employment":
                return (
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Designation</label>
                            <input
                                name="designation"
                                placeholder="Software Engineer"
                                value={form.employment.designation}
                                onChange={(e) => handleChange(e, "employment")}
                            />
                        </div>
                        <div className="form-group">
                            <label>Department</label>
                            <input
                                name="department"
                                placeholder="Engineering"
                                value={form.employment.department}
                                onChange={(e) => handleChange(e, "employment")}
                            />
                        </div>
                        <div className="form-group">
                            <label>Date of Joining</label>
                            <input
                                name="date_of_joining"
                                type="date"
                                value={form.employment.date_of_joining}
                                onChange={(e) => handleChange(e, "employment")}
                            />
                        </div>
                        <div className="form-group">
                            <label>Role</label>
                            <input
                                name="role"
                                placeholder="Junior HR"
                                value={form.role}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Team Name</label>
                            <input
                                name="team_name"
                                placeholder="Product Development"
                                value={form.team_name}
                                onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Seniority Level</label>
                            <select
                                name="seniority"
                                value={form.seniority}
                                onChange={(e) => handleChange(e)}
                            >
                                <option value="junior">Junior</option>
                                <option value="senior">Senior</option>
                            </select>
                        </div>
                    </div>
                );
            case "compensation":
                return (
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Basic Salary</label>
                            <input
                                name="basic"
                                type="number"
                                placeholder="0.00"
                                value={form.compensation?.basic || ""}
                                onChange={(e) => handleChange(e, "compensation")}
                            />
                        </div>
                        <div className="form-group">
                            <label>HRA</label>
                            <input
                                name="hra"
                                type="number"
                                placeholder="0.00"
                                value={form.compensation?.hra || ""}
                                onChange={(e) => handleChange(e, "compensation")}
                            />
                        </div>
                        <div className="form-group">
                            <label>Bonus</label>
                            <input
                                name="bonus"
                                type="number"
                                placeholder="0.00"
                                value={form.compensation?.bonus || ""}
                                onChange={(e) => handleChange(e, "compensation")}
                            />
                        </div>
                        <div className="form-group">
                            <label>Bank Name</label>
                            <input
                                name="bank_name"
                                placeholder="HDFC Bank"
                                value={form.compensation?.bank_name || ""}
                                onChange={(e) => handleChange(e, "compensation")}
                            />
                        </div>
                        <div className="form-group">
                            <label>Account Number</label>
                            <input
                                name="account_no"
                                placeholder="XXXX XXXX XXXX"
                                value={form.compensation?.account_no || ""}
                                onChange={(e) => handleChange(e, "compensation")}
                            />
                        </div>
                        <div className="form-group">
                            <label>IFSC Code</label>
                            <input
                                name="ifsc"
                                placeholder="HDFC000123"
                                value={form.compensation?.ifsc || ""}
                                onChange={(e) => handleChange(e, "compensation")}
                            />
                        </div>
                    </div>
                );
            case "attendance":
                return (
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Sick Leave Balance</label>
                            <input
                                name="sick_leave"
                                type="number"
                                value={form.attendance?.sick_leave || "12"}
                                onChange={(e) => handleChange(e, "attendance")}
                            />
                        </div>
                        <div className="form-group">
                            <label>Casual Leave Balance</label>
                            <input
                                name="casual_leave"
                                type="number"
                                value={form.attendance?.casual_leave || "12"}
                                onChange={(e) => handleChange(e, "attendance")}
                            />
                        </div>
                        <div className="form-group">
                            <label>Working Shift</label>
                            <select name="shift" value={form.attendance?.shift || "General"} onChange={(e) => handleChange(e, "attendance")}>
                                <option value="General">General (9 AM - 6 PM)</option>
                                <option value="Morning">Morning (6 AM - 3 PM)</option>
                                <option value="Night">Night (10 PM - 7 AM)</option>
                            </select>
                        </div>
                    </div>
                );
            case "assets":
                return (
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Laptop Brand</label>
                            <input
                                name="brand"
                                placeholder="Apple"
                                value={form.assets.laptop.brand}
                                onChange={(e) => handleChange(e, "assets", "laptop")}
                            />
                        </div>
                        <div className="form-group">
                            <label>Model</label>
                            <input
                                name="model"
                                placeholder="MacBook Pro"
                                value={form.assets.laptop.model}
                                onChange={(e) => handleChange(e, "assets", "laptop")}
                            />
                        </div>
                        <div className="form-group">
                            <label>Serial Number</label>
                            <input
                                name="serial_number"
                                placeholder="SN12345678"
                                value={form.assets.laptop.serial_number}
                                onChange={(e) => handleChange(e, "assets", "laptop")}
                            />
                        </div>
                        <div className="form-group">
                            <label>ID Card Status</label>
                            <select name="id_card" value={form.assets.id_card || "N/A"} onChange={(e) => handleChange(e, "assets")}>
                                <option value="N/A">N/A</option>
                                <option value="Requested">Requested</option>
                                <option value="Issued">Issued</option>
                            </select>
                        </div>

                        <div className="form-group full-width" style={{ gridColumn: 'span 3', marginTop: '20px' }}>
                            <label style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '10px', display: 'block' }}>Other Assets</label>
                            {(form.assets.other_assets || []).map((asset, index) => (
                                <div key={index} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '12px', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                                    <div className="form-group" style={{ margin: 0 }}>
                                        <label style={{ fontSize: '0.85rem' }}>Asset Type</label>
                                        <select
                                            value={asset.type || ""}
                                            onChange={(e) => {
                                                const newAssets = [...(form.assets.other_assets || [])];
                                                newAssets[index].type = e.target.value;
                                                setForm({ ...form, assets: { ...form.assets, other_assets: newAssets } });
                                            }}
                                        >
                                            <option value="">Select Type</option>
                                            <option value="Mouse">Mouse</option>
                                            <option value="Keyboard">Keyboard</option>
                                            <option value="Speaker">Speaker</option>
                                            <option value="Headphones">Headphones</option>
                                            <option value="Monitor">Monitor</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="form-group" style={{ margin: 0 }}>
                                        <label style={{ fontSize: '0.85rem' }}>Brand</label>
                                        <input
                                            placeholder="Logitech"
                                            value={asset.brand || ""}
                                            onChange={(e) => {
                                                const newAssets = [...(form.assets.other_assets || [])];
                                                newAssets[index].brand = e.target.value;
                                                setForm({ ...form, assets: { ...form.assets, other_assets: newAssets } });
                                            }}
                                        />
                                    </div>
                                    <div className="form-group" style={{ margin: 0 }}>
                                        <label style={{ fontSize: '0.85rem' }}>Model</label>
                                        <input
                                            placeholder="MX Master 3"
                                            value={asset.model || ""}
                                            onChange={(e) => {
                                                const newAssets = [...(form.assets.other_assets || [])];
                                                newAssets[index].model = e.target.value;
                                                setForm({ ...form, assets: { ...form.assets, other_assets: newAssets } });
                                            }}
                                        />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newAssets = (form.assets.other_assets || []).filter((_, i) => i !== index);
                                                setForm({ ...form, assets: { ...form.assets, other_assets: newAssets } });
                                            }}
                                            style={{
                                                padding: '10px 16px',
                                                backgroundColor: '#ef4444',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                fontSize: '0.9rem'
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => {
                                    const newAssets = [...(form.assets.other_assets || []), { type: "", brand: "", model: "" }];
                                    setForm({ ...form, assets: { ...form.assets, other_assets: newAssets } });
                                }}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#0ea5e9',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '0.95rem',
                                    marginTop: '8px'
                                }}
                            >
                                + Add Another Asset
                            </button>
                        </div>
                    </div>
                );
            case "documents":
                return (
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Document Type</label>
                            <select
                                name="doc_type"
                                value={form.documents?.doc_type || ""}
                                onChange={(e) => handleChange(e, "documents")}
                            >
                                <option value="">Select Document</option>
                                <option value="Aadhar">Aadhar Card</option>
                                <option value="PAN">PAN Card</option>
                                <option value="Passport">Passport</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Document Number</label>
                            <input
                                name="doc_number"
                                placeholder="Enter document number"
                                value={form.documents?.doc_number || ""}
                                onChange={(e) => handleChange(e, "documents")}
                            />
                        </div>
                        <div className="form-group">
                            <label>Upload Document</label>
                            <div className="file-upload-wrapper">
                                <input
                                    type="file"
                                    id="doc-upload"
                                    onChange={(e) => {
                                        // Handle local file state if needed for UI feedback
                                        const file = e.target.files[0];
                                        if (file) {
                                            showToast(`File "${file.name}" selected`);
                                        }
                                    }}
                                    style={{ display: 'none' }}
                                />
                                <label htmlFor="doc-upload" className="secondary-btn" style={{ cursor: 'pointer', textAlign: 'center', display: 'block' }}>
                                    {form.documents?.file ? "Change File" : "Choose File"}
                                </label>
                            </div>
                        </div>
                    </div>
                );
            case "exit":
                return (
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Exit Type</label>
                            <select name="exit_type" value={form.exit_details?.exit_type || "N/A"} onChange={(e) => handleChange(e, "exit_details")}>
                                <option value="N/A">Live Employee</option>
                                <option value="Resigned">Resigned</option>
                                <option value="Terminated">Terminated</option>
                            </select>
                        </div>
                        <div className="form-group full-width">
                            <label>HR Remarks</label>
                            <textarea
                                name="remarks"
                                placeholder="Any internal remarks..."
                                value={form.exit_details?.remarks || ""}
                                onChange={(e) => handleChange(e, "exit_details")}
                                rows="4"
                            ></textarea>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const handleNext = () => {
        const currentIndex = tabs.findIndex(t => t.id === activeTab);
        if (currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1].id);
        }
    };

    const handleBack = () => {
        const currentIndex = tabs.findIndex(t => t.id === activeTab);
        if (currentIndex > 0) {
            setActiveTab(tabs[currentIndex - 1].id);
        }
    };

    return (
        <div className="add-employee-page">
            <header className="add-employee-header">
                <h1>Add New Employee</h1>
                {!isSenior && (
                    <div className="permission-banner" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        backgroundColor: '#fef3c7',
                        border: '1px solid #f59e0b',
                        borderRadius: '8px',
                        padding: '12px 16px',
                        marginTop: '16px',
                        color: '#92400e'
                    }}>
                        <ShieldAlert size={20} />
                        <span>You don't have permission to add employees. You can view this form but cannot submit.</span>
                    </div>
                )}
            </header>

            <nav className="tabs-nav">
                {tabs.map(tab => (
                    <div
                        key={tab.id}
                        className={`tab-item ${activeTab === tab.id ? "active" : ""}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        <tab.icon className="tab-icon" />
                        {tab.label}
                    </div>
                ))}
            </nav>

            <form className="form-container" onSubmit={handleSubmit}>
                {renderTabContent()}

                <div className="form-actions">
                    {activeTab !== "personal" && (
                        <button type="button" className="cancel-btn" onClick={handleBack}>
                            Back
                        </button>
                    )}
                    {activeTab === "personal" && (
                        <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>
                            Cancel
                        </button>
                    )}

                    {activeTab !== "exit" ? (
                        <button type="button" className="submit-btn" onClick={handleNext}>
                            Next
                        </button>
                    ) : (
                        <button type="submit" className="submit-btn" disabled={loading}>
                            <Check size={18} />
                            {loading ? "Adding..." : "Add Employee"}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
