import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check } from "lucide-react";

export default function ResultCard({ title, content, actions }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const textToCopy = typeof content === "object"
        ? JSON.stringify(content, null, 2)
        : content;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const isObject = typeof content === "object" && content !== null;
  const contentString = isObject ? JSON.stringify(content, null, 2) : content || "";

  return (
    <div
      style={{
        background: "var(--bg-card)",
        backdropFilter: "blur(16px)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "16px",
        padding: "24px",
        marginBottom: "24px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.24)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
      className="animate-fade-in"
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "600", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
          {title}
        </h3>
        
        <div style={{ display: "flex", gap: "8px" }}>
          {actions}
          <button
            onClick={handleCopy}
            title="Copy content"
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              background: "rgba(255, 255, 255, 0.04)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-secondary)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "12px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            className="action-btn"
          >
            {copied ? <Check size={14} style={{ color: "var(--accent-emerald)" }} /> : <Copy size={14} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div style={{ width: "100%", height: "1px", background: "var(--border-subtle)" }} />

      <div style={{ overflowX: "auto" }}>
        {isObject ? (
          <pre
            style={{
              fontFamily: "var(--mono)",
              fontSize: "13px",
              color: "var(--accent-cyan)",
              background: "rgba(0, 0, 0, 0.2)",
              padding: "16px",
              borderRadius: "8px",
              border: "1px solid var(--border-subtle)",
              whiteSpace: "pre-wrap",
            }}
          >
            {contentString}
          </pre>
        ) : (
          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {contentString}
            </ReactMarkdown>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .action-btn:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          color: var(--text-primary) !important;
          border-color: var(--text-muted) !important;
        }
      `}} />
    </div>
  );
}