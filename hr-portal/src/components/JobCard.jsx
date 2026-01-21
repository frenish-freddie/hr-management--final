import "./JobCard.css";
import { Link } from "react-router-dom";


export default function JobCard({ job, onClick }) {
  return (
    <div className="job-card" onClick={onClick}>
      <h3>{job.title}</h3>
      <p>{job.location} • {job.type}</p>
      <span>View Applications →</span>
    </div>
  );
}
