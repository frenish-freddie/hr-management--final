import Navbar from "../components/Navbar";
import Footer from "../components/landing/Footer";
import { motion } from "framer-motion";
import "../components/landing/NewsSection.css"; // Reuse existing styles
import { Clock } from "lucide-react";

const allNews = [
    {
        id: 1,
        title: "The Future of Remote Work Intelligence",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
        date: "Oct 12, 2025",
        readTime: "5 min read",
        excerpt: "How AI is reshaping distributed teams and ensuring productivity across time zones."
    },
    {
        id: 2,
        title: "Optimizing Payroll with AI Models",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
        date: "Sep 28, 2025",
        readTime: "8 min read",
        excerpt: "Strategies to reduce payroll errors and automate tax compliance using machine learning."
    },
    {
        id: 3,
        title: "Diversity Scanning in Recruitment",
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
        date: "Sep 15, 2025",
        readTime: "4 min read",
        excerpt: "Ensuring unbiased hiring practices with automated resume screening technology."
    },
    {
        id: 4,
        title: "Employee Wellness in the Digital Age",
        image: "https://images.unsplash.com/photo-1576267423048-15c0040fec78?auto=format&fit=crop&w=600&q=80",
        date: "Aug 30, 2025",
        readTime: "6 min read",
        excerpt: "Why mental health tracking is becoming a standard feature in modern HR platforms."
    },
    {
        id: 5,
        title: "The Rise of Data-Driven HR",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
        date: "Aug 12, 2025",
        readTime: "7 min read",
        excerpt: "Moving beyond intuition: leveraging big data to make better people decisions."
    },
    {
        id: 6,
        title: "Automating Onboarding Workflows",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
        date: "Jul 25, 2025",
        readTime: "5 min read",
        excerpt: "Seamlessly integrating new hires with automated task assignment and access provisioning."
    }
];

export default function NewsPage() {
    return (
        <div className="landing-page">
            <Navbar />

            <main style={{ paddingTop: '100px', minHeight: '100vh', paddingBottom: '80px' }}>
                <div className="news-section">
                    <div className="news-header">
                        <h2>All <span className="text-gradient-pink">Insights</span></h2>
                    </div>

                    <div className="news-grid">
                        {allNews.map((item, index) => (
                            <motion.div
                                key={item.id}
                                className="news-card"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
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
                                    <p style={{ color: '#aaa', fontSize: '0.9rem', marginBottom: '16px', lineHeight: '1.5' }}>{item.excerpt}</p>
                                    <a href="#" className="read-more">Read Article</a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
