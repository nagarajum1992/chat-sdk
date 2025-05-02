import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function AnimatedMarkdown({
  openAiData,
  userId,
  isnewMessage = false,
  scrollRef = null,
}: any) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const formatted =
      openAiData
        ?.replace(/\\n/g, "\n")
        ?.replace(/\\t/g, "")
        ?.replace(/\\\\/g, "\\") || "";

    if (isnewMessage) {
      setDisplayedText("");
      let index = 0;

      const interval = setInterval(() => {
        setDisplayedText((prev) => {
          const next = prev + formatted[index];
          index++;

          // Scroll after DOM updates
          requestAnimationFrame(() => {
            if (scrollRef?.current) {
              scrollRef.current.scrollIntoView({ behavior: "smooth" });
            }
          });

          if (index >= formatted.length) clearInterval(interval);
          return next;
        });
      }, 10);

      return () => clearInterval(interval);
    } else {
      setDisplayedText(formatted);
    }
  }, [openAiData, isnewMessage]);

  const redirectToURL = (href: any) => {
    if (href.includes("jap-sb.soham")) {
      const dashboard2 = window.open(href, "_blank");

      if (!dashboard2) {
        alert("Popup blocked! Please allow popups for this site.");
        return;
      }

      const sendAuthData = () => {
        dashboard2.postMessage(
          {
            userId: userId,
          },
          new URL(href).origin // safer and more accurate than href string
        );
        console.log(`postMessage to url: ${href}`, {
          userId: userId,
        });
      };

      // Retry message after window loads
      const interval = setInterval(() => {
        try {
          if (dashboard2 && dashboard2.closed) {
            clearInterval(interval);
            return;
          }

          // Test access to contentWindow – triggers error if still loading or cross-origin
          sendAuthData();
          clearInterval(interval);
        } catch (e) {
          // wait for window to be ready
        }
      }, 500);

      // Just in case, timeout after 10s
      setTimeout(() => clearInterval(interval), 10000);
    } else {
      window.open(href, "_blank");
    }
  };

  return (
    <div style={{ fontFamily: "Manrope" }}>
      <ReactMarkdown
        children={displayedText}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          table: ({ children }) => (
            <table
              style={{
                borderCollapse: "collapse",
                width: "100%",
                marginTop: "10px",
                border: "1px solid black",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "21px",
              }}
            >
              {children}
            </table>
          ),
          th: ({ children }) => (
            <th
              style={{
                border: "1px solid black",
                padding: "5px",
                backgroundColor: "#f0f0f0",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "21px",
              }}
            >
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td
              style={{
                border: "1px solid black",
                padding: "5px",
                textAlign: "center",
                background: "white",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "21px",
              }}
            >
              {children}
            </td>
          ),
          a: ({ href }) => (
            <div style={{ marginTop: "1em" }}>
              <button
                onClick={() => redirectToURL(href)}
                style={{
                  backgroundColor: "#7152F3",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Click Here
              </button>
            </div>
          ),
        }}
      />
    </div>
  );
}
