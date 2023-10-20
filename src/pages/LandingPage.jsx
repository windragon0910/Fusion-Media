import React from "react";
import Hero from "../components/Hero";
import About from "../parts/About";
import AboutUs from "../parts/AboutUs";
import Contact from "../parts/Contact";
import Services from "../parts/Services";

import Aos from "aos";
import "aos/dist/aos.css";

const LandingPage = () => {
  Aos.init();

  return (
    <div>
      <Hero />
      <AboutUs />
      <About />
      <Services />
      <Contact />
    </div>
  );
};

export default LandingPage;
