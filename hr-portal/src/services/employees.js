const API_URL = "http://localhost:8000";

export const getAllEmployees = async () => {
    const response = await fetch(`${API_URL}/employees`);
    if (!response.ok) throw new Error("Failed to fetch employees");
    return response.json();
};

export const getEmployeeFull = async (empId) => {
    const response = await fetch(`${API_URL}/employees/${empId}`);
    if (!response.ok) throw new Error("Failed to fetch employee details");
    return response.json();
};

export const createEmployeeFull = async (data) => {
    const response = await fetch(`${API_URL}/employees/full`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || "Failed to create employee");
    }
    return response.json();
};

export const updateEmployeeManagement = async (empId, data) => {
    const response = await fetch(`${API_URL}/employees/${empId}/management`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to update employee details");
    return response.json();
};

export const deleteEmployees = async (empIds) => {
    const response = await fetch(`${API_URL}/employees/batch`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(empIds),
    });
    if (!response.ok) throw new Error("Failed to remove employees");
    return response.json();
};
