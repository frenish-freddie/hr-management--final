import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Users, BarChart2, DollarSign, Shield, Zap, Globe, X, Check } from "lucide-react";
import "./FeaturesCarousel.css";
import { Link } from "react-router-dom";

const features = [
    {
        id: 1,
        title: "Workforce Analytics",
        description: "Real-time insights into employee performance and engagement trends.",
        icon: BarChart2,
        color: "#FF2E63",
        details: [
            "Predictive Attrition Modeling: Identify flight risks before they leave.",
            "Performance Heatmaps: Visualize high-performing teams instantly.",
            "Salary Benchmarking: Compare compensation against real-time market data.",
            "Diversity & Inclusion Metrics: Track progress towards D&I goals."
        ]
    },
    {
        id: 2,
        title: "Strategic Funding",
        description: "AI-driven budget allocation for talent acquisition and retention.",
        icon: DollarSign,
        color: "#08D9D6",
        details: [
            "Smart Budget Allocation: AI suggests optimal spend across departments.",
            "ROI Calculator: Measure the financial impact of every hire.",
            "Cost Center Tracking: Granular visibility into operational expenses.",
            "Forecasting: Predict future headcount costs with 95% accuracy."
        ]
    },
    {
        id: 3,
        title: "Global Compliance",
        description: "Automated adherence to international labor laws and regulations.",
        icon: Globe,
        color: "#9D00FF",
        details: [
            "Auto-Policy Updates: System updates automatically when laws change.",
            "Multi-Jurisdiction Support: Compliant contracts for 150+ countries.",
            "Document Management: Securely store tax forms, visas, and contracts.",
            "Audit Trails: Complete history of all compliance-related actions."
        ]
    },
    {
        id: 4,
        title: "Talent Security",
        description: "Enterprise-grade encryption for sensitive personnel data.",
        icon: Shield,
        color: "#FF2E63",
        details: [
            "SOC 2 Type II Certified: Military-grade security infrastructure.",
            "Role-Based Access Control: Granular permissions for every user.",
            "SSO Integration: Seamless login with Okta, Google, and Azure AD.",
            "Data Encryption: All PII is encrypted at rest and in transit."
        ]
    },
    {
        id: 5,
        title: "Team Velocity",
        description: "Track and optimize sprint velocity with integrated project tools.",
        icon: Zap,
        color: "#F59E0B",
        details: [
            "Sprint Pulse: Real-time velocity tracking linked to HR data.",
            "Burnout Detection: AI flags teams at risk of overwork.",
            "Resource Allocation: Optimize headcount based on project load.",
            "Goal Alignment: Cascading OKRs from company to individual level."
        ]
    },
    {
        id: 6,
        title: "Culture Pulse",
        description: "Measure organizational health with automated sentiment analysis.",
        icon: Users,
        color: "#08D9D6",
        details: [
            "eNPS Tracking: Automated recurring engagement surveys.",
            "Sentiment Analysis: NLP analyzes open-ended feedback for trends.",
            "Peer Recognition: Integrated tools for celebrating wins.",
            "Culture Drivers: Identify key factors driving retention."
        ]
    }
];

export default function FeaturesCarousel() {
    const scrollRef = useRef(null);
    const [selectedFeature, setSelectedFeature] = useState(null);

    return (
        <section className="features-section">
            <div className="features-header">
                <h2 className="section-title">
                    Powering the <span className="text-gradient-pink">Modern Workplace</span>
                </h2>
                <p className="section-subtitle">
                    Everything you need to manage your people, all in one high-performance platform.
                </p>
            </div>

            <div className="carousel-container" ref={scrollRef}>
                <div className="carousel-track">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            className="feature-card"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="card-icon-wrapper" style={{ borderColor: feature.color }}>
                                <feature.icon size={32} color={feature.color} />
                            </div>
                            <h3>{feature.title}</h3>
                            <p>{feature.description}</p>
                            <button
                                className="card-link"
                                onClick={() => setSelectedFeature(feature)}
                                style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                            >
                                Explore →
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedFeature && (
                    <div className="feature-modal-backdrop" onClick={() => setSelectedFeature(null)}>
                        <motion.div
                            className="feature-modal-content"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="close-feature-modal" onClick={() => setSelectedFeature(null)}>
                                <X size={24} />
                            </button>

                            <div className="feature-modal-header">
                                <div className="modal-icon-large" style={{ background: `${selectedFeature.color}20`, color: selectedFeature.color }}>
                                    <selectedFeature.icon size={48} />
                                </div>
                                <h2>{selectedFeature.title}</h2>
                                <p>{selectedFeature.description}</p>
                            </div>

                            <div className="feature-details-list">
                                {selectedFeature.details.map((detail, i) => (
                                    <div key={i} className="detail-item">
                                        <div className="check-icon">
                                            <Check size={16} color={selectedFeature.color} />
                                        </div>
                                        <span>{detail}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="feature-modal-cta" style={{ background: selectedFeature.color }}>
                                Get Started with {selectedFeature.title}
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
