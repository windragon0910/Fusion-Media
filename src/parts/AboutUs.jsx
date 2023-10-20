const About = () => {
  // const leftImage = "/images/avatar.png";

  return (
    <div className="text-mainf container flex flex-col items-center justify-center md:flex-row py-20 lg:py-32">
      <div id="paragraph" className="w-full">
        <div className="my-0">
          <p className="title">About Us</p>

          <p class="mx-auto max-w-[790px] text-center text-base text-[#4D5761] md:text-xl md:line-h">
            Your success is our success. Here at Fusion Media, you will grow. We are your social media partners, committed to helping you eliminate any and all inefficiencies that corrupt most businesses within the field.

            We provide a solution to your inability to produce more clients and more orders.
            <br></br>
            Isn't that you? - We'd like to find out.
          </p>
        </div>
        <div className="flex justify-center font-['Inter'] mt-3">
          <a href="#contact">
            <input
              type="button"
              className="btn orange-btn"
              value="Let's Chat"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
