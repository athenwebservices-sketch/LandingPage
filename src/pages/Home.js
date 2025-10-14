import React from 'react';
import Navbar from '../component/navbar/Navbar.js';
import Hero from  '../component/hero/Hero.js';
import Awards from  '../component/awards/Awards.js'
import Jury from  '../component/jury/Jury.js'
import Cosplay from '../component/cosplay/Cosplay.js'
import ExperienceZones from '../component/experienceZones/ExperienceZones.js'
import PastEvents from '../component/pastEvents/PastEvents.js';
import Ticket from '../component/tickets/Tickets.js';
import Social from '../component/social/Social.js';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero/>
      <Awards/>
      <Jury/>
      <Cosplay/>
      <ExperienceZones/>
      <PastEvents/>
      <Ticket/>
    </div>
  );
};

export default Home;
