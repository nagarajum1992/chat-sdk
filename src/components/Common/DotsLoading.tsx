import React from "react";

const BouncingDotsLoader = () => {
  const loaderStyle = {
    display: "flex",
    justifyContent: "center",
  };

  const dotStyle = {
    width: "10px",
    height: "10px",
    margin: "3px 6px",
    borderRadius: "50%",
    backgroundColor: "#a3a1a1",
    opacity: 1,
    animation: "bouncing-loader 0.6s infinite alternate",
  };

  const bounceAnimation = {
    "@keyframes bouncing-loader": {
      to: {
        opacity: 0.1,
        transform: "translateY(-16px)",
      },
    },
  };

  return (
    <div style={loaderStyle}>
      <div style={{ ...dotStyle, animationDelay: "0s" }} />
      <div style={{ ...dotStyle, animationDelay: "0.2s" }} />
      <div style={{ ...dotStyle, animationDelay: "0.4s" }} />
      <style>
        {`
          @keyframes bouncing-loader {
            to {
              opacity: 0.1;
              transform: translateY(-16px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default BouncingDotsLoader;
