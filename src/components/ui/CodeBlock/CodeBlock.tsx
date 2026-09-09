"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import styles from "./CodeBlock.module.css";

export interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  copyable?: boolean;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "typescript",
  filename,
  showLineNumbers = true,
  copyable = true,
  className = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  const lines = code.trim().split("\n");

  // Lightweight syntax highlighting token parser for TypeScript/JSON
  const renderHighlightedLine = (line: string) => {
    // Check for comment line
    if (line.trim().startsWith("//") || line.trim().startsWith("/*") || line.trim().startsWith("*")) {
      return <span className="token-comment">{line}</span>;
    }

    // Split by token boundaries while preserving string literals
    const parts: React.ReactNode[] = [];
    const regex = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\])*`|\/\/.*$|\b(?:import|export|from|const|let|var|return|function|type|interface|satisfies|default|async|await|false|true|null|undefined|as)\b|\b(?:useQuery|useMutation|invalidateQueries|create|defineEndpoint|execute|post|get|delete|put)\b|[0-9]+)/g;

    let lastIdx = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(line)) !== null) {
      const matchText = match[0];
      const matchIdx = match.index;

      if (matchIdx > lastIdx) {
        parts.push(line.slice(lastIdx, matchIdx));
      }

      if (matchText.startsWith("//")) {
        parts.push(<span key={matchIdx} className="token-comment">{matchText}</span>);
      } else if (matchText.startsWith('"') || matchText.startsWith("'") || matchText.startsWith("`")) {
        parts.push(<span key={matchIdx} className="token-str">{matchText}</span>);
      } else if (
        /^(import|export|from|const|let|var|return|function|type|interface|satisfies|default|async|await|as)$/.test(
          matchText
        )
      ) {
        parts.push(<span key={matchIdx} className="token-kw">{matchText}</span>);
      } else if (/^(true|false|null|undefined)$/.test(matchText)) {
        parts.push(<span key={matchIdx} className="token-bool">{matchText}</span>);
      } else if (/^(useQuery|useMutation|invalidateQueries|create|defineEndpoint|execute|post|get|delete|put)$/.test(matchText)) {
        parts.push(<span key={matchIdx} className="token-fn">{matchText}</span>);
      } else if (/^[0-9]+$/.test(matchText)) {
        parts.push(<span key={matchIdx} className="token-num">{matchText}</span>);
      } else {
        parts.push(matchText);
      }

      lastIdx = regex.lastIndex;
    }

    if (lastIdx < line.length) {
      parts.push(line.slice(lastIdx));
    }

    return parts.length > 0 ? parts : line;
  };

  return (
    <div className={`${styles.wrapper} ${className}`.trim()}>
      {(filename || copyable) && (
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.dots}>
              <span className={`${styles.dot} ${styles.dotClose}`} />
              <span className={`${styles.dot} ${styles.dotMin}`} />
              <span className={`${styles.dot} ${styles.dotMax}`} />
            </div>
            {filename && <span className={styles.title}>{filename}</span>}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "0.6875rem", color: "var(--text-dim)", textTransform: "uppercase" }}>
              {language}
            </span>
            {copyable && (
              <button
                type="button"
                onClick={handleCopy}
                className={`${styles.copyButton} ${copied ? styles.copied : ""}`}
                title="Copy code"
              >
                {copied ? (
                  <>
                    <Check size={12} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}

      <pre className={styles.pre}>
        {showLineNumbers ? (
          <div className={styles.codeTable}>
            {lines.map((line, idx) => (
              <div key={idx} className={styles.codeRow}>
                <span className={styles.lineNumber}>{idx + 1}</span>
                <span className={styles.codeContent}>{renderHighlightedLine(line)}</span>
              </div>
            ))}
          </div>
        ) : (
          <code>
            {lines.map((line, idx) => (
              <React.Fragment key={idx}>
                {renderHighlightedLine(line)}
                {idx < lines.length - 1 ? "\n" : ""}
              </React.Fragment>
            ))}
          </code>
        )}
      </pre>
    </div>
  );
};
