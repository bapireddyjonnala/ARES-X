import React from "react";
import { 
  LayoutDashboard, 
  FlaskConical, 
  FileText, 
  Eye, 
  ShieldAlert, 
  MessageSquare,
  Cpu
} from "lucide-react";

export default function Sidebar({ currentTab, setCurrentTab }) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "research", label: "Research Agent", icon: FlaskConical },
    { id: "paper", label: "Paper Writer", icon: FileText },
    { id: "reviewer", label: "Peer Reviewer", icon: Eye },
    { id: "patents", label: "Patent Checker", icon: ShieldAlert },
    { id: "chat", label: "Research Assistant", icon: MessageSquare },
  ];

  return (
    <aside
      style={{
        width: "280px",
        height: "100vh",
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border-subtle)",
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "24px 16px",
        zIndex: 50,
      }}
    >
      <div>
        {/* Logo Section */}
        <div 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "12px", 
            padding: "8px 12px",
            marginBottom: "32px" 
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: "var(--accent-gradient)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 15px rgba(139, 92, 246, 0.4)",
            }}
          >
            <Cpu size={22} style={{ color: "white" }} />
          </div>
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: "800", background: "linear-gradient(to right, #ffffff, #9ca3af)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              ARES-X
            </h2>
            <p style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "500", textTransform: "uppercase", letterSpacing: "1.5px" }}>
              Research Engine
            </p>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                id={`sidebar-tab-${item.id}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  background: isActive ? "rgba(139, 92, 246, 0.1)" : "transparent",
                  border: "1px solid",
                  borderColor: isActive ? "rgba(139, 92, 246, 0.25)" : "transparent",
                  color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                  textAlign: "left",
                  fontSize: "14px",
                  fontWeight: isActive ? "600" : "500",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  outline: "none",
                }}
                className="sidebar-btn"
              >
                <Icon 
                  size={18} 
                  style={{ 
                    color: isActive ? "var(--accent-violet)" : "var(--text-secondary)",
                    transition: "color 0.2s"
                  }} 
                />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div 
        style={{
          background: "var(--bg-tertiary)",
          padding: "16px",
          borderRadius: "12px",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-emerald)" }} />
          <span style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-primary)" }}>System Active</span>
        </div>
        <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>v1.0.0 (Agentic Backend)</p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .sidebar-btn:hover {
          background: rgba(255, 255, 255, 0.03) !important;
          color: var(--text-primary) !important;
        }
        .sidebar-btn:hover svg {
          color: var(--accent-violet) !important;
        }
      `}} />
    </aside>
  );
}