import React from "react";

import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export default function MarkdownRenderer({ children }: { children: string | null | undefined }) {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code(props) {
          const { children, className, node, style, ref, ...rest } = props;
          const match = /language-(\w+)/.exec(className ?? "");
          return match ? (
            <SyntaxHighlighter language={match[1]} PreTag="div" style={dracula} {...rest}>
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },

        p({ node, children, ...props }) {
          return (
            <p style={{ marginBottom: "0.5rem", whiteSpace: "pre-line" }} {...props}>
              {children}
            </p>
          );
        },
      }}
    >
      {children}
    </Markdown>
  );
}
