import React from "react";

export default ({ name, entries }) => {
  return (
    <div>
      <div className="white f3">
        <p>
          {`${name}, your entries count is ... `}{" "}
          <span className="f2">{entries}</span>
        </p>
      </div>
    </div>
  );
};
