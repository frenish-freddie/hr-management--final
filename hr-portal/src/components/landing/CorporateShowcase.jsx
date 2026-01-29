import { motion, useScroll, useTransform } from "framer-motion";
import { Building2, Users, Globe, TrendingUp } from "lucide-react";
import "./CorporateShowcase.css";

export default function CorporateShowcase() {
    const { scrollYProgress } = useScroll();

    // Parallax effect for the background image
    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

    const stats = [
        { icon: Building2, value: "500+", label: "Enterprise Clients" },
        { icon: Users, value: "2M+", label: "Active Users" },
        { icon: Globe, value: "50+", label: "Countries" },
        { icon: TrendingUp, value: "99.9%", label: "Uptime SLA" }
    ];

    return (
        <section className="corporate-showcase">
            {/* Parallax Background */}
            <motion.div
                className="showcase-background"
                style={{ y }}
            >
                <div className="background-overlay"></div>
            </motion.div>

            <div className="showcase-content">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="showcase-header"
                >
                    <h2>Trusted by <span className="text-gradient-pink">Global Leaders</span></h2>
                    <p>Powering HR operations for the world's most innovative companies</p>
                </motion.div>

                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="stat-card"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div className="stat-icon-wrapper">
                                <stat.icon size={32} />
                            </div>
                            <h3 className="stat-value">{stat.value}</h3>
                            <p className="stat-label">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Animated Company Logos Marquee */}
                <motion.div
                    className="company-logos"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="logos-track">
                        {["TECH CORP", "INNOVATE", "GLOBAL INC", "FUTURE CO", "SYNERGY"].map((company, i) => (
                            <div key={i} className="logo-item">{company}</div>
                        ))}
                        {/* Duplicate for seamless loop */}
                        {["TECH CORP", "INNOVATE", "GLOBAL INC", "FUTURE CO", "SYNERGY"].map((company, i) => (
                            <div key={`dup-${i}`} className="logo-item">{company}</div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
