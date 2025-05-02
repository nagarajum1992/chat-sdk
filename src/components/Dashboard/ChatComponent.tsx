import "../../index.css";
import Feed from "./Feed/Feed";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Box } from "@mui/material";
import { ChatComponentProps } from "../../models/IChatComponent";
import chatBg from '../../../public/assets/chatBg.png';

dayjs.extend(utc);
dayjs.utc();

export default function ChatComponent({ ...props }: ChatComponentProps) {
  return (
    <Box className="mainBg">
      <img alt="signup background" src={chatBg} className="animatedBlurBg" />
      <div className="overlay" />
      <Feed {...props} />
    </Box>
  );
}
