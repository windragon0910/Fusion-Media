import React, { useState } from "react";
import { PopupModal } from "react-calendly";

const CustomCalendlyButton = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="btn orange-btn border-btn"
        onClick={() => setIsOpen(true)}
      >
        {props.txt}
      </button>
      {isOpen && (
        <PopupModal
          url = "https://calendly.com/fusionmedia.org/30min"
          pageSettings={props.pageSettings}
          utm={props.utm}
          prefill={props.prefill}
          onModalClose={() => setIsOpen(false)}
          open = {isOpen}
          rootElement={document.getElementById("root")}
        />
      )}
    </>
  )
}

export default CustomCalendlyButton;