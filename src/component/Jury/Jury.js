import { useState } from 'react';
import './Jury.css';

const Jury = () => {
  const leaders = [
    {
      name: "Mr. Vikas Tiwari",
      description: "President, MP- AVGC-XR Association",
      color: "#FFC107",
      image: "/Vikas.png"  // Replace with your image URL
    },
    {
      name: "Mr. Sanjay Khimsera",
      description: "President, Asifa",
      color: "#F44336",
      image: "/Sanjay.png"  // Replace with your image URL
    },
  ];

  return (
    <section id="Leaders" className="jury-section">
      {/* Background Orbs */}
      <div className="orb orb-left" />
      <div className="orb orb-right" />

      {/* Section Content */}
      <div className="jury-container">
        <h2 className="jury-heading">Jury</h2>
        <div className="jury-grid">
          {leaders.map((zone, index) => (
            <div
              key={index}
              className="jury-item"
              style={{ backgroundColor: `${zone.color}20` }}
            >
              <div className="jury-hover-overlay" />
              <div className="jury-inner-content">
                <div className="jury-image-container">
                  <img
                    src={zone.image}
                    alt={zone.name}
                    className="jury-image"
                  />
                </div>
                <h3 className="jury-name">{zone.name}</h3>
                <p className="jury-description">{zone.description}</p>
              </div>
              <div className="jury-bottom-accent" style={{ backgroundColor: zone.color }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jury;
