import { useEffect, useState } from "react";
import { getJobs, deleteJob } from "../services/jobs";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";
import { useToast } from "../context/ToastContext";

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const fetchJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDeleteClick = (job, e) => {
    e.stopPropagation();
    setJobToDelete(job);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteJob(jobToDelete.id);
      showToast("Job deleted successfully!");
      await fetchJobs();
      setShowConfirmModal(false);
      setJobToDelete(null);
    } catch (err) {
      showToast(err.message || "Failed to delete job", "error");
    }
  };

  return (
    <div className="page">
      <h1>Job Listings</h1>

      {jobs.length === 0 && (
        <p>No jobs available yet.</p>
      )}

      {jobs.map((job) => (
        <div key={job.id} style={{ position: 'relative' }}>
          <JobCard
            job={{
              id: job.id,
              title: job.job_title,
              location: `Budget: ₹${job.budget}`,
              type: `Closes: ${job.expected_close_date}`
            }}
            onClick={() =>
              navigate(`/dashboard/jobs/${job.id}/applications`)
            }
          />
          <button
            onClick={(e) => handleDeleteClick(job, e)}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              padding: '8px 16px',
              backgroundColor: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '600',
              zIndex: 10
            }}
          >
            Delete
          </button>
        </div>
      ))}

      {/* Confirmation Modal */}
      {showConfirmModal && jobToDelete && (
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
              Delete Job?
            </h2>
            <p style={{
              textAlign: 'center',
              color: '#64748b',
              marginBottom: '28px',
              fontSize: '1rem'
            }}>
              Are you sure you want to delete "<strong>{jobToDelete.job_title}</strong>"? This will also delete all associated applications. This action cannot be undone.
            </p>
            <div style={{
              display: 'flex',
              gap: '12px'
            }}>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setJobToDelete(null);
                }}
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
                onClick={handleConfirmDelete}
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
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
