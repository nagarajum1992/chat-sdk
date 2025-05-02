import { Box } from "@mui/material";
import AnimatedMarkdown from "./AnimatedMarkdown";
import AIIcon from "../../../../../public/assets/ai_icon.svg"

export default function ChatCard({ chatData, scrollRef, userId }: any) {
  const isReply = chatData?.user_type === "user";

  return (
    <>
      <Box
        style={{
          display: "flex",
          flexDirection: isReply ? "row-reverse" : "row",
          margin: "15px 0px",
          width: "80%",
          marginLeft: isReply ? "auto" : 0,
          marginRight: isReply ? 0 : "auto",
        }}
      >
        {chatData?.user_type === "user" ? (
          <div className="user-container">
            <div style={{ marginRight: 25 }}>{chatData?.message}</div>
          </div>
        ) : (
          <Box sx={{ display: "flex", alignItems: "baseline", gap: "10px" }}>
            <div>
              <img
                alt="signup background"
                src={AIIcon}
                style={{ flexShrink: 0 }}
              />
            </div>

            <div>
              <AnimatedMarkdown
                openAiData={chatData?.message}
                isnewMessage={chatData?.isNewmessage}
                scrollRef={scrollRef}
                userId={userId}
              />
            </div>
          </Box>
        )}
      </Box>
    </>
  );
}
