import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import "./Jobs.css";
import { createJob } from "../services/jobs";

export default function AddJob() {
  const role = (localStorage.getItem("seniority") || "").toLowerCase();
  const empId = localStorage.getItem("emp_id") || "";
  const isSenior = role.includes("senior") || role.includes("manager");
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [job, setJob] = useState({
    job_title: "",
    job_description: "",
    expected_close_date: "",
    budget: ""
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSenior) return;

    try {
      await createJob({
        ...job,
        budget: Number(job.budget),
        emp_id: empId
      });

      showToast("Job created successfully!");
      setJob({
        job_title: "",
        job_description: "",
        expected_close_date: "",
        budget: ""
      });
    } catch (err) {
      showToast(err.message || "Failed to create job", "error");
      console.error(err);
    }
  };

  return (
    <div className="add-job-page">
      <header className="add-job-header">
        <h1>Add Job</h1>
        {!isSenior && (
          <span className="permission-note">
            You don’t have permission to create jobs.
          </span>
        )}
      </header>

      <form className="job-form" onSubmit={handleSubmit}>
        <input
          name="job_title"
          placeholder="Job Title"
          value={job.job_title}
          onChange={handleChange}
          disabled={!isSenior}
          required
        />

        <textarea
          name="job_description"
          placeholder="Job Description"
          value={job.job_description}
          onChange={handleChange}
          disabled={!isSenior}
          rows={4}
          required
        />

        <input
          type="date"
          name="expected_close_date"
          value={job.expected_close_date}
          onChange={handleChange}
          disabled={!isSenior}
          required
        />

        <input
          type="number"
          name="budget"
          placeholder="Budget"
          value={job.budget}
          onChange={handleChange}
          disabled={!isSenior}
          required
        />

        <button
          type="submit"
          className="primary-btn"
          disabled={!isSenior}
        >
          Create Job
        </button>
      </form>
    </div>
  );
}
