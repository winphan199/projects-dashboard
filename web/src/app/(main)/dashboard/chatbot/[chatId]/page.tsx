import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getAccount } from "@/server/data/account-data";

import AIModelSelector from "../_components/ai-model-selector";
import AppSidebar from "../_components/app-sidebar";
import ChatWrapper from "../_components/chat-wrapper";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { Tables } from "../../../../../../database.types";
import { TextUIPart, UIMessage } from "ai";
import { notFound } from "next/navigation";
import AIChatbotProvider from "../_lib/contexts/ai-chatbot-provider";

type params = Promise<{
  chatId: string;
}>;

async function ChatbotPage({ params }: { params: params }) {
  const supabase = getSupabaseServerClient();
  const { chatId } = await params;
  const { data, error } = await supabase.from("messages").select().eq("chat_id", chatId);

  if (error) {
    console.error("Error fetching messages:", error);
    return null;
  }

  if (data.length === 0) {
    console.warn("No messages found for chat:", chatId);
    return notFound();
  }

  const convertToUIMessages = (dbMessages: Tables<"messages">[]) => {
    const uiMessages: UIMessage[] = dbMessages.map((msg) => {
      const parts: TextUIPart[] = [
        {
          type: "text",
          text: msg.content ?? "",
        },
      ];

      const role = msg.role === "user" ? "user" : "assistant";
      return {
        id: msg.id,
        role: role,
        parts,
      };
    });
    return uiMessages;
  };

  const messages = convertToUIMessages(data);

  return (
    <AIChatbotProvider>
      <div className="flex h-full flex-1 flex-col overflow-auto">
        <SidebarProvider>
          <AppSidebar />
          <div className="flex w-full flex-col">
            <header className="flex w-full items-center justify-between px-4 py-4 md:px-6">
              <div className="flex items-center">
                <SidebarTrigger />
                <span className="mr-1 text-zinc-400">|</span>
                <h1 className="text-xl font-medium text-zinc-600">Chatbot Dashboard</h1>
              </div>
              <AIModelSelector />
            </header>
            <main className="flex flex-1 flex-col items-center overflow-auto">
              <ChatWrapper defaultChatId={chatId} defaultMessages={messages} />
            </main>
          </div>
        </SidebarProvider>
      </div>
    </AIChatbotProvider>
  );
}

export default ChatbotPage;
