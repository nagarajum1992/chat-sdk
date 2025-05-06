import { Box } from "@mui/material";
import AIIcon from "../../../../../public/assets/ai_icon.svg";
import VolumeIcon from "../../../../../public/assets/volume_icon.svg";

import AnimatedMarkdown from "./AnimatedMarkdown";
import { createAxiosInstance } from "../../../../services/axiosInstance";

export default function ChatCard({ ...props }: any) {
  const { chatData, scrollRef, userId, serverUrl, headers, formatSelected } =
    props;
  const isReply = chatData?.user_type === "user";

  const playSound = async (storage_prefix: string) => {
    const axiosClient = createAxiosInstance({
      serverUrl: serverUrl.audioOutputURL,
      headers: headers,
    });
    let url_search_params = new URLSearchParams();
    url_search_params.append("audio_storage_prefix", storage_prefix);
    const url = `${serverUrl.audioOutputURL}?${url_search_params.toString()}`;
    const res = await axiosClient.get(url, {
      responseType: "arraybuffer",
      headers: {
        ...headers,
      },
    });
    if (res.data) {
      const audioBlob = new Blob([res.data], { type: "audio/wav" });

      const audioObjectUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioObjectUrl);
      audio.play();
    }
  };

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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backgroundColor: "#2e2547",
              color: "#FFF",
              padding: "10px 20px",
              borderRadius: "12px",
            }}
          >
            <div>
              <img
                alt="signup background"
                src={AIIcon}
                style={{ flexShrink: 0 }}
              />
            </div>

            <div>
              {(formatSelected === "engToEng" ||
                formatSelected === "regLangToEng") && (
                <AnimatedMarkdown
                  openAiData={chatData?.message}
                  isnewMessage={chatData?.isNewmessage}
                  scrollRef={scrollRef}
                  userId={userId}
                />
              )}
              {formatSelected === "regLangToRegLang" && (
                <AnimatedMarkdown
                  openAiData={chatData?.translated_message}
                  isnewMessage={chatData?.isNewmessage}
                  scrollRef={scrollRef}
                  userId={userId}
                />
              )}
              {formatSelected === "regLangToBoth" && (
                <>
                  {" "}
                  <AnimatedMarkdown
                    openAiData={chatData?.message}
                    isnewMessage={chatData?.isNewmessage}
                    scrollRef={scrollRef}
                    userId={userId}
                  />
                  <AnimatedMarkdown
                    openAiData={chatData?.translated_message}
                    isnewMessage={chatData?.isNewmessage}
                    scrollRef={scrollRef}
                    userId={userId}
                  />
                </>
              )}
            </div>
            {chatData?.audio_storage_prefix && (
              <div
                className="sound-icon"
                onClick={() => playSound(chatData.audio_storage_prefix)}
              >
                <img
                  alt="signup background"
                  src={VolumeIcon}
                  style={{ flexShrink: 0 }}
                />
              </div>
            )}
          </Box>
        )}
      </Box>
    </>
  );
}
