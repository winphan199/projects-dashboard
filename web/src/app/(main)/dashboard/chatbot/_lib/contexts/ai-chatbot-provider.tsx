"use client";

import { createContext, useEffect, useMemo, useState } from "react";

import { useParams } from "next/dist/client/components/navigation";

import useSupabaseBrowser from "@/lib/supabase/client";

import { anthropicModels } from "../ai-models";

export const AIChatbotContext = createContext<{
  selectedModel: string;
  setSelectedModel: React.Dispatch<React.SetStateAction<string>>;
}>({
  selectedModel: "",
  setSelectedModel: () => undefined,
});
function AIChatbotProvider({ children }: { children: React.ReactNode }) {
  const { chatId } = useParams<{
    chatId: string | undefined;
  }>();
  const supabase = useSupabaseBrowser();
  const [selectedModel, setSelectedModel] = useState<string>(anthropicModels[0]!.value);
  const updateAIModel = async (model: string) => {
    if (chatId) {
      await supabase.from("chats").update({ model }).eq("id", chatId);
    }
  };

  useEffect(() => {
    if (chatId) {
      updateAIModel(selectedModel);
    }
  }, [selectedModel]);

  const value = useMemo(
    () => ({
      selectedModel,
      setSelectedModel,
    }),
    [selectedModel],
  );

  return <AIChatbotContext.Provider value={value}>{children}</AIChatbotContext.Provider>;
}

export default AIChatbotProvider;
