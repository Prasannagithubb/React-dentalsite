import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Navbar';
import Drawer from './Drawer';
import Hero from './Hero';
import Services from './Services';
import DoctorProfile from './DoctorProfile';
import MyAppointments from './MyAppointments';
import AppointmentModal from './AppointmentModal';
import DoctorDashboard from './DoctorDashboard';
import Footer from './Footer';

const TODAY = new Date().toISOString().split('T')[0];

const INITIAL_DEMO_APPOINTMENTS = [
  {
    id: 101,
    tokenId: 'SW-1042',
    patientName: 'Ananya Sharma',
    phone: '9840212345',
    age: '26',
    gender: 'Female',
    treatment: 'Root Canal Treatment (RCT)',
    date: TODAY,
    timeSlot: '10:30 AM',
    symptoms: 'Mild tooth sensitivity on lower left molar',
    doctor: 'Dr. Swasthika, BDS, MDS',
    hospital: 'Swasthi Dental Hospital',
    status: 'In Consultation',
    prescription: 'Access cavity prepared under local anesthesia. Working length determined. Next sitting for obturation.',
    createdAt: new Date().toLocaleDateString(),
  },
  {
    id: 102,
    tokenId: 'SW-2190',
    patientName: 'Karthik Raja',
    phone: '9789123456',
    age: '31',
    gender: 'Male',
    treatment: 'Scaling & Deep Teeth Cleaning',
    date: TODAY,
    timeSlot: '11:45 AM',
    symptoms: 'Tartar buildup and bleeding gums while brushing',
    doctor: 'Dr. Swasthika, BDS, MDS',
    hospital: 'Swasthi Dental Hospital',
    status: 'Confirmed',
    createdAt: new Date().toLocaleDateString(),
  },
  {
    id: 103,
    tokenId: 'SW-3388',
    patientName: 'Priya Sundaram',
    phone: '9444567890',
    age: '22',
    gender: 'Female',
    treatment: 'Invisible Braces & Aligners',
    date: TODAY,
    timeSlot: '09:30 AM',
    symptoms: 'Orthodontic alignment checkup',
    doctor: 'Dr. Swasthika, BDS, MDS',
    hospital: 'Swasthi Dental Hospital',
    status: 'Completed',
    prescription: 'Tray #4 delivered. Wear 22 hrs daily. Use chewie for 5 mins after insertion. Next review in 2 weeks.',
    createdAt: new Date().toLocaleDateString(),
  },
  {
    id: 104,
    tokenId: 'SW-4521',
    patientName: 'Rahul Verma',
    phone: '9820345678',
    age: '29',
    gender: 'Male',
    treatment: 'Laser Teeth Whitening',
    date: TODAY,
    timeSlot: '02:00 PM',
    symptoms: 'Pre-wedding smile makeover consultation',
    doctor: 'Dr. Swasthika, BDS, MDS',
    hospital: 'Swasthi Dental Hospital',
    status: 'Confirmed',
    createdAt: new Date().toLocaleDateString(),
  },
];

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [currentView, setCurrentView] = useState('patient'); // 'patient' | 'doctor'

  // Persist appointments in localStorage
  const [appointments, setAppointments] = useState(() => {
    try {
      const saved = localStorage.getItem('swasthi_appointments_v2');
      return saved ? JSON.parse(saved) : INITIAL_DEMO_APPOINTMENTS;
    } catch {
      return INITIAL_DEMO_APPOINTMENTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('swasthi_appointments_v2', JSON.stringify(appointments));
    } catch {
      // ignore
    }
  }, [appointments]);

  const handleOpenBooking = (treatment = '') => {
    setSelectedTreatment(treatment);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (newAppointment) => {
    setAppointments((prev) => [newAppointment, ...prev]);
  };

  const handleCancelAppointment = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment with Dr. Swasthika?')) {
      handleUpdateStatus(id, 'Cancelled');
    }
  };

  const handleUpdateStatus = (aptId, newStatus, prescriptionNotes = '') => {
    setAppointments((prev) =>
      prev.map((apt) => {
        if (apt.id === aptId) {
          return {
            ...apt,
            status: newStatus,
            ...(prescriptionNotes ? { prescription: prescriptionNotes } : {}),
          };
        }
        return apt;
      })
    );
  };

  const handleAddWalkin = (newWalkin) => {
    setAppointments((prev) => [newWalkin, ...prev]);
  };

  return (
    <div className="portal-app">
      {/* 1. Left Drawer with River Flow Animation */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpenBooking={() => handleOpenBooking()}
        onOpenDoctorDashboard={() => {
          setCurrentView('doctor');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        appointmentsCount={appointments.length}
      />

      {/* 2. Top Navigation Bar */}
      <Navbar
        onOpenDrawer={() => setIsDrawerOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
        appointmentsCount={appointments.length}
        currentView={currentView}
        onToggleView={() => {
          setCurrentView((prev) => (prev === 'patient' ? 'doctor' : 'patient'));
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 3. Main Content: Patient Portal OR Doctor Desk */}
      <main className="portal-main">
        {currentView === 'doctor' ? (
          <DoctorDashboard
            appointments={appointments}
            onUpdateStatus={handleUpdateStatus}
            onAddWalkin={handleAddWalkin}
            onExitDashboard={() => setCurrentView('patient')}
          />
        ) : (
          <>
            {/* Hero Section */}
            <Hero onOpenBooking={() => handleOpenBooking()} />

            {/* Dental Treatments Grid */}
            <Services onSelectTreatment={(treatmentName) => handleOpenBooking(treatmentName)} />

            {/* Doctor Profile (Dr. Swasthika) */}
            <DoctorProfile onOpenBooking={() => handleOpenBooking()} />

            {/* Patient's Booked Appointments */}
            <MyAppointments
              appointments={appointments}
              onCancelAppointment={handleCancelAppointment}
              onOpenBooking={() => handleOpenBooking()}
            />
          </>
        )}
      </main>

      {/* 4. Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* 5. Interactive Appointment Booking Modal */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedTreatment={selectedTreatment}
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
}

export default App;
