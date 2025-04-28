import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface TypingTextProps {
  text: any;
  style?: React.CSSProperties;
  typingSpeed?: number;
  onAnimationComplete?: () => void;
  isFadedColor?: boolean;
}

const TypingText: React.FC<TypingTextProps> = ({
  text,
  style,
  typingSpeed = 2,
  onAnimationComplete,
  isFadedColor = false,
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    setDisplayText("");
    setIsAnimating(true);

    const animateText = async () => {
      for (let i = 0; i < text?.length; i++) {
        if (isCancelled) return;

        await new Promise((resolve) => setTimeout(resolve, typingSpeed));
        if (isCancelled) return;

        setDisplayText(text?.slice(0, i + 1));
      }
      if (!isCancelled) {
        setIsAnimating(false);
        onAnimationComplete?.();
      }
    };

    animateText();
    return () => {
      isCancelled = true;
    };
  }, [text, typingSpeed, onAnimationComplete]);

  return (
    <ReactMarkdown
      children={displayText}
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ node, ...props }) => (
          <p
            {...props}
            style={{
              ...style,
            //   color: isFadedColor ? "rgba(0, 0, 0, 0.7)" : "black",
              
            }}
          />
        ),
      }}
    />
  );
};

export default TypingText;
