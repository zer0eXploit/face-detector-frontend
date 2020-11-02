import React from "react";
import "./ImageLinkForm.css";

export default ({ onUrlInput, onSubmitClick }) => {
  return (
    <div className="pa3">
      <p className="fa3 white">
        {"This magic brain will detect one face in your images. Give it a try!"}
      </p>
      <div className="center">
        <div className="form center pa4 shadow-5 br3">
          <input
            type="text"
            className="f2 pa2 w-70 center"
            onInput={onUrlInput}
          />
          <button
            className="w-30 dib f4 link ph3 pv2 white bg-light-purple ml2 pa2"
            onClick={onSubmitClick}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};
