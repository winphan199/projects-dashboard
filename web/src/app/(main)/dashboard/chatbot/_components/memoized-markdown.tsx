import { marked } from "marked";
import { memo, useMemo } from "react";
import MarkdownRenderer from "./markdown-renderer";

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown);
  return tokens.map((token) => token.raw);
}

const MemoizedMarkdownBlock = memo(
  ({ content }: { content: string }) => {
    return <MarkdownRenderer>{content}</MarkdownRenderer>;
  },
  (prevProps, nextProps) => {
    if (prevProps.content !== nextProps.content) return false;
    return true;
  },
);

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock";

export const MemoizedMarkdown = memo(({ content, id }: { content: string; id: string }) => {
  const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);

  return blocks.map((block, index) => <MemoizedMarkdownBlock content={block} key={`${id}-block_${index}`} />);
});

MemoizedMarkdown.displayName = "MemoizedMarkdown";
