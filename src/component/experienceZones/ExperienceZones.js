import { useState } from 'react';
import './ExperienceZones.css';

const ExperienceZones = () => {
  const experienceZones = [
    {
      name: "Comic Street",
      color: "#FFC107",
      description: "Publishers, Comics, Manga, Webtoons, Graphic Novels",
      image: "/2024/4.png",  // Replace with your image URL
    },
    {
      name: "Anime Street",
      color: "#F44336",
      description: "Anime Studios, Screenings, Merchandise",
      image: "/coming_soon.jpg",  // Replace with your image URL
    },
    {
      name: "Play Street",
      color: "#00BCD4",
      description: "Gaming, Board Games, Esports, AR/VR Fan Zones",
      image: "/coming_soon.jpg",  // Replace with your image URL
    },
    {
      name: "Innovation Street",
      color: "#4CAF50",
      description: "Blockchain, AI, Creator Economy, Startups & Emerging Tech",
      image: "/coming_soon.jpg",  // Replace with your image URL
    }
  ];

  const [isHovering, setIsHovering] = useState(false);

  return (
    <section id="experience-zones" className="experience-zones-container">
      {/* Background Orbs */}
      <div className="orb orb-one"></div>
      <div className="orb orb-two"></div>

      {/* Section Content */}
      <div className="experience-zones-content">
        <h2 className="section-title">Experience Zones</h2>
        <div className="zones-grid">
          {experienceZones.map((zone, index) => (
            <div
              key={index}
              className="experience-zone"
              style={{
                backgroundColor: `${zone.color}20`,
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Hover Gradient Overlay */}
              <div className="overlay"></div>

              {/* Inner Content */}
              <div className="zone-content">
                <div className="image-container">
                  <img
                    src={zone.image}
                    alt={zone.name}
                    className="zone-image"
                  />
                </div>
                <h3 className="zone-title">{zone.name}</h3>
                <p className="zone-description">{zone.description}</p>
              </div>

              {/* Bottom Accent */}
              <div className="accent" style={{ backgroundColor: zone.color }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceZones;
