import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import JobList from "./pages/JobList";
import Applications from "./pages/Applications";
import CandidateStatus from "./pages/CandidateStatus";
import JuniorHR from "./pages/JuniorHR";
import AddEmployee from "./pages/AddEmployee";
import EmployeeDetail from "./pages/EmployeeDetail";
import Attendance from "./pages/Attendance";
import ApplicationForm from "./pages/ApplicationForm";
import NewsPage from "./pages/NewsPage";
import FeaturesPage from "./pages/FeaturesPage";
import { ToastProvider } from "./context/ToastContext";

export default function App() {
  return (
    <ToastProvider>
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/home" element={<Home />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/login" element={<Login />} />

        {/* REGISTER (AUTH ONLY) */}
        <Route path="/register" element={<Register />} />

        {/* DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/jobs"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <JobList />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/jobs/add"
          element={
            <ProtectedRoute role="senior">
              <DashboardLayout>
                <Jobs />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/jobs/:jobId/applications"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Applications />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/candidate-status"
          element={
            <ProtectedRoute role="senior">
              <DashboardLayout>
                <CandidateStatus />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/junior-hr"
          element={
            <ProtectedRoute role="senior">
              <DashboardLayout>
                <JuniorHR />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/add-employee"
          element={
            <ProtectedRoute role="senior">
              <DashboardLayout>
                <AddEmployee />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/employee-details/:empId"
          element={
            <ProtectedRoute role="senior">
              <DashboardLayout>
                <EmployeeDetail />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/attendance"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Attendance />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* PUBLIC: Job Application Form */}
        <Route path="/apply/:jobId" element={<ApplicationForm />} />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </ToastProvider>
  );
}
