import { UIMessage } from "ai";

interface UserChatBubbleProps {
  message: UIMessage;
}

function UserChatBubble({ message }: UserChatBubbleProps) {
  return (
    <div className="max-w-[80%] self-end rounded-xl rounded-tr-sm bg-slate-300 px-4 py-3">
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

export default UserChatBubble;
