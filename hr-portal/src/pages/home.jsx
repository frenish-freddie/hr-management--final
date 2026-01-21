import "./Home.css";
import { Link } from "react-router-dom";
import { Users, Briefcase, TrendingUp, Shield, Zap, Award } from "lucide-react";

export default function Home() {
  const isLoggedIn = !!localStorage.getItem("token");

  const features = [
    {
      icon: Users,
      title: "Employee Management",
      description: "Comprehensive employee profiles with personal, employment, and compensation details"
    },
    {
      icon: Briefcase,
      title: "Job Postings",
      description: "Create and manage job listings with integrated application tracking"
    },
    {
      icon: TrendingUp,
      title: "Performance Tracking",
      description: "Monitor attendance, performance metrics, and employee growth"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Role-based access control ensuring data security and privacy"
    },
    {
      icon: Zap,
      title: "Fast & Efficient",
      description: "Streamlined workflows for quick decision-making and operations"
    },
    {
      icon: Award,
      title: "Asset Management",
      description: "Track company assets assigned to employees with full visibility"
    }
  ];

  const stats = [
    { value: "500+", label: "Employees Managed" },
    { value: "99.9%", label: "Uptime" },
    { value: "50+", label: "Active Jobs" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Modern HR Management Platform
          </div>
          <h1 className="hero-title">
            Transform Your HR
            <span className="gradient-text"> Operations</span>
          </h1>
          <p className="hero-description">
            Streamline employee management, recruitment, and performance tracking with our comprehensive HR solution. Built for modern teams.
          </p>
          <div className="hero-buttons">
            <Link to={isLoggedIn ? "/dashboard" : "/login"} className="primary-cta">
              {isLoggedIn ? "Go to Dashboard" : "Get Started"}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            {!isLoggedIn && (
              <Link to="/register" className="secondary-cta">
                Create Account
              </Link>
            )}
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-card card-1">
            <div className="card-icon">👥</div>
            <div className="card-text">
              <div className="card-label">Total Employees</div>
              <div className="card-value">1,234</div>
            </div>
          </div>
          <div className="floating-card card-2">
            <div className="card-icon">📊</div>
            <div className="card-text">
              <div className="card-label">Active Jobs</div>
              <div className="card-value">56</div>
            </div>
          </div>
          <div className="floating-card card-3">
            <div className="card-icon">✅</div>
            <div className="card-text">
              <div className="card-label">Attendance Rate</div>
              <div className="card-value">98.5%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Everything You Need</h2>
          <p className="section-description">
            Powerful features to manage your entire HR workflow in one place
          </p>
        </div>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <feature.icon size={24} />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Transform Your HR?</h2>
          <p className="cta-description">
            Join hundreds of companies already using our platform to streamline their HR operations
          </p>
          <Link to={isLoggedIn ? "/dashboard" : "/register"} className="cta-button">
            {isLoggedIn ? "Go to Dashboard" : "Start Free Trial"}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Aptivora</h3>
            <p>Modern HR Management Platform</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Security</a>
            </div>
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Blog</a>
              <a href="#">Careers</a>
            </div>
            <div className="footer-column">
              <h4>Support</h4>
              <a href="#">Help Center</a>
              <a href="#">Contact</a>
              <a href="#">Status</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Aptivora. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
