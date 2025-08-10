import { UIMessage } from "@ai-sdk/react";

interface AIChatBubbleProps {
  message: UIMessage;
}

function AIChatBubble({ message }: AIChatBubbleProps) {
  return (
    <div className="self-start px-4 py-3">
      {message.parts.map((part, i) => {
        switch (part.type) {
          case "text":
            return (
              <div key={`${message.id}-${i}`} className="text-base">
                {part.text}
              </div>
            );
        }
      })}
    </div>
  );
}

export default AIChatBubble;
