import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import ChatCard from "./ChatCard";
import Loading from "../../../Loaders/Loading";

export default function FeedContent({ messagesList, loading }: any) {
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (loading && loadingRef.current) {
      loadingRef.current.scrollIntoView({ behavior: "smooth" });
    } else if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messagesList, loading]);

  const renderChatList = () => {
    return (
      <>
        {messagesList.map((eachChat: any, index: number) => (
          <ChatCard key={index} chatData={eachChat} />
        ))}
        <div ref={chatEndRef} /> {/* Scroll target for chat messages */}
        {loading && (
          <div ref={loadingRef}>
            <Loading />
          </div>
        )}
      </>
    );
  };

  return (
    <Box
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height: "calc(100vh - 230px)",
        overflowY: "auto",
        marginTop: "10px",
      }}
    >
      {renderChatList()}
    </Box>
  );
}
