import React from 'react';

function DoctorProfile({ onOpenBooking }) {
  return (
    <section id="doctor" className="doctor-section">
      <div className="doctor-card">
        <div className="doctor-visual">
          <div className="doctor-badge-ribbon">Chief Dentist</div>
          <div className="doctor-avatar-circle">👩‍⚕️</div>
          <div className="doctor-exp-pill">⭐ 10+ Years Experience</div>
        </div>

        <div className="doctor-details">
          <span className="section-badge">Meet Your Specialist</span>
          <h2 className="doctor-name-heading">Dr. Swasthika</h2>
          <p className="doctor-degrees">
            BDS, MDS (Orthodontics & Aesthetic Dentistry)
          </p>

          <blockquote className="doctor-quote">
            "A healthy, confident smile can transform your personality. At Swasthi Dental Hospital, 
            our philosophy is to make every dental appointment completely painless, transparent, 
            and stress-free."
          </blockquote>

          <div className="doctor-credentials-grid">
            <div className="cred-item">
              <span className="cred-icon">🎓</span>
              <div>
                <strong>Advanced Clinical Training</strong>
                <p>Specialized in painless single-sitting RCT & invisible orthodontics</p>
              </div>
            </div>
            <div className="cred-item">
              <span className="cred-icon">🏥</span>
              <div>
                <strong>Chief Consultant</strong>
                <p>Swasthi Dental Hospital, lead aesthetic dentist & clinic director</p>
              </div>
            </div>
            <div className="cred-item">
              <span className="cred-icon">🕒</span>
              <div>
                <strong>Consultation Hours</strong>
                <p>Monday - Saturday: 9:00 AM – 8:00 PM (By Appointment)</p>
              </div>
            </div>
          </div>

          <div className="doctor-cta-row">
            <button className="btn-primary" onClick={onOpenBooking}>
              Schedule Consultation with Dr. Swasthika
            </button>
            <span className="doc-guarantee">🛡️ 100% Sterile & Hygienic Clinic</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DoctorProfile;
