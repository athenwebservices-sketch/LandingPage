import React from 'react';
import './Awards.css';

const Awards = () => {
  const awardsData = [
    {
      name: "Comics Awards 2025",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSfwYAJwoOi7jWKvV2sW6z2TV80uoV4CU5OOiFmdXjsLlFDBEA/viewform?usp=header",
      color: "from-[#3c0052] to-[#3c0052]",
    },
    {
      name: "Animation Awards 2025",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSdhQ_ecD4jqbEpl25O4fa5PKUY7H6mNjcjoNicrKR2wOAcQBA/viewform?usp=header",
      color: "from-[#3c0052] to-[#3c0052]",
    },
    {
      name: "Gaming Awards 2025",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSdhQ_ecD4jqbEpl25O4fa5PKUY7H6mNjcjoNicrKR2wOAcQBA/viewform?usp=header",
      color: "from-[#3c0052] to-[#3c0052]",
    },
    {
      name: "Special Category Awards 2025",
      link: "https://docs.google.com/forms/d/e/1FAIpQLSdWxEblCh_nEGUJ5HSefC70Q0aigC_yGUo7WHDcQDPHbUeLFg/viewform?usp=header",
      color: "from-[#3c0052] to-[#3c0052]",
    }
  ];

  return (
    <section className="awards-section" id="Awards">
      <div className="container">
        <h2 className="section-title">Creator Street Awards</h2>
        <div className="awards-grid">
          {awardsData.map((award, index) => (
            <div key={index} className="award-card">
              <div
                className={`award-card-overlay ${award.color}`}
              />
              <div className="award-card-content">
                <h3 className="award-title">{award.name}</h3>
                <a
                  href={award.link}
                  className="register-btn"
                >
                  Register Now →
                </a>
              </div>
              <div
                className={`award-card-bottom ${award.color}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
