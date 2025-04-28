import { Box } from "@mui/material";
import useStyles from "../styles";
import ChatFeed from "./FeedContent/ChatFeed";
import { ChatComponentProps } from "models/IChatComponent";

export default function Feed({ ...props }: ChatComponentProps) {
  const classes = useStyles();

  return (
    <Box className={classes.feedContainer}>
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
