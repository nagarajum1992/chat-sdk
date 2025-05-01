import { Box } from "@mui/material";
import LottiesAnimation from "../Loaders/LottiesAnimation";
import messageLoadsJson from "../Loaders/messageNewLoader.json";

export default function ChatLoading() {
  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        margin: "15px 0px",
      }}
    >
      <div
        style={{
          borderRadius: "50%",
          height: "50px",
          width: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          marginRight: 20,
          backgroundColor: "#A259FF",
        }}
      >
        <LottiesAnimation
          animationJson={messageLoadsJson}
          sx={{
            height: 100,
            width: 100,
          }}
        />
      </div>
    </Box>
  );
}
