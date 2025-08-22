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

interface AIChatbotProviderProps extends React.PropsWithChildren {
  model?: string;
}

function AIChatbotProvider({ children, model }: AIChatbotProviderProps) {
  const { chatId } = useParams<{
    chatId: string | undefined;
  }>();
  const supabase = useSupabaseBrowser();

  const [selectedModel, setSelectedModel] = useState<string>(model ?? anthropicModels[0]!.value);
  const updateAIModel = async (model: string) => {
    if (chatId) {
      await supabase.from("chats").update({ model }).eq("id", chatId);
    }
  };

  useEffect(() => {
    if (chatId && selectedModel !== model) {
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
