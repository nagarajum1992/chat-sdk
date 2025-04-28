import Lottie from "lottie-react"; // Import Lottie component

const LottieAnimation = ({ animationJson, sx = {} }: any) => {
  return (
    <div style={{ width: "100px", ...sx }}>
      <Lottie
        animationData={animationJson}
        loop={true} // Set to false if you only want it to play once
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default LottieAnimation;
