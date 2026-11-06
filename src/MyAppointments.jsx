import React from 'react';

function MyAppointments({ appointments, onCancelAppointment, onOpenBooking }) {
  return (
    <section id="my-appointments" className="appointments-section">
      <div className="section-header">
        <span className="section-badge">Patient Portal</span>
        <h2 className="section-title">My Booked Appointments</h2>
        <p className="section-desc">
          Manage your upcoming consultations with Dr. Swasthika at Swasthi Dental Hospital.
        </p>
      </div>

      {appointments.length === 0 ? (
        <div className="empty-appointments-card">
          <span className="empty-icon">📅</span>
          <h3>No Appointments Scheduled Yet</h3>
          <p>Book your first consultation with Dr. Swasthika in less than a minute.</p>
          <button className="btn-primary" onClick={onOpenBooking}>
            + Book Appointment Now
          </button>
        </div>
      ) : (
        <div className="appointments-list-grid">
          {appointments.map((apt) => (
            <div key={apt.id} className="appointment-card">
              <div className="apt-header">
                <div>
                  <span className="apt-token">Token: {apt.tokenId}</span>
                  <h4 className="apt-treatment">{apt.treatment}</h4>
                </div>
                <span className="apt-status-badge">● Confirmed</span>
              </div>

              <div className="apt-body">
                <div className="apt-meta-item">
                  <span className="meta-icon">👩‍⚕️</span>
                  <span>{apt.doctor}</span>
                </div>
                <div className="apt-meta-item">
                  <span className="meta-icon">📅</span>
                  <strong>{apt.date} at {apt.timeSlot}</strong>
                </div>
                <div className="apt-meta-item">
                  <span className="meta-icon">👤</span>
                  <span>Patient: {apt.patientName} ({apt.phone})</span>
                </div>
                {apt.symptoms && (
                  <div className="apt-symptoms">
                    <em>Symptoms: "{apt.symptoms}"</em>
                  </div>
                )}
              </div>

              <div className="apt-footer">
                <span className="apt-location">📍 Room 102, Swasthi Dental</span>
                <button
                  className="apt-cancel-btn"
                  onClick={() => onCancelAppointment(apt.id)}
                  title="Cancel this appointment"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyAppointments;
