import type { Command } from "@/lib/shell/types";
import { StreamingResponse } from "@/components/terminal/StreamingResponse";

export const askCommand: Command = {
  name: "ask",
  description: "ask KUT, the AI assistant, a question",
  category: "meta",
  handler: (args) => {
    const question = args.join(" ").trim();

    if (!question) {
      return {
        type: "text",
        content: [
          "",
          "  ask <question>",
          "  query KUT, the AI assistant living in this terminal.",
          "",
          "  examples:",
          "    ask what tech stack do you use?",
          "    ask tell me about your projects",
          "    ask how can I contact kutluhan?",
          "",
        ].join("\n"),
      };
    }

    return {
      type: "react",
      content: <StreamingResponse question={question} />,
    };
  },
};
