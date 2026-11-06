import React, { useState, useEffect } from 'react';

const TIME_SLOTS = [
  '09:30 AM',
  '10:30 AM',
  '11:45 AM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM',
  '06:30 PM',
  '07:30 PM',
];

const TREATMENTS_LIST = [
  'General Dental Checkup & Consultation',
  'Root Canal Treatment (RCT)',
  'Invisible Braces & Aligners',
  'Scaling & Deep Teeth Cleaning',
  'Laser Teeth Whitening',
  'Pediatric (Kids) Dentistry',
  'Wisdom Tooth & Emergency Pain Relief',
];

function AppointmentModal({ isOpen, onClose, selectedTreatment = '', onBookingSuccess }) {
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    age: '',
    gender: 'Female',
    treatment: TREATMENTS_LIST[0],
    date: new Date().toISOString().split('T')[0],
    timeSlot: TIME_SLOTS[0],
    symptoms: '',
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  useEffect(() => {
    if (selectedTreatment) {
      setFormData((prev) => ({ ...prev, treatment: selectedTreatment }));
    }
  }, [selectedTreatment]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.patientName || !formData.phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    const tokenNumber = `SW-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppointment = {
      id: Date.now(),
      tokenId: tokenNumber,
      ...formData,
      doctor: 'Dr. Swasthika, BDS, MDS',
      hospital: 'Swasthi Dental Hospital',
      status: 'Confirmed',
      createdAt: new Date().toLocaleDateString(),
    };

    setBookingConfirmed(newAppointment);
    if (onBookingSuccess) {
      onBookingSuccess(newAppointment);
    }
  };

  const handleResetAndClose = () => {
    setBookingConfirmed(null);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleResetAndClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className="modal-icon">🦷</span>
            <div>
              <h3>
                {bookingConfirmed ? 'Appointment Confirmed!' : 'Book an Appointment'}
              </h3>
              <p className="modal-sub">
                Swasthi Dental Hospital • Dr. Swasthika
              </p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={handleResetAndClose}>
            ✕
          </button>
        </div>

        {bookingConfirmed ? (
          /* Confirmation Receipt Slip */
          <div className="confirmation-card">
            <div className="confirm-badge">✓ Booking Confirmed</div>
            <div className="confirm-token">
              <span className="token-label">Appointment Token #</span>
              <span className="token-number">{bookingConfirmed.tokenId}</span>
            </div>

            <div className="confirm-details">
              <div className="confirm-row">
                <span>Doctor:</span>
                <strong>{bookingConfirmed.doctor}</strong>
              </div>
              <div className="confirm-row">
                <span>Patient Name:</span>
                <strong>{bookingConfirmed.patientName} (Age: {bookingConfirmed.age || 'N/A'})</strong>
              </div>
              <div className="confirm-row">
                <span>Treatment:</span>
                <strong>{bookingConfirmed.treatment}</strong>
              </div>
              <div className="confirm-row">
                <span>Date & Time:</span>
                <strong className="time-highlight">
                  📅 {bookingConfirmed.date} at {bookingConfirmed.timeSlot}
                </strong>
              </div>
              <div className="confirm-row">
                <span>Contact:</span>
                <strong>{bookingConfirmed.phone}</strong>
              </div>
              <div className="confirm-row">
                <span>Clinic Helpline:</span>
                <strong>+91 98401 23456</strong>
              </div>
            </div>

            <div className="confirm-footer">
              <p className="confirm-tip">
                💡 Please arrive 10 minutes prior to your slot time. Free clinic parking available.
              </p>
              <button className="btn-primary" onClick={handleResetAndClose}>
                Done & View Appointments
              </button>
            </div>
          </div>
        ) : (
          /* Appointment Booking Form */
          <form onSubmit={handleSubmit} className="booking-form">
            <div className="form-group">
              <label>Select Dental Treatment *</label>
              <select
                name="treatment"
                value={formData.treatment}
                onChange={handleChange}
                required
              >
                {TREATMENTS_LIST.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Preferred Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Doctor Assigned</label>
                <input
                  type="text"
                  value="Dr. Swasthika (Chief Dentist)"
                  disabled
                  className="input-disabled"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Select Time Slot with Dr. Swasthika *</label>
              <div className="time-slots-grid">
                {TIME_SLOTS.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    className={`time-slot-btn ${formData.timeSlot === slot ? 'active' : ''}`}
                    onClick={() => setFormData({ ...formData, timeSlot: slot })}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Patient Full Name *</label>
                <input
                  type="text"
                  name="patientName"
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.patientName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  placeholder="e.g. 28"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Describe Your Dental Symptoms / Notes (Optional)</label>
              <textarea
                name="symptoms"
                rows="2"
                placeholder="e.g. Pain in right lower molar while chewing, sensitivity to cold"
                value={formData.symptoms}
                onChange={handleChange}
              />
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-cancel" onClick={handleResetAndClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Confirm Appointment with Dr. Swasthika →
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AppointmentModal;
