"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

interface ChatSidebarMenuButtonProps {
  id: string;
  title: string | null;
}

function ChatSidebarMenuButton({ id, title }: ChatSidebarMenuButtonProps) {
  const pathname = usePathname();
  const isActive = pathname === `/dashboard/chatbot/${id}`;
  return (
    <SidebarMenuButton
      asChild
      isActive={isActive}
      className="rounded-xl px-3 data-[active=true]:bg-slate-300 data-[active=true]:text-white"
    >
      <Link href={`/dashboard/chatbot/${id}`}>
        <span
          className={cn("font-base text-zinc-800 capitalize", {
            "font-semibold text-slate-800": isActive,
          })}
        >
          {title}
        </span>
      </Link>
    </SidebarMenuButton>
  );
}

export default ChatSidebarMenuButton;
