import React from "react";
import Nova from "./Nova";

const Hero = () => {
  return (
    <div className="container">
      <div>
        <Nova />
      </div>
      <div
        className="hero flex h-screen flex-col justify-center lg:mr-44"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        <div className="">
          <div className="hero-title font-['SpaceGrotesk'] text-5xl font-bold text-main-color md:text-7xl ">
            <h1 className="uppercase">we are waiting</h1>
            <h1 className="uppercase">for you</h1>
          </div>
          <p className="mt-[24px] w-2/3 max-w-[380px] font-['Inter'] text-base md:text-lg font-semibold md:font-normal text-main-color">
            It's time you stop wasting time and money on defective and futile ad campaigns.
          </p>
          <p className="mt-[24px] w-2/3 max-w-[380px] font-['Inter'] text-base md:text-lg font-semibold md:font-normal text-main-color">
          It's time you optimise your ad-budget, scale your business and grow.
          </p>
          <div className="flex gap-x-3 pt-5  font-['Inter']">
            <a href="#contact">
              <input
                type="button"
                className="btn orange-btn"
                value="Let's Chat"
              />
            </a>
            <a href="#services">
              <input
                type="button"
                className="btn border-btn normal-btn"
                value="Our services"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
