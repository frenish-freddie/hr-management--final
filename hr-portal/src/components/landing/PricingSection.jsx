import { motion } from "framer-motion";
import { Check } from "lucide-react";
import "./PricingSection.css";

const plans = [
    {
        name: "Light",
        price: "Free",
        description: "For small teams just getting started.",
        features: ["Up to 10 Employees", "Basic Analytics", "Email Support"],
        highlight: false
    },
    {
        name: "Standard",
        price: "$29",
        period: "/mo",
        description: "Perfect for growing businesses.",
        features: ["Up to 100 Employees", "Advanced performance metrics", "Priority Support", "AI Talent Insights"],
        highlight: true
    },
    {
        name: "Premium",
        price: "Custom",
        description: "For large enterprises with specific needs.",
        features: ["Unlimited Employees", "Dedicated Account Manager", "Custom Integrations", "On-premise Deployment"],
        highlight: false
    }
];

export default function PricingSection() {
    return (
        <section className="pricing-section">
            <div className="pricing-header">
                <h2>Transparent <span className="text-gradient-pink">Pricing</span></h2>
                <p>Choose the plan that fits your scale.</p>
            </div>

            <div className="pricing-grid">
                {plans.map((plan, index) => (
                    <motion.div
                        key={plan.name}
                        className={`pricing-card ${plan.highlight ? "highlight" : ""}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        {plan.highlight && <div className="popular-tag">Most Popular</div>}
                        <h3>{plan.name}</h3>
                        <div className="price-tag">
                            <span className="amount">{plan.price}</span>
                            {plan.period && <span className="period">{plan.period}</span>}
                        </div>
                        <p className="description">{plan.description}</p>

                        <ul className="features-list">
                            {plan.features.map((feat, i) => (
                                <li key={i}><Check size={16} className="check-icon" /> {feat}</li>
                            ))}
                        </ul>

                        <button className={`pricing-btn ${plan.highlight ? "primary" : "outline"}`}>
                            {plan.highlight ? "Start Trial" : "Contact Sales"}
                        </button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
