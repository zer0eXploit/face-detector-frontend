import React from "react";
import "./Logo.css";
import brain from "./brain.png";
import Tilt from "react-tilt";

export default () => {
  return (
    <div className="ml3 mt0">
      <Tilt
        className="Tilt br2 shadow-2 pa3"
        options={{ max: 55 }}
        style={{ height: "auto", width: 150 }}
      >
        <div className="Tilt-inner">
          <img src={brain} alt="Logo" />
        </div>
      </Tilt>
    </div>
  );
};
