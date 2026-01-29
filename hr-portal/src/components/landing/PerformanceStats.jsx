import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import "./PerformanceStats.css";

function Counter({ value, label }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    // Simplified counter animation for now without heavy hooks
    return (
        <div className="stat-item" ref={ref}>
            <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="stat-value"
            >
                {value}
            </motion.h3>
            <p className="stat-label">{label}</p>
        </div>
    );
}

export default function PerformanceStats() {
    return (
        <section className="performance-section">
            <div className="tech-visual-container">
                {/* CSS-based Chip Processing Visual */}
                <div className="chip-visual">
                    <div className="chip-core">
                        <div className="core-inner">APTIVORA</div>
                        <div className="core-glow"></div>
                    </div>

                    {/* Circuit Lines */}
                    <div className="circuit-lines">
                        <div className="line line-1"></div>
                        <div className="line line-2"></div>
                        <div className="line line-3"></div>
                        <div className="line line-4"></div>
                    </div>
                </div>
            </div>

            <div className="stats-container">
                <div className="stats-header">
                    <h2>Exceptional <span className="text-gradient-pink">Processing Power</span></h2>
                    <p>Handling millions of employee records with zero latency.</p>
                </div>

                <div className="stats-grid">
                    <Counter value="148k+" label="Managed Users" />
                    <Counter value="$1M+" label="Payroll Optimized" />
                    <Counter value="99.99%" label="Uptime SLA" />
                    <Counter value="0.2s" label="Query Latency" />
                </div>
            </div>
        </section>
    );
}
