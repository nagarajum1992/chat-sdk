import { Box, Toolbar } from "@mui/material";
import ChatFeed from "./FeedContent/ChatFeed";
import { ChatComponentProps } from "models/IChatComponent";

export default function Feed({ ...props }: ChatComponentProps) {
  return (
    <Box className="feedContainer">
      <Toolbar
        style={{
          height: "80px",
          padding: "5px 20px",
          paddingTop: "15px",

          // backgroundImage:
          //   "linear-gradient(to bottom,rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5))",

          zIndex: 1,
          position: "relative",
          // background:"red"
        }}
      >
        <div
          style={{
            background: "rgba(16, 16, 19, 0.20)",
            backdropFilter: "blur(5px)",
            height: "100%",
            width: "100%",
            top: 0,
            left: 0,
            position: "absolute",
            zIndex: -1,
            // backgroundImage:
            //   "linear-gradient(to bottom,rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5))",
            filter: "blur(5px)",
          }}
        ></div>
      </Toolbar>
      <Box
        style={{
          maxWidth: "1000px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <ChatFeed {...props} />
      </Box>
    </Box>
  );
}
