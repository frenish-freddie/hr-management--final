import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, X } from "lucide-react";
import "./NewsSection.css";
import { Link } from "react-router-dom";

const news = [
    {
        id: 1,
        title: "The Future of Remote Work Intelligence",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
        date: "Oct 12, 2025",
        readTime: "5 min read",
        content: "Remote work is no longer a trend; it's a fundamental shift in how businesses operate. Our latest AI-driven intelligence tools analyze productivity patterns across time zones, ensuring that your distributed teams remain cohesive and efficient. By leveraging data from millions of work hours, Aptivora provides actionable insights into employee well-being and project velocity, helping you build a resilient, future-proof workforce."
    },
    {
        id: 2,
        title: "Optimizing Payroll with AI Models",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
        date: "Sep 28, 2025",
        readTime: "8 min read",
        content: "Payroll errors can cost companies millions annually. Aptivora's new AI models detect anomalies in real-time, automating tax compliance across 50+ jurisdictions. This article explores how machine learning algorithms predict cash flow requirements and flag discrepancies before they become compliance issues, saving HR teams countless hours of manual auditing."
    },
    {
        id: 3,
        title: "Diversity Scanning in Recruitment",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
        date: "Sep 15, 2025",
        readTime: "4 min read",
        content: "Unconscious bias remains a significant hurdle in modern recruitment. Our updated Diversity Scanner acts as a neutral arbiter, analyzing resumes for skills and potential without the noise of demographic bias. We discuss the ethical implications of AI in hiring and how Aptivora is setting a new standard for fair, merit-based talent acquisition."
    }
];

export default function NewsSection() {
    const [selectedArticle, setSelectedArticle] = useState(null);

    return (
        <section className="news-section">
            <div className="news-header">
                <h2>Latest <span className="text-gradient-pink">Insights</span></h2>
                <Link to="/news" className="view-all-btn">View All Articles <ArrowRight size={16} /></Link>
            </div>

            <div className="news-grid">
                {news.map((item, index) => (
                    <motion.div
                        key={item.id}
                        className="news-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <div className="news-image">
                            <img src={item.image} alt={item.title} />
                            <div className="news-overlay"></div>
                        </div>
                        <div className="news-content">
                            <div className="news-meta">
                                <span>{item.date}</span>
                                <span className="dot">•</span>
                                <span className="read-time"><Clock size={12} /> {item.readTime}</span>
                            </div>
                            <h3>{item.title}</h3>
                            <button
                                onClick={() => setSelectedArticle(item)}
                                className="read-more"
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                            >
                                Read Article
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {selectedArticle && (
                    <div className="article-modal-backdrop" onClick={() => setSelectedArticle(null)}>
                        <motion.div
                            className="article-modal-content"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="close-modal-btn" onClick={() => setSelectedArticle(null)}>
                                <X size={24} />
                            </button>
                            <img src={selectedArticle.image} alt={selectedArticle.title} className="modal-image" />
                            <div className="modal-body">
                                <div className="news-meta">
                                    <span>{selectedArticle.date}</span>
                                    <span className="dot">•</span>
                                    <span>{selectedArticle.readTime}</span>
                                </div>
                                <h2>{selectedArticle.title}</h2>
                                <p>{selectedArticle.content}</p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
