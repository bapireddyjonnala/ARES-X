import React from "react";

export default function StatsCard({ title, value, icon: Icon, description, accentColor = "var(--accent-violet)", onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: "var(--bg-card)",
        backdropFilter: "blur(12px)",
        border: "1px solid var(--border-subtle)",
        padding: "24px",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
        cursor: onClick ? "pointer" : "default",
      }}
      className="stats-card-hover"
    >
      {/* Decorative Glow Spot */}
      <div
        style={{
          position: "absolute",
          top: "-20px",
          right: "-20px",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: accentColor,
          filter: "blur(40px)",
          opacity: 0.15,
          pointerEvents: "none",
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "14px", color: "var(--text-secondary)", fontWeight: "500" }}>{title}</span>
        {Icon && (
          <div
            style={{
              padding: "8px",
              borderRadius: "10px",
              background: `rgba(255, 255, 255, 0.03)`,
              border: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon size={18} style={{ color: accentColor }} />
          </div>
        )}
      </div>

      <div>
        <h2 style={{ fontSize: "28px", fontWeight: "700", color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
          {value}
        </h2>
        {description && (
          <span style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "4px", display: "block" }}>
            {description}
          </span>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .stats-card-hover {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s, box-shadow 0.2s !important;
        }
        .stats-card-hover:hover {
          transform: translateY(-4px);
          border-color: ${accentColor}44;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3), 0 0 15px ${accentColor}11;
        }
      `}} />
    </div>
  );
}