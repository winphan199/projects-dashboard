import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./_components/app-sidebar";
import AIModelSelector from "./_components/ai-model-selector";
import { getAccount } from "@/server/data/account-data";

async function ChatbotPage() {
  // const user = await getAccount();
  // console.log("user", user);

  return (
    <div className="flex h-full flex-1 flex-col overflow-auto px-4 md:px-6">
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <header className="flex w-full items-center justify-between py-2">
            <div className="flex items-center">
              <SidebarTrigger />
              <span className="mr-1 text-zinc-400">|</span>
              <h1 className="text-xl font-medium text-zinc-600">Chatbot Dashboard</h1>
            </div>
            <AIModelSelector />
          </header>
          <main>
            <div className="h-[3000px]">some page</div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}

export default ChatbotPage;
