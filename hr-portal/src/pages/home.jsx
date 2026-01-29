import Navbar from "../components/Navbar";
import HeroSection from "../components/landing/HeroSection";
import CorporateShowcase from "../components/landing/CorporateShowcase";
import FeaturesCarousel from "../components/landing/FeaturesCarousel";
import PerformanceStats from "../components/landing/PerformanceStats";
import NewsSection from "../components/landing/NewsSection";
import Footer from "../components/landing/Footer";
import "../components/Navbar.css"; // Ensure navbar styles are loaded

export default function Home() {
  return (
    <div className="landing-page">
      <Navbar /> {/* Explicitly include Navbar here for the landing page */}

      <main>
        <HeroSection />
        <CorporateShowcase />
        <FeaturesCarousel />
        <PerformanceStats />

        <NewsSection />

        {/* Talent Challenge / Call to Action Strip */}
        <section style={{
          padding: '80px 20px',
          textAlign: 'center',
          background: 'linear-gradient(90deg, #1f1f25, #141418)',
          borderTop: '1px solid #333',
          borderBottom: '1px solid #333'
        }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
            One Platform. <span className="text-gradient-pink">Infinite Potential.</span>
          </h2>
          <p style={{ color: '#aaa', maxWidth: '600px', margin: '0 auto 30px' }}>
            Join over 10,000 forward-thinking companies transforming their workforce today.
          </p>
          <a
            href={localStorage.getItem("token") ? "/dashboard" : "/register"}
            style={{
              background: 'var(--text-white)',
              color: 'black',
              padding: '12px 32px',
              borderRadius: '99px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              border: 'none',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            {localStorage.getItem("token") ? "Go to Dashboard" : "Get Started Now"}
          </a>

        </section>

      </main>

      <Footer />
    </div >
  );
}
