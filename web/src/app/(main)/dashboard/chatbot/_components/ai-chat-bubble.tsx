import { UIMessage } from "@ai-sdk/react";
import { MemoizedMarkdown } from "./memoized-markdown";

interface AIChatBubbleProps {
  message: UIMessage;
}

function AIChatBubble({ message }: AIChatBubbleProps) {
  return (
    <div className="max-w-[80%] self-start rounded-xl rounded-tl-sm bg-slate-500 px-4 py-3 text-white/90">
      {message.parts.map((part, i) => {
        switch (part.type) {
          case "text":
            return <MemoizedMarkdown key={`${message.id}-${i}`} id={message.id} content={part.text} />;
        }
      })}
    </div>
  );
}

export default AIChatBubble;
