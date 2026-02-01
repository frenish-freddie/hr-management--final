const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function getAttendance(emp_id) {
    const res = await fetch(`${API_URL}/employees/${emp_id}`);

    if (!res.ok) {
        throw new Error("Failed to fetch attendance data");
    }

    const data = await res.json();
    return data.management?.attendance;
}
