import React from 'react';

function Navbar({
  onOpenDrawer,
  onOpenBooking,
  appointmentsCount = 0,
  currentView,
  onToggleView,
}) {
  return (
    <header className="navbar-container">
      <div className="navbar-left">
        <button
          className="drawer-toggle-btn"
          onClick={onOpenDrawer}
          aria-label="Open navigation menu"
        >
          <div className="hamburger-bars">
            <span className="bar bar-1"></span>
            <span className="bar bar-2"></span>
            <span className="bar bar-3"></span>
          </div>
          <span className="menu-text">Menu</span>
        </button>

        <a href="#home" className="navbar-brand">
          <span className="brand-logo">🦷</span>
          <div className="brand-info">
            <h1 className="brand-title">Swasthi Dental Hospital</h1>
            <p className="brand-doctor">Dr. Swasthika, BDS, MDS • Chief Dentist</p>
          </div>
        </a>
      </div>

      <nav className="navbar-links">
        <a href="#home">Home</a>
        <a href="#services">Treatments</a>
        <a href="#doctor">Dr. Swasthika</a>
        <a href="#my-appointments" className="nav-my-bookings">
          My Bookings {appointmentsCount > 0 && <span className="nav-badge">{appointmentsCount}</span>}
        </a>
      </nav>

      <div className="navbar-right">
        {/* Toggle between Patient Portal and Doctor Dashboard */}
        <button
          className="nav-doctor-toggle"
          onClick={onToggleView}
          title="Switch view between Doctor Portal and Patient View"
        >
          {currentView === 'doctor' ? '👤 Patient View' : '👩‍⚕️ Doctor Desk'}
        </button>

        <a href="tel:+919840123456" className="nav-emergency">
          <span className="emergency-dot"></span>
          <span className="emergency-label">Helpline: +91 98401 23456</span>
        </a>

        {currentView === 'patient' && (
          <button className="nav-book-btn" onClick={onOpenBooking}>
            📅 Book Appointment
          </button>
        )}
      </div>
    </header>
  );
}

export default Navbar;