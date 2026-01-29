import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import "./HeroSection.css";

export default function HeroSection() {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="hero-text-container"
                >
                    <div className="badge">
                        <span className="badge-glow"></span>
                        <span className="badge-text">New: AI-Powered Talent Analytics</span>
                    </div>

                    <h1 className="hero-title">
                        Unlock Your <br />
                        <span className="text-gradient-pink">Workforce Potential</span>
                    </h1>

                    <p className="hero-subtitle">
                        Aptivora is the high-performance HR platform designed for modern enterprises.
                        Streamline operations, optimize payroll, and empower your talent with data-driven insights.
                    </p>

                    <div className="hero-actions">
                        <a
                            href={localStorage.getItem("token") ? "/dashboard" : "/register"}
                            className="primary-btn"
                            style={{ textDecoration: 'none' }}
                        >
                            {localStorage.getItem("token") ? "Go to Dashboard" : "Get Started"}
                            <ArrowRight size={18} />
                        </a>
                    </div>
                </motion.div>

                {/* 3D Laptop Visual */}
                <motion.div
                    className="hero-visual"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <div className="laptop-container">
                        <motion.div
                            className="laptop-screen"
                            initial={{ rotateX: -90, opacity: 0 }}
                            whileInView={{ rotateX: 5, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
                            viewport={{ once: true }}
                            style={{ transformOrigin: "bottom" }}
                        >
                            <div className="screen-content">
                                {/* Simulated Dashboard UI */}
                                <div className="dash-header">
                                    <div className="dash-circle"></div>
                                    <div className="dash-line sm"></div>
                                </div>
                                <div className="dash-grid">
                                    <div className="dash-card large">
                                        <div className="chart-line"></div>
                                    </div>
                                    <div className="dash-card"></div>
                                    <div className="dash-card"></div>
                                </div>
                            </div>
                        </motion.div>
                        <div className="laptop-base"></div>
                    </div>

                    {/* Ambient Glow */}
                    <div className="visual-glow"></div>
                </motion.div>
            </div>
        </section>
    );
}
