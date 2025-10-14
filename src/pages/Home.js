import React from 'react';
import Navbar from '../component/navbar/Navbar.js';
import Hero from  '../component/hero/Hero.js';
import Awards from  '../component/awards/Awards.js'
import Jury from  '../component/Jury/Jury.js'
const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero/>
      <Awards/>
      <Jury/>
    </div>
  );
};

export default Home;
