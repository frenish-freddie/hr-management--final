import { useState } from "react";
import { register } from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./login.css";

export default function Register() {
  const [form, setForm] = useState({
    emp_id: "",
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "",
    seniority: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 🔑 normalize before sending
    const normalizedForm = {
      ...form,
      role: form.role.toLowerCase().replace(/\s+/g, "_"),
      seniority: form.seniority
        .toLowerCase()
        .replace(/\s+/g, "_")
    };

    try {
      await register(normalizedForm);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h1>Register</h1>

      {error && <p className="error">{error}</p>}

      <input
        name="emp_id"
        placeholder="Employee ID"
        onChange={handleChange}
        required
      />

      <input
        name="name"
        placeholder="Full Name"
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />

      <input
        name="confirm_password"
        type="password"
        placeholder="Confirm Password"
        onChange={handleChange}
        required
      />

      <input
        name="role"
        placeholder="Role (junior_hr / senior_hr)"
        onChange={handleChange}
        required
      />

      <input
        name="seniority"
        placeholder="Seniority (Junior / Senior / Manager)"
        onChange={handleChange}
        required
      />

      <button className="btn-primary">Register</button>
    </form>
  );
}
