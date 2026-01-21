// src/services/jobs.js

const API = "http://localhost:8000";

// GET jobs
export async function getJobs() {
  const res = await fetch(`${API}/jobs`);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  return res.json();
}

// CREATE job
export async function createJob(jobData) {
  const res = await fetch(`${API}/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jobData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Failed to create job");
  }

  return res.json();
}

// DELETE job
export async function deleteJob(jobId) {
  const res = await fetch(`${API}/jobs/${jobId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Failed to delete job");
  }

  return res.json();
}
