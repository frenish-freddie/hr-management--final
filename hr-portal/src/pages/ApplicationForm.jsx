import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ApplicationForm.module.css";

const ApplicationForm = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [jobDetails, setJobDetails] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        experience: "",
        ctc: "",
        expected_ctc: "",
    });
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/jobs/${jobId}`);
                if (!response.ok) throw new Error("Job not found");
                const data = await response.json();
                setJobDetails(data);
            } catch (err) {
                setError("Failed to load job details: " + err.message);
            }
        };
        fetchJobDetails();
    }, [jobId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setResume(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const data = new FormData();
            data.append("job_id", jobId);
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("phone", formData.phone);
            data.append("experience", formData.experience);
            data.append("ctc", formData.ctc);
            data.append("expected_ctc", formData.expected_ctc);
            data.append("resume", resume);

            const response = await fetch("http://127.0.0.1:8000/applications/", {
                method: "POST",
                body: data,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || "Failed to submit application");
            }

            setSuccess(true);
            setTimeout(() => {
                navigate("/jobs");
            }, 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className={styles.successContainer}>
                <h2>Application Submitted Successfully!</h2>
                <p>Redirecting to jobs page...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.jobHeader}>
                <h1>Job Application</h1>
                <p className={styles.jobMeta}>
                    {jobDetails ? `Applying for ${jobDetails.job_title}` : "Loading job details..."}
                </p>
            </div>

            {error && <p className={styles.error}>{error}</p>}

            <form onSubmit={handleSubmit} className={styles.form}>
                {/* Read-Only Fields */}
                <div className={styles.formGroup}>
                    <label>Job Title</label>
                    <input
                        type="text"
                        value={jobDetails?.job_title || ""}
                        readOnly
                        disabled
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Offered CTC (LPA)</label>
                    <input
                        type="text"
                        value={jobDetails?.budget || ""}
                        readOnly
                        disabled
                    />
                </div>

                {/* Applicant Fields */}
                <div className={styles.formGroup}>
                    <label>Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 9876543210"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Years of Experience</label>
                    <input
                        type="number"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        step="0.1"
                        required
                        placeholder="2.5"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Current CTC (LPA)</label>
                    <input
                        type="number"
                        name="ctc"
                        value={formData.ctc}
                        onChange={handleChange}
                        step="0.1"
                        required
                        placeholder="5.0"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Expected CTC (LPA)</label>
                    <input
                        type="number"
                        name="expected_ctc"
                        value={formData.expected_ctc}
                        onChange={handleChange}
                        step="0.1"
                        required
                        placeholder="7.5"
                    />
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label>Resume</label>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        required
                    />
                </div>

                <button type="submit" disabled={loading} className={styles.submitButton}>
                    {loading ? "Submitting Application..." : "Submit Application"}
                </button>
            </form>
        </div>
    );
};

export default ApplicationForm;
