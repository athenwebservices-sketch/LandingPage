import React from 'react';
import Navbar from '../component/navbar/Navbar.js';
import Hero from '../component/hero/Hero.js';
import Awards from '../component/awards/Awards.js';
import Jury from '../component/jury/Jury.js';
import Cosplay from '../component/cosplay/Cosplay.js';
import ExperienceZones from '../component/experienceZones/ExperienceZones.js';
import PastEvents from '../component/pastEvents/PastEvents.js';
import Ticket from '../component/tickets/Tickets.js';
import Social from '../component/social/Social.js';
import Footer from '../component/footer/Footer.js';

const Home = () => {
  return (
    <div className="cs-home">
      <Navbar />
      <main className="cs-home-main">
        <Hero />
        <Awards />
        <Jury />
        <Cosplay />
        <ExperienceZones />
        <PastEvents />
        <Ticket />
        <Social />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
