import React from 'react';
import './Drawer.css';

function Drawer({ isOpen, onClose, onOpenBooking, appointmentsCount = 0, onOpenDoctorDashboard }) {
  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠', href: '#home' },
    { id: 'doctor-dash', label: "Dr. Swasthika's Desk (Dashboard)", icon: '📊', action: 'doctor' },
    { id: 'services', label: 'Dental Treatments', icon: '🩺', href: '#services' },
    { id: 'doctor', label: 'About Dr. Swasthika', icon: '👩‍⚕️', href: '#doctor' },
    { id: 'booking', label: 'Book Appointment', icon: '📅', action: 'book' },
    { id: 'my-bookings', label: `My Appointments (${appointmentsCount})`, icon: '📋', href: '#my-appointments' },
    { id: 'contact', label: 'Contact & Timings', icon: '📞', href: '#contact' },
  ];

  const handleItemClick = (item) => {
    onClose();
    if (item.action === 'book') {
      onOpenBooking();
    } else if (item.action === 'doctor') {
      onOpenDoctorDashboard();
    }
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`drawer-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />

      {/* Left-side Drawer */}
      <aside className={`drawer ${isOpen ? 'open' : ''}`}>
        {/* 1. Header */}
        <div className="drawer-header">
          <div className="drawer-brand">
            <span className="drawer-logo">🦷</span>
            <div>
              <h3>Swasthi Dental</h3>
              <span className="drawer-sub">Hospital & Clinic</span>
            </div>
          </div>
          <button
            className="drawer-close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* 2. List */}
        <nav className="drawer-content">
          <ul className="drawer-list">
            {menuItems.map((item) => (
              <li key={item.id} className="drawer-list-item">
                <a
                  href={item.href || '#'}
                  onClick={(e) => {
                    if (item.action) e.preventDefault();
                    handleItemClick(item);
                  }}
                >
                  <span className="drawer-item-icon">{item.icon}</span>
                  <span className="drawer-item-text">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Quick Doctor Info Pill */}
          <div className="drawer-doctor-pill">
            <div className="doc-avatar">👩‍⚕️</div>
            <div>
              <div className="doc-name">Dr. Swasthika</div>
              <div className="doc-spec">BDS, MDS • Chief Dentist</div>
              <div className="doc-avail">● Available Today (9 AM - 8 PM)</div>
            </div>
          </div>
        </nav>

        {/* 3. Footer */}
        <div className="drawer-footer">
          <div className="drawer-emergency">
            <span className="emergency-badge">🚨 Dental Emergency</span>
            <a href="tel:+919840123456" className="emergency-phone">
              +91 98401 23456
            </a>
            <span className="emergency-note">24/7 Trauma & Toothache Support</span>
          </div>

          <button
            className="drawer-cta-btn"
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
          >
            Book Appointment Now
          </button>
        </div>
      </aside>
    </>
  );
}

export default Drawer;
