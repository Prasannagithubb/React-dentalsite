import React from 'react';

function Hero({ onOpenBooking }) {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <div className="hero-badge">
          <span>✨ Welcome to Swasthi Dental Hospital</span>
        </div>

        <h2 className="hero-title">
          Gentle, Painless & Modern <span className="highlight-text">Dental Care</span>
        </h2>

        <p className="hero-desc">
          Led by <strong>Dr. Swasthika</strong> (BDS, MDS), our clinic brings world-class 
          oral healthcare, advanced aesthetic smile makeovers, and gentle treatment 
          for your entire family.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={onOpenBooking}>
            📅 Book Your Appointment
          </button>
          <a href="#services" className="btn-secondary">
            View Dental Treatments ↓
          </a>
        </div>

        {/* Key Hospital Highlights */}
        <div className="hero-stats">
          <div className="stat-card">
            <span className="stat-number">10+</span>
            <span className="stat-label">Years of Experience</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">5,000+</span>
            <span className="stat-label">Smiles Transformed</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">4.9 ★</span>
            <span className="stat-label">Patient Rating</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">100%</span>
            <span className="stat-label">Painless Tech</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
