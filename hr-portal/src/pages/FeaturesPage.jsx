import Navbar from "../components/Navbar";
import Footer from "../components/landing/Footer";
import { motion } from "framer-motion";
import { Users, BarChart2, DollarSign, Shield, Zap, Globe, CheckCircle } from "lucide-react";
import "../components/landing/FeaturesCarousel.css"; // Reuse feature card styles

const detailedFeatures = [
    {
        id: 1,
        title: "Workforce Analytics",
        description: "Gain partial visibility into employee performance. Identify top performers and flight risks before they impact your bottom line.",
        icon: BarChart2,
        color: "#FF2E63",
        benefits: ["Retention Heatmaps", "Productivity Trends", "Salary Benchmarking"]
    },
    {
        id: 2,
        title: "Strategic Funding",
        description: "AI-driven budget allocation ensures every dollar spent on talent acquisition yields maximum ROI.",
        icon: DollarSign,
        color: "#08D9D6",
        benefits: ["Budget Forecasting", "ROI Analysis", "Cost Center Tracking"]
    },
    {
        id: 3,
        title: "Global Compliance",
        description: "Navigate international labor laws with confidence. Our automated system updates regulations in real-time.",
        icon: Globe,
        color: "#9D00FF",
        benefits: ["GDPR Compliance", "Local Tax Rules", "Contract Templates"]
    },
    {
        id: 4,
        title: "Talent Security",
        description: "Enterprise-grade encryption and access controls to keep sensitive personnel data secure at all times.",
        icon: Shield,
        color: "#FF2E63",
        benefits: ["SSO Integration", "Audit Logs", "Role-Based Access"]
    },
    {
        id: 5,
        title: "Team Velocity",
        description: "Integrated project management tools allow you to track sprint velocity alongside HR metrics.",
        icon: Zap,
        color: "#F59E0B",
        benefits: ["Sprint Tracking", "Burn-down Charts", "Resource Allocation"]
    },
    {
        id: 6,
        title: "Culture Pulse",
        description: "Measure organizational health with automated sentiment analysis surveys and feedback loops.",
        icon: Users,
        color: "#08D9D6",
        benefits: ["eNPS Score", "Anonymous Feedback", "Engagement Surveys"]
    }
];

export default function FeaturesPage() {
    return (
        <div className="landing-page">
            <Navbar />

            <main style={{ paddingTop: '120px', minHeight: '100vh', paddingBottom: '80px', maxWidth: '1280px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>
                        Platform <span className="text-gradient-pink">Capabilities</span>
                    </h1>
                    <p style={{ color: '#aaa', maxWidth: '600px', margin: '0 auto' }}>
                        Explore the full suite of tools designed to elevate your workforce management.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
                    {detailedFeatures.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            style={{
                                background: 'rgba(30, 30, 35, 0.6)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '20px',
                                padding: '40px'
                            }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="card-icon-wrapper" style={{ borderColor: feature.color, marginBottom: '24px' }}>
                                <feature.icon size={32} color={feature.color} />
                            </div>
                            <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '16px' }}>{feature.title}</h3>
                            <p style={{ color: '#aaa', lineHeight: '1.6', marginBottom: '24px' }}>{feature.description}</p>

                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {feature.benefits.map((benefit, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f8fafc', fontSize: '0.9rem' }}>
                                        <CheckCircle size={16} color={feature.color} /> {benefit}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
