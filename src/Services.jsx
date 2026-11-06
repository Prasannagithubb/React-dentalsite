import React from 'react';

const treatmentsData = [
  {
    id: 'rct',
    name: 'Root Canal Treatment (RCT)',
    icon: '⚡',
    tag: 'Single-Sitting Available',
    desc: 'Advanced rotary endodontics for quick, completely painless preservation of infected teeth.',
    duration: '45 mins • 1-2 visits',
  },
  {
    id: 'braces',
    name: 'Invisible Braces & Aligners',
    icon: '✨',
    tag: 'Orthodontic Specialty',
    desc: 'Custom transparent aligners designed by Dr. Swasthika to straighten crooked teeth discreetly.',
    duration: 'Custom treatment plan',
  },
  {
    id: 'cleaning',
    name: 'Scaling & Deep Teeth Cleaning',
    icon: '🦷',
    tag: 'Preventive Care',
    desc: 'Ultrasonic plaque & tartar removal, stain elimination, and gum health rejuvenation.',
    duration: '30 mins • Instant fresh breath',
  },
  {
    id: 'whitening',
    name: 'Laser Teeth Whitening',
    icon: '💎',
    tag: 'Cosmetic Dentistry',
    desc: 'Professional in-office laser brightening giving you up to 5-8 shades lighter in just one session.',
    duration: '45 mins • Same-day results',
  },
  {
    id: 'pediatric',
    name: 'Pediatric (Kids) Dentistry',
    icon: '🧸',
    tag: 'Child Friendly',
    desc: 'Stress-free, gentle dental exams, cavity fillings, and fluoridation in a calming atmosphere.',
    duration: 'Gentle & Patient Care',
  },
  {
    id: 'extraction',
    name: 'Wisdom Tooth & Emergency Care',
    icon: '🛡️',
    tag: 'Emergency Relief',
    desc: 'Surgical extraction of impacted wisdom teeth with local anaesthesia and rapid recovery protocols.',
    duration: 'Immediate pain relief',
  },
];

function Services({ onSelectTreatment }) {
  return (
    <section id="services" className="services-section">
      <div className="section-header">
        <span className="section-badge">Comprehensive Treatments</span>
        <h2 className="section-title">Specialized Dental Care by Dr. Swasthika</h2>
        <p className="section-desc">
          State-of-the-art procedures performed with high precision and gentle care at Swasthi Dental Hospital.
        </p>
      </div>

      <div className="services-grid">
        {treatmentsData.map((item) => (
          <div key={item.id} className="service-card">
            <div className="service-card-top">
              <span className="service-icon">{item.icon}</span>
              <span className="service-tag">{item.tag}</span>
            </div>
            <h3 className="service-name">{item.name}</h3>
            <p className="service-desc">{item.desc}</p>
            <div className="service-duration">
              <span>⏱️ {item.duration}</span>
            </div>
            <button
              className="service-book-btn"
              onClick={() => onSelectTreatment(item.name)}
            >
              Book for {item.name.split(' ')[0]} →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
