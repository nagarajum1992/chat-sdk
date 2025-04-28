import "../../index.css";
import Feed from "./Feed/Feed";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Box } from "@mui/material";
import { ChatComponentProps } from "models/IChatComponent";
import useStyles from "./styles";

dayjs.extend(utc);
dayjs.utc();

export default function ChatComponent({ ...props }: ChatComponentProps) {
  const classes = useStyles();

  return (
    <Box className={classes.mainBg}>
      <img
        alt="signup background"
        src={`/assets/chatBg.png`}
        className={classes.animatedBlurBg}
      />
      <div className={classes.overlay} />
      <Feed {...props} />
    </Box>
  );
}
