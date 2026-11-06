import React from 'react';

function Footer({ onOpenBooking }) {
  return (
    <footer id="contact" className="portal-footer">
      <div className="footer-top">
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <span className="footer-logo">🦷</span>
            <h3>Swasthi Dental Hospital</h3>
          </div>
          <p className="footer-tagline">
            Excellence in painless oral healthcare, aesthetic smile design, and gentle treatments by Dr. Swasthika.
          </p>
          <div className="footer-emergency-box">
            <span>🚨 24/7 Dental Emergency Helpline:</span>
            <a href="tel:+919840123456" className="footer-phone">+91 98401 23456</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Clinical Hours</h4>
          <ul className="footer-list">
            <li><strong>Mon – Fri:</strong> 9:00 AM – 8:00 PM</li>
            <li><strong>Saturday:</strong> 9:00 AM – 6:30 PM</li>
            <li><strong>Sunday:</strong> On-Call Emergency Only</li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Hospital Location</h4>
          <p className="footer-address">
            📍 #42, Swasthi Towers, 1st Cross, Medical Enclave,<br />
            Near City Central Circle.<br />
            📞 Landline: (044) 2890-4321
          </p>
        </div>

        <div className="footer-col cta-col">
          <h4>Quick Action</h4>
          <p>Book your priority consultation slot with Dr. Swasthika today.</p>
          <button className="btn-primary" onClick={onOpenBooking}>
            Book Appointment
          </button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Swasthi Dental Hospital. All rights reserved. Directed by Dr. Swasthika, BDS, MDS.</p>
      </div>
    </footer>
  );
}

export default Footer;
