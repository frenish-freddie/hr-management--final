export async function getApplications(jobId) {
  return [
    {
      id: 1,
      job_id: jobId,
      name: "Anjali S",
      email: "anjali@gmail.com",
      experience: 3,
      expected_ctc: 85000,
    },
    {
      id: 2,
      job_id: jobId,
      name: "Rahul K",
      email: "rahul@gmail.com",
      experience: 5,
      expected_ctc: 120000,
    },
  ];
}
