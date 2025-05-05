import { Typography, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import toast from "react-hot-toast";
import ChatLoading from "../../../Loaders/ChatLoading";
import ChatCard from "./ChatCard";
import AudoVisualiser from "../../../VoiceRecorder/AudoVisualiser";
import BouncingDotsLoader from "../../../Loaders/DotsLoading";
import chatService from "../../../../services/chatService";
import { ChatComponentProps } from "../../../../models/IChatComponent";
import SendIcon from "../../../../../public/assets/send-white.svg";
import { v4 as uuidv4 } from "uuid";

export default function ChatFeed({
  serverUrl,
  userId,
  headers,
  entityId,
  userName,
  languageCode,
  formatSelected,
}: ChatComponentProps) {
  const [message, setMessage] = useState<any>({
    language_code: "",
    provider: "",
    message: "",
  });
  const [isVoiceRecordingStarted, setIsVoiceRecordingStarted] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const messageRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState(1);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef<HTMLElement>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(true);
  const previousHeightRef = useRef<number>(0);
  const notificationSound = new Audio("/notification.mp3");
  const [audioLoading, setAudioLoading] = useState<boolean>(false);
  const ws = useRef<WebSocket | null>(null);
  const [connected, setConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<MessageEvent<any> | null>(
    null
  );
  const [chatHistory, setChatHistory] = useState<any>({
    history: [],
    isLoading: false,
  });
  const [chatList, setChaList] = useState<any[]>([]);
  const retryCount = useRef(0);
  const reconnectTimeout = useRef<any>(null);
  const messageQueue = useRef<string[]>([]);
  const reconnectInterval = 2000;
  const maxRetries = 10;

  const connect = () => {
    if (!userId || retryCount.current > maxRetries) return;

    ws.current = new WebSocket(serverUrl.webSocketURL);

    ws.current.onopen = () => {
      console.log("✅ WebSocket connected");
      toast.success("Connected");
      retryCount.current = 0;
      setConnected(true);

      // Flush message queue
      while (
        messageQueue.current.length > 0 &&
        ws.current?.readyState === WebSocket.OPEN
      ) {
        const msg = messageQueue.current.shift();
        if (msg) ws.current.send(msg);
      }
    };

    ws.current.onmessage = (msg) => {
      setLastMessage(msg);
    };

    ws.current.onclose = () => {
      console.log("❌ WebSocket disconnected");
      toast.error("Disconnected");
      setConnected(false);
      scheduleReconnect();
    };

    ws.current.onerror = (err) => {
      console.error("⚠️ WebSocket error:", err);
      ws.current?.close();
    };
  };

  const scheduleReconnect = () => {
    retryCount.current += 1;
    if (retryCount.current <= maxRetries) {
      reconnectTimeout.current = setTimeout(connect, reconnectInterval);
    } else {
      console.warn("⚠️ Max reconnect attempts reached");
    }
  };

  useEffect(() => {
    connect();
    return () => {
      ws.current?.close();
      if (reconnectTimeout.current) clearTimeout(reconnectTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (page > 1) {
      getChatHistory();
    }
  }, [page]);

  useEffect(() => {
    if (connected) {
      getChatHistory();
    }
  }, [connected]);

  useEffect(() => {
    if (lastMessage !== null) {
      setLoading(true);
      const receivedData = JSON.parse(lastMessage.data);

      console.log(receivedData, "received data hereee====>");
      // if (receivedData.user_id !== email) {
      notificationSound.play().catch((e) => {
        console.warn("Autoplay failed", e);
      });
      // }

      const updateChata = async () => {
        setChaList([
          ...chatList,
          {
            user_type: receivedData?.user_type,
            message: receivedData?.agent_response?.message,
            audio_storage_prefix: receivedData?.audio_storage_prefix,
            isNewmessage: true,
          },
        ]);
        setLoading(false);
      };
      updateChata();
    }

    console.log(lastMessage, "this is last message");
  }, [lastMessage]);

  useEffect(() => {
    if (chatHistory?.history?.length > 0) {
      const newChatList = chatHistory?.history.map((chat: any) => ({
        ...chat,
      }));
      let finalArray = [...chatList, ...newChatList];
      finalArray = removeDuplicates(finalArray);
      setChaList(finalArray);
      if (chatHistory?.history?.length < 10) {
        setHasMore(false);
      }
      // readMessages(chatHistory?.history);
    }
  }, [chatHistory?.history?.length]);

  const removeDuplicates = (arr: any[]) => {
    const seen = new Set();
    return arr.reduce((uniqueArr: any[], currentItem: any) => {
      if (!seen.has(currentItem.id)) {
        seen.add(currentItem.id);
        uniqueArr.push(currentItem);
      }

      return uniqueArr;
    }, []);
  };

  const getChatHistory = () => {
    setLoading(true);
    chatService
      .getChatHistory(userId!, page.toString(), "10", "desc", {
        serverUrl: serverUrl.chatURL,
        headers: headers,
      })
      .then((res) => {
        setChatHistory({ ...chatHistory, history: res.data.history });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const onSubmitAudioRecord = async (newAudioFile: any) => {
    setMessage({
      audio_enabled: false,
      language_code: "",
      provider: "",
      message: "",
    });
    setAudioLoading(true);

    const response: any = await chatService.audio_transcribe(
      newAudioFile,
      userId!,
      languageCode?.value!,
      { serverUrl: serverUrl.audioURL!, headers: headers }
    );

    if (!response?.error)
      setMessage({
        ...message,
        audio_enabled: true,
        language_code: response.language_code,
        provider: response.provider,
        message: response.translation,
        translated_message: response.transcript,
      });

    setAudioLoading(false);
  };

  const scrollToBottom = () => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  useLayoutEffect(() => {
    if (isSubmitted) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToBottom();
        });
      });
    }
  }, [chatList.length]);

  const send_chat = async () => {
    setLoading(true);
    setChaList([
      ...chatList,
      {
        user_type: "user",
        message: message.message,
        id: uuidv4(),
      },
    ]);

    let messageData: any = {
      user_id: userId!,
      query: message.message,
      transcript_query: message.translated_message || "",
      entity_id: entityId || "",
      agent_id: 223,
      type: "agent_chat",
      agent_type: "",
      audio_enabled: message.audio_enabled || false,
      language_code: message.language_code || "en-IN",
    };

    try {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify(messageData));
      }
      console.log("message sent ====>");
    } catch (error) {
      console.error("WebSocket Error:", error);
    } finally {
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (!message.message) {
      toast.error("Please add your query");
      return;
    }

    send_chat();
    setMessage({ language_code: "", provider: "", message: "" });
    setRows(1);
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // Prevent default behavior of Enter key
      event.preventDefault();
      handleSubmit(event); // Type casting to match the handleSubmit function signature
    }
  };

  const handleInput = () => {
    if (inputRef.current) {
      inputRef.current.rows = 1; // Reset to default
      inputRef.current.style.height = "auto"; // Reset height
      const newHeight = inputRef.current.scrollHeight;
      inputRef.current.style.height = `${newHeight}px`;

      const newRows = Math.min(5, Math.floor(newHeight / 24)); // Limit to 5 rows
      setRows(newRows);
    }
  };

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container || chatHistory.isLoading || !hasMore) return;

    if (container.scrollTop === 0 && hasMore) {
      previousHeightRef.current = container.scrollHeight;
      setIsSubmitted(false);
      setPage((prev) => prev + 1);
      setTimeout(() => {
        // wait for new messages to render
        const newHeight = container.scrollHeight;
        container.scrollTop = newHeight - previousHeightRef.current;
      }, 100); // adjust delay as needed
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [chatHistory.isLoading, hasMore]);

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <main>
        <Typography
          variant="h4"
          style={{
            color: "white",
          }}
        >
          Welcome!
        </Typography>

        <Typography
          variant="h3"
          style={{
            color: "white",
            fontWeight: 700,
          }}
        >
          {`${userName}`}
        </Typography>
        <Box
          style={{
            height: "calc(100vh - 460px)",
            padding: "10px 20px",
            overflowY: "auto",
            paddingTop: "80px",
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // Internet Explorer/Edge
          }}
          sx={{
            "&::-webkit-scrollbar": {
              display: "none", // Chrome, Safari, and Edge
            },
          }}
          ref={containerRef}
        >
          {chatList
            ?.sort(
              (a, b) =>
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
            )
            .map((eachMessage: any, index: number) => (
              <ChatCard
                key={index}
                chatData={eachMessage}
                scrollRef={messageRef}
                userId={userId}
                serverUrl={serverUrl}
                headers={headers}
                formatSelected={formatSelected}
              />
            ))}
          {(loading || chatHistory.isLoading) && <ChatLoading />}
          <div ref={messageRef} />
        </Box>
      </main>
      <footer>
        <Box
          // className={classes.formRoot}
          style={{
            // width: "100%",
            display: "flex",
            position: "relative",
            height: "75px", /// here is the change

            justifyContent: "center",
          }}
        >
          <form className="form-input">
            <textarea
              onInput={handleInput}
              ref={inputRef}
              rows={rows}
              // placeholder={"Type your query here..  "}
              placeholder={audioLoading ? "" : "Type your query here..  "}
              value={message.message}
              onChange={(e) =>
                setMessage({ ...message, message: e.target.value.trim() })
              }
              onKeyDown={handleKeyDown} // Handle key down events
              style={{
                // flex: 1,
                resize: "none",
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                overflow: "hidden",
                // minHeight: 25,
                maxHeight: 120,
                width: "100%",

                borderRadius: "inherit",
                fontSize: "14px",
                color: "#FFF",
                paddingLeft: "14px",
              }}
            />

            {audioLoading && (
              <div
                style={{
                  position: "absolute",
                  width: "70%",
                  left: "5%",
                }}
              >
                <BouncingDotsLoader />
              </div>
            )}

            <Box
              style={{
                marginRight: 10,
                marginLeft: 5,
                marginTop: "auto",
              }}
            >
              <AudoVisualiser
                message={message.message}
                onSubmitAudioRecord={onSubmitAudioRecord}
                setIsVoiceRecordingStarted={setIsVoiceRecordingStarted}
              />
            </Box>

            <IconButton
              disabled={isVoiceRecordingStarted}
              onClick={handleSubmit}
              style={{
                marginTop: "auto",
                opacity: isVoiceRecordingStarted ? 0.5 : 1,
                // opacity: 1,
                height: 40,
                width: 40,
                padding: "0px !important",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                marginLeft: "10px",

                backgroundColor: "#293FCD",
                color: "white",
                borderRadius: "50%",
              }}
              type="submit"
            >
              <img
                alt="signup background"
                src={SendIcon}
                style={{ flexShrink: 0 }}
              />
            </IconButton>
          </form>
        </Box>
      </footer>
    </div>
  );
}
