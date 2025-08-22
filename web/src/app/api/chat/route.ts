import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, model }: { messages: UIMessage[]; model: string } = await req.json();

  const result = streamText({
    model: anthropic(model || "claude-3-haiku-20240307"),
    system: "You are a helpful assistant. Respond to the user in Markdown format.",
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
