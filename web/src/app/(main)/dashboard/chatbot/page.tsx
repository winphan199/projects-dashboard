import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import AIModelSelector from "./_components/ai-model-selector";
import AppSidebar from "./_components/app-sidebar";
import ChatWrapper from "./_components/chat-wrapper";

async function ChatbotPage() {
  return (
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
            <ChatWrapper />
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

export default ChatbotPage;
