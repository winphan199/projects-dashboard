"use client";

import { useContext, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { anthropicModels } from "../_lib/ai-models";
import { AIChatbotContext } from "../_lib/contexts/ai-chatbot-provider";

function AIModelSelector() {
  const { selectedModel, setSelectedModel } = useContext(AIChatbotContext);

  return (
    <Select value={selectedModel} onValueChange={setSelectedModel}>
      <SelectTrigger className="w-[180px] px-2 py-0 text-xs" size="sm">
        <SelectValue placeholder="Model" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-xs">AI Models</SelectLabel>
          {anthropicModels.map((model) => (
            <SelectItem key={model.id} value={model.value} className="text-xs">
              {model.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default AIModelSelector;
