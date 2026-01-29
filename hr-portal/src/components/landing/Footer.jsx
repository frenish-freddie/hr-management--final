import { motion } from "framer-motion";
import "./Footer.css";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <h2 className="footer-logo">Aptivora</h2>
                    <p>The operating system for modern workforce.</p>
                </div>

                <div className="footer-links">
                    <div className="footer-col">
                        <h4>Product</h4>
                        <ul>
                            <li>Features</li>
                            <li>Integrations</li>
                            <li>Enterprise</li>
                            <li>Success Stories</li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Company</h4>
                        <ul>
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Press</li>
                            <li>Contact</li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Resources</h4>
                        <ul>
                            <li>Blog</li>
                            <li>Community</li>
                            <li>Help Center</li>
                            <li>API Docs</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© 2026 Aptivora Inc. All rights reserved.</p>
                <div className="social-links">
                    <span>Twitter</span>
                    <span>LinkedIn</span>
                    <span>GitHub</span>
                </div>
            </div>
        </footer>
    );
}
