"use client";

import React, { useContext, useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { UIMessage, useChat } from "@ai-sdk/react";
import { LoaderPinwheel, Send } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { useAccount } from "@/app/contexts/account-provider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useSupabaseBrowser from "@/lib/supabase/client";

import { AIChatbotContext } from "../_lib/contexts/ai-chatbot-provider";

import AIChatBubble from "./ai-chat-bubble";
import UserChatBubble from "./user-chat-bubble";

interface ChatWrapperProps {
  defaultChatId?: string;
  defaultMessages?: UIMessage[];
}

export default function ChatWrapper({ defaultChatId, defaultMessages }: ChatWrapperProps) {
  const account = useAccount();
  const supabase = useSupabaseBrowser();
  const router = useRouter();

  const { selectedModel } = useContext(AIChatbotContext);
  const [chatId] = useState<string>(defaultChatId ?? uuidv4());
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    id: chatId,
    messages: defaultMessages,
    onFinish: async ({ message }) => {
      // Save the AI response to Supabase after the stream finishes
      if (chatId) {
        for (const messageText of message.parts) {
          if (messageText.type === "text" && messageText.state === "done")
            await saveMessage(chatId, message.role, messageText.text);
        }
      }

      if (!defaultChatId) {
        router.push(`/dashboard/chatbot/${chatId}`);
      }
    },
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Effect to scroll to the bottom of the messages list
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendUserMessage = async (input: string) => {
    if (!input.trim()) return;
    // Save the user message to Supabase before sending to API
    if (!defaultChatId) {
      await startNewChat(input);
    }
    await saveMessage(chatId, "user", input);
    await sendMessage(
      { text: input },
      {
        body: {
          model: selectedModel,
        },
      },
    );
    setInput("");
  };

  const onEnterPress = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == "Enter" && e.shiftKey == false) {
      e.preventDefault();
      await sendUserMessage(e.currentTarget.value.trim());
    }
  };

  // Function to save a message to the Supabase database
  const saveMessage = async (currentChatId: string, role: string, content: string) => {
    try {
      const { error } = await supabase.from("messages").insert([
        {
          chat_id: currentChatId,
          role,
          content,
        },
      ]);
      if (error) throw error;
    } catch (error) {
      console.error("Error saving message:", error instanceof Error ? error.message : String(error));
    }
  };

  // Function to create a new chat session and save the first message
  const startNewChat = async (input: string) => {
    try {
      // Create a new chat entry in Supabase
      const { error: chatError } = await supabase.from("chats").insert([
        {
          id: chatId,
          user_id: account.id,
          title: input || "New Chat",
          model: selectedModel,
        },
      ]);
      if (chatError) throw chatError;

      // Save the first user message
    } catch (error) {
      console.error("Error starting new chat:", error instanceof Error ? error.message : String(error));
    }
  };

  return (
    <>
      <div className="flex w-full flex-1 flex-col items-center overflow-auto">
        <div className="flex w-full max-w-[800px] flex-col gap-y-2 py-24 last:pb-10">
          {messages.map((message) => {
            return (
              <React.Fragment key={message.id}>
                {message.role === "user" ? <UserChatBubble message={message} /> : <AIChatBubble message={message} />}
                <div ref={messagesEndRef} />
              </React.Fragment>
            );
          })}
          {status === "submitted" && (
            <div className="my-4 flex justify-center">
              <LoaderPinwheel className="h-6 w-6 animate-spin text-slate-500" />
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full items-center justify-center bg-white">
        <form
          className="w-full max-w-[900px] flex-1"
          onSubmit={async (e) => {
            e.preventDefault();
            if (!input.trim()) return;
            await sendUserMessage(input);
          }}
        >
          <div className="mb-8 flex h-fit items-center rounded-2xl border-2 border-zinc-300 bg-white px-4 py-2 shadow-2xs dark:border-zinc-800 dark:bg-zinc-900">
            <Textarea
              className="resize-none border-none shadow-none focus-visible:border-none focus-visible:ring-0"
              value={input}
              placeholder="Say something..."
              onChange={(e) => setInput(e.currentTarget.value)}
              onKeyDown={onEnterPress}
            />
            <div className="flex justify-end pl-2">
              <Button
                variant={"secondary"}
                size={"icon"}
                className="hover:bg-primary cursor-pointer rounded-full text-zinc-600 transition-colors hover:text-white"
                type="submit"
              >
                <Send />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
