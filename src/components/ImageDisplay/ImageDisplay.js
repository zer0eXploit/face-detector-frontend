import React from "react";
import "./imageDisplay.css";

export default ({ imageUrl, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="imgToDetect"
          src={imageUrl}
          alt=""
          width="500px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            left: box.leftBar,
            right: box.rightBar,
            top: box.topBar,
            bottom: box.bottomBar
          }}
        ></div>
      </div>
    </div>
  );
};
