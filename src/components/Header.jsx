import CustomCalendlyButton from "./CustomCalendlyButton";

const Header = () => {

  return (
    <div className="absolute top-0 left-0 w-full h-[100px] z-[2]">
      <div className="container flex items-center justify-between">
        <div className="flex flex-row items-center justify-center">
          <div className="">
            <a href="/">
              <img
                src="/images/Logo/mark.png"
                className="w-[60px] h-[60px]"
                alt="logo"
              />
            </a>
          </div>
        </div>
        <div className="flex flex-row font-['Inter'] text-base">
          <a className="btn" href="#services">
            Our services
          </a>
          <CustomCalendlyButton
            url="https://calendly.com/fusion-media.com/30min"
            txt="Speak to our team"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
