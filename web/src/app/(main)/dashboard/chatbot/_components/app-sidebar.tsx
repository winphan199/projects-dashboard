import { Calendar, Home, Inbox, Plus, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import ChatSidebarMenuButton from "./sidebar-menu-btn";

async function AppSidebar() {
  const supabase = getSupabaseServerClient();
  const { data, error } = await supabase.from("chats").select("*");
  if (error || !data) return null;

  const chats = data;

  return (
    <Sidebar variant="floating" className="absolute">
      <SidebarHeader className="pt-8">
        <Button asChild>
          <Link href="/dashboard/chatbot">
            <Plus />
            Create new chat
          </Link>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Recent</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <ChatSidebarMenuButton id={chat.id} title={chat.title} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
