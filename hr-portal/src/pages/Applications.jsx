import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApplications } from "../services/applications";

export default function Applications() {
  const { jobId } = useParams();
  const [apps, setApps] = useState([]);

  useEffect(() => {
    getApplications(jobId).then(setApps);
  }, [jobId]);

  return (
    <div className="page">
      <h1>Applications</h1>
      {apps.map(a => (
        <div key={a.id} className="stat-card">
          <h3>{a.name}</h3>
          <p>{a.email}</p>
          <p>Experience: {a.experience} yrs</p>
        </div>
      ))}
    </div>
  );
}
    