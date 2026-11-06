import React, { useState } from 'react';
import './DoctorDashboard.css';

function DoctorDashboard({ appointments, onUpdateStatus, onAddWalkin, onExitDashboard }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [completingApt, setCompletingApt] = useState(null);
  const [prescriptionNotes, setPrescriptionNotes] = useState('');
  const [showWalkinModal, setShowWalkinModal] = useState(false);
  const [walkinForm, setWalkinForm] = useState({
    patientName: '',
    phone: '',
    age: '',
    gender: 'Female',
    treatment: 'General Dental Checkup & Consultation',
    symptoms: 'Walk-in emergency / routine check',
  });

  // Calculate Metrics
  const total = appointments.length;
  const waiting = appointments.filter((a) => a.status === 'Confirmed').length;
  const inConsult = appointments.filter((a) => a.status === 'In Consultation').length;
  const completed = appointments.filter((a) => a.status === 'Completed').length;

  // Filter & Search Logic
  const filteredAppointments = appointments.filter((apt) => {
    const matchesFilter =
      activeFilter === 'All'
        ? true
        : activeFilter === 'Waiting'
        ? apt.status === 'Confirmed'
        : apt.status === activeFilter;

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      apt.patientName.toLowerCase().includes(query) ||
      apt.phone.includes(query) ||
      apt.tokenId.toLowerCase().includes(query) ||
      apt.treatment.toLowerCase().includes(query);

    return matchesFilter && matchesSearch;
  });

  const handleStartConsultation = (aptId) => {
    onUpdateStatus(aptId, 'In Consultation');
  };

  const handleOpenCompleteModal = (apt) => {
    setCompletingApt(apt);
    setPrescriptionNotes(apt.prescription || 'Rx: Amoxicillin 500mg, Paracetamol 650mg SOS. Warm saline gargles.');
  };

  const handleConfirmCompletion = (e) => {
    e.preventDefault();
    if (completingApt) {
      onUpdateStatus(completingApt.id, 'Completed', prescriptionNotes);
      setCompletingApt(null);
    }
  };

  const handleWalkinSubmit = (e) => {
    e.preventDefault();
    if (!walkinForm.patientName || !walkinForm.phone) {
      alert('Please enter patient name and phone number');
      return;
    }
    const newWalkin = {
      id: Date.now(),
      tokenId: `SW-W${Math.floor(100 + Math.random() * 900)}`,
      ...walkinForm,
      date: new Date().toISOString().split('T')[0],
      timeSlot: 'Immediate (Walk-in)',
      doctor: 'Dr. Swasthika, BDS, MDS',
      hospital: 'Swasthi Dental Hospital',
      status: 'Confirmed',
      createdAt: new Date().toLocaleDateString(),
    };
    onAddWalkin(newWalkin);
    setShowWalkinModal(false);
    setWalkinForm({
      patientName: '',
      phone: '',
      age: '',
      gender: 'Female',
      treatment: 'General Dental Checkup & Consultation',
      symptoms: '',
    });
  };

  return (
    <div className="dashboard-container">
      {/* 1. Header Bar */}
      <div className="dashboard-header">
        <div className="dashboard-welcome">
          <div className="doc-badge-avatar">👩‍⚕️</div>
          <div>
            <h2 className="dashboard-title">Dr. Swasthika's Clinical Desk</h2>
            <p className="dashboard-subtitle">
              Swasthi Dental Hospital • Patient Queue & Electronic Health Records
            </p>
          </div>
        </div>

        <div className="dashboard-header-actions">
          <button className="btn-walkin" onClick={() => setShowWalkinModal(true)}>
            + Add Walk-in Patient
          </button>
          <button className="btn-exit-dash" onClick={onExitDashboard}>
            ← Back to Patient Portal
          </button>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="stats-grid">
        <div className="metric-card">
          <div className="metric-icon-wrap metric-icon-blue">📋</div>
          <div>
            <div className="metric-value">{total}</div>
            <div className="metric-title">Total Scheduled</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrap metric-icon-amber">⏳</div>
          <div>
            <div className="metric-value">{waiting}</div>
            <div className="metric-title">Waiting in Queue</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrap metric-icon-purple">🩺</div>
          <div>
            <div className="metric-value">{inConsult}</div>
            <div className="metric-title">In Consultation</div>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon-wrap metric-icon-green">✅</div>
          <div>
            <div className="metric-value">{completed}</div>
            <div className="metric-title">Consulted Today</div>
          </div>
        </div>
      </div>

      {/* 3. Search and Status Filters */}
      <div className="dashboard-controls">
        <div className="filter-tabs">
          {['All', 'Waiting', 'In Consultation', 'Completed', 'Cancelled'].map((tab) => (
            <button
              key={tab}
              className={`filter-tab ${activeFilter === tab ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="search-input-wrap">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search by name, token, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* 4. Patient Queue Table */}
      <div className="queue-table-card">
        {filteredAppointments.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
            <p style={{ fontSize: '16px' }}>No patients found for this criteria.</p>
          </div>
        ) : (
          <table className="queue-table">
            <colgroup>
              <col style={{ width: '11%' }} />
              <col style={{ width: '23%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '22%' }} />
              <col style={{ width: '13%' }} />
              <col style={{ width: '16%' }} />
            </colgroup>
            <thead>
              <tr>
                <th className="th-center">Token #</th>
                <th>Patient Details</th>
                <th>Slot Time</th>
                <th>Treatment</th>
                <th className="th-center">Status</th>
                <th className="th-center">Doctor Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((apt) => (
                <tr key={apt.id}>
                  <td className="td-center">
                    <span className="token-badge">{apt.tokenId}</span>
                  </td>
                  <td>
                    <div className="patient-cell">
                      <span className="patient-name">
                        {apt.patientName} {apt.age ? `(${apt.age}y / ${apt.gender || 'F'})` : ''}
                      </span>
                      <span className="patient-contact">📞 {apt.phone}</span>
                    </div>
                  </td>
                  <td>
                    <div className="slot-cell">
                      <span className="slot-date">📅 {apt.date}</span>
                      <span className="slot-time">{apt.timeSlot}</span>
                    </div>
                  </td>
                  <td>
                    <div className="treatment-cell">
                      <div className="treatment-title">{apt.treatment}</div>
                      {apt.symptoms && (
                        <div className="treatment-symptoms" title={apt.symptoms}>
                          Symptom: {apt.symptoms}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="td-center">
                    <span
                      className={`status-badge ${
                        apt.status === 'Completed'
                          ? 'status-completed'
                          : apt.status === 'In Consultation'
                          ? 'status-consulting'
                          : apt.status === 'Cancelled'
                          ? 'status-cancelled'
                          : 'status-confirmed'
                      }`}
                    >
                      ● {apt.status}
                    </span>
                  </td>
                  <td className="td-center">
                    <div className="action-buttons action-buttons-center">
                      {apt.status === 'Confirmed' && (
                        <button
                          className="btn-action-start"
                          onClick={() => handleStartConsultation(apt.id)}
                          title="Call patient into doctor cabin"
                        >
                          Call In
                        </button>
                      )}

                      {apt.status !== 'Completed' && apt.status !== 'Cancelled' && (
                        <button
                          className="btn-action-complete"
                          onClick={() => handleOpenCompleteModal(apt)}
                          title="Add prescription & mark completed"
                        >
                          Finish & Prescribe
                        </button>
                      )}

                      {apt.status === 'Completed' && (
                        <button
                          className="btn-action-complete"
                          onClick={() => handleOpenCompleteModal(apt)}
                          title="View / Edit prescription"
                        >
                          View Rx
                        </button>
                      )}

                      {apt.status !== 'Cancelled' && (
                        <button
                          className="btn-action-cancel"
                          onClick={() => onUpdateStatus(apt.id, 'Cancelled')}
                          title="Cancel appointment"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* 5. Complete Consultation & Prescription Modal */}
      {completingApt && (
        <div className="modal-overlay" onClick={() => setCompletingApt(null)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <span className="modal-icon">🩺</span>
                <div>
                  <h3>Complete Consultation & Rx</h3>
                  <p className="modal-sub">
                    Token: {completingApt.tokenId} • {completingApt.patientName}
                  </p>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setCompletingApt(null)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmCompletion} className="diag-modal-content">
              <div className="diag-summary-box">
                <div><strong>Treatment:</strong> {completingApt.treatment}</div>
                <div><strong>Reported Symptoms:</strong> {completingApt.symptoms || 'None'}</div>
                <div><strong>Doctor:</strong> Dr. Swasthika, BDS, MDS</div>
              </div>

              <div className="form-group">
                <label>Doctor's Clinical Notes & Prescription (Rx) *</label>
                <textarea
                  rows="4"
                  value={prescriptionNotes}
                  onChange={(e) => setPrescriptionNotes(e.target.value)}
                  placeholder="e.g. Tooth cavity in tooth #16. Cleaned and temporary dressing applied. Medicines prescribed: Amoxicillin 500mg, Ketorol DT."
                  required
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setCompletingApt(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Prescription & Mark Completed ✓
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Walk-in Patient Modal */}
      {showWalkinModal && (
        <div className="modal-overlay" onClick={() => setShowWalkinModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <span className="modal-icon">🚶</span>
                <div>
                  <h3>Register Walk-in Patient</h3>
                  <p className="modal-sub">Immediate Clinic Queue Registration</p>
                </div>
              </div>
              <button className="modal-close-btn" onClick={() => setShowWalkinModal(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleWalkinSubmit} className="booking-form">
              <div className="form-row-2">
                <div className="form-group">
                  <label>Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suresh V"
                    value={walkinForm.patientName}
                    onChange={(e) =>
                      setWalkinForm({ ...walkinForm, patientName: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={walkinForm.phone}
                    onChange={(e) =>
                      setWalkinForm({ ...walkinForm, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    placeholder="e.g. 32"
                    value={walkinForm.age}
                    onChange={(e) =>
                      setWalkinForm({ ...walkinForm, age: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    value={walkinForm.gender}
                    onChange={(e) =>
                      setWalkinForm({ ...walkinForm, gender: e.target.value })
                    }
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Treatment Required</label>
                <select
                  value={walkinForm.treatment}
                  onChange={(e) =>
                    setWalkinForm({ ...walkinForm, treatment: e.target.value })
                  }
                >
                  <option value="General Dental Checkup & Consultation">
                    General Dental Checkup & Consultation
                  </option>
                  <option value="Root Canal Treatment (RCT)">Root Canal Treatment (RCT)</option>
                  <option value="Scaling & Deep Teeth Cleaning">
                    Scaling & Deep Teeth Cleaning
                  </option>
                  <option value="Wisdom Tooth & Emergency Pain Relief">
                    Wisdom Tooth & Emergency Pain Relief
                  </option>
                  <option value="Laser Teeth Whitening">Laser Teeth Whitening</option>
                </select>
              </div>

              <div className="form-group">
                <label>Immediate Complaints / Symptoms</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Severe toothache since morning"
                  value={walkinForm.symptoms}
                  onChange={(e) =>
                    setWalkinForm({ ...walkinForm, symptoms: e.target.value })
                  }
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowWalkinModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  + Add to Today's Queue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorDashboard;
