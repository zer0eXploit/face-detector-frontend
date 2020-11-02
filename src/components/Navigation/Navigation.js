import React from "react";

export default ({ onRouteChange, isSignedIn, route }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => {
            onRouteChange("signIn");
          }}
          className="f3 pa3 pointer black dim link underline white"
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        {route !== "signIn" ? (
          <p
            onClick={() => {
              onRouteChange("signIn");
            }}
            className="f3 pa3 pointer black dim link underline white"
          >
            Sign In
          </p>
        ) : (
          <p
            onClick={() => {
              onRouteChange("register");
            }}
            className="f3 pa3 pointer black dim link underline white"
          >
            Register
          </p>
        )}
      </nav>
    );
  }
};
