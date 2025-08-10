"use client";

import { createContext, useEffect, useState } from "react";
import { anthropicModels } from "../ai-models";
import { useParams } from "next/dist/client/components/navigation";
import useSupabaseBrowser from "@/lib/supabase/client";

export const AIChatbotContext = createContext<{
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}>({
  selectedModel: "",
  setSelectedModel: () => {},
});

function AIChatbotProvider({ children }: { children: React.ReactNode }) {
  const { chatId } = useParams<{
    chatId: string | undefined;
  }>();
  const supabase = useSupabaseBrowser();
  const [selectedModel, setSelectedModel] = useState<string>(anthropicModels[0].value);
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

  return (
    <AIChatbotContext.Provider
      value={{
        selectedModel,
        setSelectedModel,
      }}
    >
      {children}
    </AIChatbotContext.Provider>
  );
}

export default AIChatbotProvider;
