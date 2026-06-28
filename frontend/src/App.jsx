import { useState, useEffect, useRef } from "react";
import api from "./services/api";
import ResultCard from "./components/ResultCard";
import Sidebar from "./components/Sidebar";
import StatsCard from "./components/StatsCard";
import { 
  Send, 
  Sparkles, 
  FileDown, 
  History, 
  CheckCircle2, 
  Loader2, 
  ChevronRight, 
  HelpCircle,
  Cpu, 
  BookOpen, 
  ShieldCheck, 
  Info,
  TrendingUp,
  BrainCircuit,
  Binary
} from "lucide-react";

function App() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [topic, setTopic] = useState("");
  const [isEditingTopic, setIsEditingTopic] = useState(false);
  const [tempTopic, setTempTopic] = useState("");

  const getTabHeader = () => {
    switch (currentTab) {
      case "dashboard":
        return {
          title: "ARES-X Core Console",
          subtitle: "Autonomous Research Evolution System • Agentic Scientific Discovery"
        };
      case "research":
        return {
          title: "Research Agent",
          subtitle: "Analyze literature, structure research roadmaps, and evaluate hypotheses"
        };
      case "paper":
        return {
          title: "Paper Writer",
          subtitle: "Draft full-length academic manuscripts with automated styling"
        };
      case "reviewer":
        return {
          title: "Peer Reviewer",
          subtitle: "Evaluate academic quality, check limitations, and get expert feedback"
        };
      case "patents":
        return {
          title: "Patent Checker",
          subtitle: "Scan global intellectual property databases for prior art and novelty"
        };
      case "chat":
        return {
          title: "Research Assistant",
          subtitle: "Brainstorm methodologies and refine details with ARES-X Copilot"
        };
      default:
        return {
          title: "ARES-X Core Console",
          subtitle: "Autonomous Research Evolution System • Agentic Scientific Discovery"
        };
    }
  };

  const { title, subtitle } = getTabHeader();

  // Pipeline Results
  const [result, setResult] = useState(null);
  const [paper, setPaper] = useState(null);
  const [review, setReview] = useState(null);
  const [patent, setPatent] = useState(null);
  
  // Loading States
  const [loading, setLoading] = useState(false);
  const [paperLoading, setPaperLoading] = useState(false);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [patentLoading, setPatentLoading] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  
  // Pipeline Active Step Counter (for showing status updates)
  const [pipelineStep, setPipelineStep] = useState(0);
  const [pipelineMessage, setPipelineMessage] = useState("");

  // Chat State
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { 
      sender: "ai", 
      text: "Hello! I am your ARES-X Research Assistant. Once you define a research topic, we can write a paper, check for patents, perform literature reviews, or chat about specific details. Ask me anything!" 
    }
  ]);
  
  // History State
  const [recentTopics, setRecentTopics] = useState(() => {
    const saved = localStorage.getItem("aresx_recent_topics");
    return saved ? JSON.parse(saved) : [
      "AI-powered Drug Discovery using Multi-Agent Systems",
      "Quantum Cryptography in Satellite Networks",
      "Self-healing Concrete using Micro-encapsulated Bacteria"
    ];
  });

  const chatEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("aresx_recent_topics", JSON.stringify(recentTopics));
  }, [recentTopics]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  // Add to recent topics
  const addRecentTopic = (newTopic) => {
    if (!newTopic || newTopic.trim() === "") return;
    const cleanTopic = newTopic.trim();
    if (!recentTopics.includes(cleanTopic)) {
      setRecentTopics([cleanTopic, ...recentTopics.slice(0, 4)]);
    }
  };

  // Run the full pipeline
  const runResearch = async (selectedTopic = topic) => {
    const activeTopic = selectedTopic || topic;
    if (!activeTopic) {
      alert("Please enter a research topic first.");
      return;
    }
    
    try {
      setLoading(true);
      addRecentTopic(activeTopic);
      setResult(null);
      
      // Simulate stepping through agents for premium visual feedback
      setPipelineStep(1);
      setPipelineMessage("Planner Agent: Structuring research roadmap...");
      
      const stepTimer1 = setTimeout(() => {
        setPipelineStep(2);
        setPipelineMessage("Literature Agent: Querying arXiv & Semantic Scholar databases...");
      }, 3500);

      const stepTimer2 = setTimeout(() => {
        setPipelineStep(3);
        setPipelineMessage("Gap Detector Agent: Identifying academic whitespace and limitations...");
      }, 7000);

      const stepTimer3 = setTimeout(() => {
        setPipelineStep(4);
        setPipelineMessage("Hypothesis Agent: Formulating testable scientific theories...");
      }, 10500);

      const res = await api.post("/research/full-pipeline", {
        topic: activeTopic,
      });

      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);

      setPipelineStep(5);
      setPipelineMessage("Synthesis complete! Preparing final report.");
      
      // Artificial delay to let user see step 5
      await new Promise(r => setTimeout(r, 1000));
      
      setResult(res.data);
      setCurrentTab("research"); // Automatically switch to the research tab to show results
    } catch (err) {
      console.error(err);
      alert("Backend Error running Research Agent: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
      setPipelineStep(0);
    }
  };

  // Generate research paper draft
  const generatePaper = async () => {
    if (!topic) {
      alert("Please enter a research topic first.");
      return;
    }
    
    try {
      setPaperLoading(true);
      setPaper(null);
      addRecentTopic(topic);

      const res = await api.post("/research/write-paper", {
        topic,
      });

      setPaper(res.data);
      setCurrentTab("paper"); // Switch to paper tab to show results
    } catch (err) {
      console.error(err);
      alert("Backend Error generating paper: " + (err.response?.data?.message || err.message));
    } finally {
      setPaperLoading(false);
    }
  };

  // Run Peer Review
  const reviewPaper = async () => {
    if (!topic) {
      alert("Please enter a research topic first.");
      return;
    }
    
    try {
      setReviewLoading(true);
      setReview(null);
      addRecentTopic(topic);

      const res = await api.post("/research/review-paper", {
        topic,
      });

      setReview(res.data);
      setCurrentTab("reviewer"); // Switch to reviewer tab
    } catch (err) {
      console.error(err);
      alert("Backend Error reviewing paper: " + (err.response?.data?.message || err.message));
    } finally {
      setReviewLoading(false);
    }
  };

  // Run Patent Check
  const patentCheck = async () => {
    if (!topic) {
      alert("Please enter a research topic first.");
      return;
    }
    
    try {
      setPatentLoading(true);
      setPatent(null);
      addRecentTopic(topic);

      const res = await api.post("/research/patent-check", {
        topic,
      });

      setPatent(res.data);
      setCurrentTab("patents"); // Switch to patents tab
    } catch (err) {
      console.error(err);
      alert("Backend Error checking patentability: " + (err.response?.data?.message || err.message));
    } finally {
      setPatentLoading(false);
    }
  };

  // Export Report as PDF
  const exportPdf = async () => {
    if (!topic) {
      alert("Please enter a research topic first.");
      return;
    }
    
    try {
      setPdfLoading(true);
      const res = await api.post("/research/export-pdf", { 
        topic 
      }, { 
        responseType: "blob" 
      });

      const file = new Blob([res.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download", `ARES_X_Report_${topic.trim().replace(/\s+/g, "_")}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("PDF export failed:", err);
      alert("Failed to export PDF report. Ensure the research pipeline runs successfully first.");
    } finally {
      setPdfLoading(false);
    }
  };

  // Chat with assistant
  const sendChatMessage = async (e) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setChatHistory(prev => [...prev, { sender: "user", text: userMsg }]);
    setChatInput("");
    setChatLoading(true);

    try {
      const res = await api.post("/research/chat", {
        question: userMsg
      });
      
      setChatHistory(prev => [...prev, { sender: "ai", text: res.data.answer }]);
    } catch (err) {
      console.error(err);
      setChatHistory(prev => [
        ...prev, 
        { sender: "ai", text: "Sorry, I encountered an error communicating with the chat agent. Please try again." }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const handleRecentClick = (clickedTopic) => {
    setTopic(clickedTopic);
    runResearch(clickedTopic);
  };

  return (
    <>
      {/* Sidebar Navigation */}
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Panel Content */}
      <main
        style={{
          marginLeft: "280px",
          width: "calc(100% - 280px)",
          minHeight: "100vh",
          padding: "40px 48px",
          display: "flex",
          flexDirection: "column",
          gap: "32px",
          boxSizing: "border-box",
        }}
      >
        {/* Dynamic Title / SEO friendly structure */}
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h1 
              id="main-title"
              style={{ 
                fontSize: "36px", 
                fontWeight: "800", 
                background: "linear-gradient(135deg, #ffffff 0%, #a78bfa 100%)", 
                WebkitBackgroundClip: "text", 
                WebkitTextFillColor: "transparent",
                marginBottom: "6px",
                letterSpacing: "-0.04em",
                textAlign: "left"
              }}
            >
              {title}
            </h1>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: "400" }}>
              {subtitle}
            </p>
          </div>
          
          <div 
            style={{ 
              display: "flex", 
              gap: "12px", 
              background: "var(--bg-tertiary)", 
              padding: "6px 12px", 
              borderRadius: "20px", 
              border: "1px solid var(--border-subtle)",
              alignItems: "center"
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-emerald)", boxShadow: "0 0 10px var(--accent-emerald)" }} />
            <span style={{ fontSize: "12px", fontWeight: "600", color: "var(--text-primary)" }}>API Connection Secure</span>
          </div>
        </header>

        {/* Global Input Bar & Control Strip - ONLY on Dashboard */}
        {currentTab === "dashboard" ? (
          <section 
            style={{
              background: "var(--bg-card)",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "20px",
              padding: "28px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label htmlFor="topic-input" style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>
                Define Research Hypothesis or Topic Area
              </label>
              <div style={{ display: "flex", gap: "12px", position: "relative" }}>
                <input
                  id="topic-input"
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. AI-powered Drug Discovery using Multi-Agent Systems..."
                  style={{
                    flexGrow: 1,
                    padding: "16px 20px",
                    borderRadius: "12px",
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-primary)",
                    fontSize: "15px",
                    outline: "none",
                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
                    transition: "all 0.3s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "var(--accent-violet)";
                    e.target.style.boxShadow = "0 0 15px rgba(139, 92, 246, 0.25), inset 0 2px 4px rgba(0,0,0,0.2)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "var(--border-subtle)";
                    e.target.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.2)";
                  }}
                />
              </div>
            </div>

            {/* Quick Action Matrix */}
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
              <button
                id="btn-run-research"
                onClick={() => runResearch()}
                disabled={loading}
                style={{
                  background: "var(--accent-gradient)",
                  border: "none",
                  borderRadius: "12px",
                  padding: "14px 24px",
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)",
                  opacity: loading ? 0.7 : 1,
                }}
                className="glow-btn"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                {loading ? "Agent Running..." : "Execute Pipeline"}
              </button>

              <button
                id="btn-generate-paper"
                onClick={generatePaper}
                disabled={paperLoading}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "12px",
                  padding: "14px 20px",
                  color: "var(--text-primary)",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  opacity: paperLoading ? 0.7 : 1,
                }}
                className="standard-btn"
              >
                {paperLoading ? <Loader2 size={16} className="animate-spin" /> : <BookOpen size={16} />}
                Draft Paper
              </button>

              <button
                id="btn-review-paper"
                onClick={reviewPaper}
                disabled={reviewLoading}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "12px",
                  padding: "14px 20px",
                  color: "var(--text-primary)",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  opacity: reviewLoading ? 0.7 : 1,
                }}
                className="standard-btn"
              >
                {reviewLoading ? <Loader2 size={16} className="animate-spin" /> : <Binary size={16} />}
                Peer Review
              </button>

              <button
                id="btn-patent-check"
                onClick={patentCheck}
                disabled={patentLoading}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "12px",
                  padding: "14px 20px",
                  color: "var(--text-primary)",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  opacity: patentLoading ? 0.7 : 1,
                }}
                className="standard-btn"
              >
                {patentLoading ? <Loader2 size={16} className="animate-spin" /> : <ShieldCheck size={16} />}
                Patent Check
              </button>

              <button
                id="btn-export-pdf"
                onClick={exportPdf}
                disabled={pdfLoading}
                style={{
                  background: "rgba(6, 182, 212, 0.1)",
                  border: "1px solid rgba(6, 182, 212, 0.3)",
                  borderRadius: "12px",
                  padding: "14px 20px",
                  color: "var(--accent-cyan)",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  opacity: pdfLoading ? 0.7 : 1,
                  marginLeft: "auto"
                }}
                className="pdf-btn"
              >
                {pdfLoading ? <Loader2 size={16} className="animate-spin" /> : <FileDown size={16} />}
                Export PDF
              </button>
            </div>

            {/* Stepper Agent Loader */}
            {loading && (
              <div 
                style={{
                  marginTop: "12px",
                  padding: "20px",
                  borderRadius: "12px",
                  background: "rgba(139, 92, 246, 0.05)",
                  border: "1px solid rgba(139, 92, 246, 0.2)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
                className="animate-fade-in"
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <Loader2 size={18} className="animate-spin" style={{ color: "var(--accent-violet)" }} />
                    <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--text-primary)" }}>
                      {pipelineMessage}
                    </span>
                  </div>
                  <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "500" }}>
                    Step {pipelineStep} of 5
                  </span>
                </div>
                
                {/* Stepper indicator dots */}
                <div style={{ display: "flex", gap: "8px", width: "100%" }}>
                  {[1, 2, 3, 4, 5].map((step) => {
                    const isCompleted = pipelineStep > step;
                    const isActive = pipelineStep === step;
                    return (
                      <div 
                        key={step} 
                        style={{ 
                          flexGrow: 1, 
                          height: "4px", 
                          borderRadius: "2px",
                          background: isCompleted 
                            ? "var(--accent-gradient)" 
                            : isActive 
                              ? "var(--accent-violet)" 
                              : "var(--bg-tertiary)",
                          opacity: isActive ? 1 : 0.6,
                          boxShadow: isActive ? "0 0 10px var(--accent-violet)" : "none",
                          transition: "all 0.3s ease"
                        }} 
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </section>
        ) : (
          /* Compact Active Topic bar for non-dashboard tabs */
          <section 
            style={{
              background: "var(--bg-card)",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--border-subtle)",
              borderRadius: "16px",
              padding: "16px 24px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flexGrow: 1, minWidth: 0 }}>
              <div 
                style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "6px",
                  background: "rgba(139, 92, 246, 0.1)",
                  border: "1px solid rgba(139, 92, 246, 0.2)",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  color: "var(--accent-violet)",
                  fontSize: "12px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  flexShrink: 0
                }}
              >
                <Sparkles size={12} />
                Research Topic
              </div>

              {isEditingTopic ? (
                <input
                  type="text"
                  value={tempTopic}
                  onChange={(e) => setTempTopic(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setTopic(tempTopic);
                      setIsEditingTopic(false);
                    } else if (e.key === "Escape") {
                      setIsEditingTopic(false);
                    }
                  }}
                  placeholder="Enter research topic area..."
                  style={{
                    flexGrow: 1,
                    background: "rgba(0, 0, 0, 0.3)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    color: "var(--text-primary)",
                    fontSize: "14px",
                    outline: "none",
                  }}
                  autoFocus
                />
              ) : (
                <span 
                  style={{ 
                    fontSize: "14px", 
                    fontWeight: "500", 
                    color: topic ? "var(--text-primary)" : "var(--text-muted)",
                    textOverflow: "ellipsis", 
                    overflow: "hidden", 
                    whiteSpace: "nowrap",
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    setTempTopic(topic);
                    setIsEditingTopic(true);
                  }}
                  title="Click to edit topic"
                >
                  {topic || "No active research topic. Click to define."}
                </span>
              )}
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center", flexShrink: 0 }}>
              {isEditingTopic ? (
                <>
                  <button
                    onClick={() => {
                      setTopic(tempTopic);
                      setIsEditingTopic(false);
                    }}
                    style={{
                      background: "var(--accent-gradient)",
                      border: "none",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      color: "white",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditingTopic(false)}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      color: "var(--text-secondary)",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setTempTopic(topic);
                      setIsEditingTopic(true);
                    }}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "8px",
                      padding: "8px 16px",
                      color: "var(--text-secondary)",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    Edit Topic
                  </button>

                  {/* Contextual actions: run relevant tool based on tab */}
                  {currentTab === "research" && (
                    <button
                      onClick={() => runResearch()}
                      disabled={loading}
                      style={{
                        background: "var(--accent-gradient)",
                        border: "none",
                        borderRadius: "8px",
                        padding: "8px 16px",
                        color: "white",
                        fontSize: "13px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                      Run Pipeline
                    </button>
                  )}
                  {currentTab === "paper" && (
                    <button
                      onClick={generatePaper}
                      disabled={paperLoading}
                      style={{
                        background: "var(--accent-gradient)",
                        border: "none",
                        borderRadius: "8px",
                        padding: "8px 16px",
                        color: "white",
                        fontSize: "13px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      {paperLoading ? <Loader2 size={14} className="animate-spin" /> : <BookOpen size={14} />}
                      Draft Paper
                    </button>
                  )}
                  {currentTab === "reviewer" && (
                    <button
                      onClick={reviewPaper}
                      disabled={reviewLoading}
                      style={{
                        background: "var(--accent-gradient)",
                        border: "none",
                        borderRadius: "8px",
                        padding: "8px 16px",
                        color: "white",
                        fontSize: "13px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      {reviewLoading ? <Loader2 size={14} className="animate-spin" /> : <Binary size={14} />}
                      Run Review
                    </button>
                  )}
                  {currentTab === "patents" && (
                    <button
                      onClick={patentCheck}
                      disabled={patentLoading}
                      style={{
                        background: "var(--accent-gradient)",
                        border: "none",
                        borderRadius: "8px",
                        padding: "8px 16px",
                        color: "white",
                        fontSize: "13px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      {patentLoading ? <Loader2 size={14} className="animate-spin" /> : <ShieldCheck size={14} />}
                      Check IP
                    </button>
                  )}
                </>
              )}
            </div>
          </section>
        )}

        {/* Tab-based View Switcher */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* TAB 1: DASHBOARD VIEW */}
          {currentTab === "dashboard" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }} className="animate-fade-in">
              {/* Metrics Grid */}
              <div 
                style={{ 
                  display: "grid", 
                  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", 
                  gap: "20px" 
                }}
              >
                <StatsCard 
                  title="Research Modules" 
                  value="10 Agents" 
                  icon={BrainCircuit} 
                  description="Multilateral core nodes active"
                  accentColor="var(--accent-violet)"
                  onClick={() => setCurrentTab("research")}
                />
                <StatsCard 
                  title="Paper Writer Engine" 
                  value={paper ? "Draft Ready" : "Standby"} 
                  icon={BookOpen} 
                  description="Academic drafting pipeline"
                  accentColor="var(--accent-fuchsia)"
                  onClick={() => setCurrentTab("paper")}
                />
                <StatsCard 
                  title="Patent Analysis Mode" 
                  value={patent ? "Analysis Loaded" : "Monitoring"} 
                  icon={ShieldCheck} 
                  description="Intellectual property validator"
                  accentColor="var(--accent-cyan)"
                  onClick={() => setCurrentTab("patents")}
                />
                <StatsCard 
                  title="Workspace Status" 
                  value="Online" 
                  icon={Cpu} 
                  description="All deep-learning models active"
                  accentColor="var(--accent-emerald)"
                  onClick={() => setCurrentTab("chat")}
                />
              </div>

              {/* Central Dashboard Layout */}
              <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: "24px" }}>
                
                {/* Info Card / Quick Pitch */}
                <div
                  style={{
                    background: "var(--bg-card)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "16px",
                    padding: "28px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <h3 style={{ fontSize: "20px", fontWeight: "700", display: "flex", alignItems: "center", gap: "10px" }}>
                    <Sparkles size={20} style={{ color: "var(--accent-violet)" }} /> Welcome to ARES-X
                  </h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6" }}>
                    The <strong>Autonomous Research Evolution System (ARES-X)</strong> coordinates a decentralized swarm of AI agents to accelerate clinical, theoretical, and engineering research pipelines. Enter a prompt above to orchestrate literature searches, discover novel gaps, verify IP claims, draft manuscripts, and critique papers autonomously.
                  </p>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "12px" }}>
                    <div style={{ background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "12px", border: "1px solid var(--border-subtle)" }}>
                      <h4 style={{ fontSize: "13px", fontWeight: "600", color: "var(--accent-cyan)", marginBottom: "6px" }}>1. Synthesize</h4>
                      <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Conducts multi-database literature review & detects critical research gaps instantly.</p>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "12px", border: "1px solid var(--border-subtle)" }}>
                      <h4 style={{ fontSize: "13px", fontWeight: "600", color: "var(--accent-fuchsia)", marginBottom: "6px" }}>2. Formulate & Draft</h4>
                      <p style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Drafts high-quality academic manuscripts & evaluates potential patent novelties.</p>
                    </div>
                  </div>
                </div>

                {/* History & Suggestion Box */}
                <div
                  style={{
                    background: "var(--bg-card)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "16px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  <h3 style={{ fontSize: "16px", fontWeight: "600", display: "flex", alignItems: "center", gap: "8px" }}>
                    <History size={16} style={{ color: "var(--text-secondary)" }} /> Recent Topics
                  </h3>
                  
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {recentTopics.map((histTopic, i) => (
                      <button
                        key={i}
                        onClick={() => handleRecentClick(histTopic)}
                        style={{
                          background: "rgba(255, 255, 255, 0.03)",
                          border: "1px solid var(--border-subtle)",
                          borderRadius: "10px",
                          padding: "12px 14px",
                          textAlign: "left",
                          color: "var(--text-secondary)",
                          fontSize: "12.5px",
                          fontWeight: "500",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "12px",
                        }}
                        className="recent-topic-item"
                      >
                        <span style={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                          {histTopic}
                        </span>
                        <ChevronRight size={14} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: RESEARCH AGENT PIPELINE VIEW */}
          {currentTab === "research" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }} className="animate-fade-in">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontSize: "22px", fontWeight: "700" }}>Research Pipeline Output</h2>
                {result && (
                  <button
                    onClick={exportPdf}
                    style={{
                      background: "rgba(139, 92, 246, 0.1)",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      color: "var(--accent-violet)",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    <FileDown size={14} /> Download Full PDF Report
                  </button>
                )}
              </div>

              {!result && !loading && (
                <div
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "16px",
                    padding: "60px 20px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(139, 92, 246, 0.1)", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", color: "var(--accent-violet)", marginBottom: "8px" }}>
                    <Cpu size={32} />
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: "600" }}>No Research Data Loaded</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "14px", maxWidth: "450px" }}>
                    Please enter a research topic in the top console and click "Execute Pipeline" to launch the planner, search academic papers, and evaluate hypotheses.
                  </p>
                  {topic && (
                    <button
                      onClick={() => runResearch()}
                      style={{
                        background: "var(--accent-gradient)",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: "pointer",
                        marginTop: "8px"
                      }}
                    >
                      Run for "{topic.substring(0, 30)}..."
                    </button>
                  )}
                </div>
              )}

              {result && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                  <ResultCard 
                    title="📋 Research Roadmap & Plan" 
                    content={result.research_plan} 
                  />
                  <ResultCard 
                    title="📚 State-of-the-Art Literature Review" 
                    content={result.literature || result.literature_review} 
                  />
                  <ResultCard 
                    title="🔍 Research Gap Analysis & Opportunities" 
                    content={result.gap_analysis} 
                  />
                  <ResultCard 
                    title="💡 Testable Scientific Hypotheses" 
                    content={result.hypotheses} 
                  />
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PAPER WRITER VIEW */}
          {currentTab === "paper" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }} className="animate-fade-in">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontSize: "22px", fontWeight: "700" }}>Paper Generation Lab</h2>
                {topic && !paper && !paperLoading && (
                  <button
                    onClick={generatePaper}
                    style={{
                      background: "var(--accent-gradient)",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      color: "white",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer"
                    }}
                  >
                    Draft Paper
                  </button>
                )}
              </div>

              {paperLoading && (
                <div
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "16px",
                    padding: "60px 20px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <Loader2 size={36} className="animate-spin" style={{ color: "var(--accent-fuchsia)" }} />
                  <h3 style={{ fontSize: "16px", fontWeight: "600" }}>Paper Writer Agent Engaged</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "14px", maxWidth: "450px" }}>
                    Synthesizing core ideas, structuring research sections, and compiling bibliographic citations...
                  </p>
                </div>
              )}

              {!paper && !paperLoading && (
                <div
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "16px",
                    padding: "60px 20px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(217, 70, 239, 0.1)", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", color: "var(--accent-fuchsia)", marginBottom: "8px" }}>
                    <BookOpen size={32} />
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: "600" }}>No Research Paper Drafted</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "14px", maxWidth: "450px" }}>
                    Generate a full academic manuscript draft detailing methodologies, introductory frameworks, and theoretical results.
                  </p>
                  {topic && (
                    <button
                      onClick={generatePaper}
                      style={{
                        background: "var(--accent-gradient)",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: "pointer",
                        marginTop: "8px"
                      }}
                    >
                      Draft Paper for "{topic.substring(0, 30)}..."
                    </button>
                  )}
                </div>
              )}

              {paper && !paperLoading && (
                <ResultCard 
                  title="📄 Academic Manuscript Draft" 
                  content={paper.paper} 
                />
              )}
            </div>
          )}

          {/* TAB 4: PEER REVIEWER VIEW */}
          {currentTab === "reviewer" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }} className="animate-fade-in">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontSize: "22px", fontWeight: "700" }}>Peer Reviewer Module</h2>
                {topic && !review && !reviewLoading && (
                  <button
                    onClick={reviewPaper}
                    style={{
                      background: "var(--accent-gradient)",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      color: "white",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer"
                    }}
                  >
                    Evaluate Topic
                  </button>
                )}
              </div>

              {reviewLoading && (
                <div
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "16px",
                    padding: "60px 20px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <Loader2 size={36} className="animate-spin" style={{ color: "var(--accent-violet)" }} />
                  <h3 style={{ fontSize: "16px", fontWeight: "600" }}>Reviewer Agent Critiquing</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "14px", maxWidth: "450px" }}>
                    Analyzing arguments, checking study limitations, and compiling peer-review scorecard...
                  </p>
                </div>
              )}

              {!review && !reviewLoading && (
                <div
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "16px",
                    padding: "60px 20px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(139, 92, 246, 0.1)", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", color: "var(--accent-violet)", marginBottom: "8px" }}>
                    <Binary size={32} />
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: "600" }}>No Peer Review Analysis</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "14px", maxWidth: "450px" }}>
                    Trigger the reviewer agent to receive structural assessments, research critique reports, and suggestions for improvement.
                  </p>
                  {topic && (
                    <button
                      onClick={reviewPaper}
                      style={{
                        background: "var(--accent-gradient)",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: "pointer",
                        marginTop: "8px"
                      }}
                    >
                      Critique "{topic.substring(0, 30)}..."
                    </button>
                  )}
                </div>
              )}

              {review && !reviewLoading && (
                <ResultCard 
                  title="🧠 Peer Review Critique Report" 
                  content={review.review} 
                />
              )}
            </div>
          )}

          {/* TAB 5: PATENT CHECKER VIEW */}
          {currentTab === "patents" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }} className="animate-fade-in">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ fontSize: "22px", fontWeight: "700" }}>Intellectual Property & Patent Checker</h2>
                {topic && !patent && !patentLoading && (
                  <button
                    onClick={patentCheck}
                    style={{
                      background: "var(--accent-gradient)",
                      border: "none",
                      padding: "8px 16px",
                      borderRadius: "8px",
                      color: "white",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer"
                    }}
                  >
                    Check IP
                  </button>
                )}
              </div>

              {patentLoading && (
                <div
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "16px",
                    padding: "60px 20px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <Loader2 size={36} className="animate-spin" style={{ color: "var(--accent-cyan)" }} />
                  <h3 style={{ fontSize: "16px", fontWeight: "600" }}>Patent Examiner Agent Online</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "14px", maxWidth: "450px" }}>
                    Scanning patent registries, verifying prior-art databases, and determining intellectual novelty factors...
                  </p>
                </div>
              )}

              {!patent && !patentLoading && (
                <div
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "16px",
                    padding: "60px 20px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(6, 182, 212, 0.1)", display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "center", color: "var(--accent-cyan)", marginBottom: "8px" }}>
                    <ShieldCheck size={32} />
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: "600" }}>No Patent Verification Loaded</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "14px", maxWidth: "450px" }}>
                    Evaluate your project against active patents, determine legal viability, prior art issues, and novelty metrics.
                  </p>
                  {topic && (
                    <button
                      onClick={patentCheck}
                      style={{
                        background: "var(--accent-gradient)",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        fontWeight: "600",
                        cursor: "pointer",
                        marginTop: "8px"
                      }}
                    >
                      Scan IP for "{topic.substring(0, 30)}..."
                    </button>
                  )}
                </div>
              )}

              {patent && !patentLoading && (
                <ResultCard 
                  title="⚖ Intellectual Property Prior-Art & Patent Review" 
                  content={patent.patent_analysis} 
                />
              )}
            </div>
          )}

          {/* TAB 6: CHAT ASSISTANT VIEW */}
          {currentTab === "chat" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }} className="animate-fade-in">
              <div>
                <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "4px" }}>ARES-X Copilot</h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "13px" }}>Discuss literature, modify research roadmaps, or brainstorm experiments with the agent.</p>
              </div>

              {/* Chat Canvas */}
              <div
                style={{
                  background: "var(--bg-card)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "16px",
                  height: "500px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)"
                }}
              >
                {/* Messages Log */}
                <div
                  style={{
                    flexGrow: 1,
                    overflowY: "auto",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {chatHistory.map((msg, index) => {
                    const isAi = msg.sender === "ai";
                    return (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: isAi ? "flex-start" : "flex-end",
                          width: "100%"
                        }}
                      >
                        <div
                          style={{
                            maxWidth: "75%",
                            padding: "14px 18px",
                            borderRadius: isAi ? "16px 16px 16px 4px" : "16px 16px 4px 16px",
                            background: isAi ? "var(--bg-tertiary)" : "var(--accent-gradient)",
                            border: isAi ? "1px solid var(--border-subtle)" : "none",
                            color: "var(--text-primary)",
                            fontSize: "14px",
                            lineHeight: "1.5",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })}
                  {chatLoading && (
                    <div style={{ display: "flex", justifyContent: "flex-start" }}>
                      <div
                        style={{
                          padding: "14px 18px",
                          borderRadius: "16px 16px 16px 4px",
                          background: "var(--bg-tertiary)",
                          border: "1px solid var(--border-subtle)",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          color: "var(--text-secondary)",
                          fontSize: "14px"
                        }}
                      >
                        <Loader2 size={14} className="animate-spin" />
                        Agent thinking...
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Preset Suggestions Quick Bar */}
                <div 
                  style={{ 
                    padding: "0 24px", 
                    display: "flex", 
                    gap: "8px", 
                    overflowX: "auto", 
                    whiteSpace: "nowrap",
                    scrollbarWidth: "none" // hide scrollbar in Firefox
                  }}
                >
                  {[
                    "Formulate a secondary hypothesis.",
                    "What are the major barriers to entry here?",
                    "Detail the recommended methodologies."
                  ].map((preset, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setChatInput(preset);
                      }}
                      style={{
                        background: "rgba(255, 255, 255, 0.03)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text-secondary)",
                        borderRadius: "12px",
                        padding: "8px 12px",
                        fontSize: "12px",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}
                      className="preset-btn"
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                {/* Message Input Box */}
                <form
                  onSubmit={sendChatMessage}
                  style={{
                    padding: "20px 24px",
                    borderTop: "1px solid var(--border-subtle)",
                    display: "flex",
                    gap: "12px"
                  }}
                >
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask a question about the research topic or methodology..."
                    style={{
                      flexGrow: 1,
                      background: "rgba(0, 0, 0, 0.2)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "10px",
                      padding: "12px 16px",
                      color: "var(--text-primary)",
                      fontSize: "14px",
                      outline: "none"
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: "var(--accent-gradient)",
                      border: "none",
                      borderRadius: "10px",
                      padding: "12px 20px",
                      color: "white",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Send size={16} />
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Button hovers */
        .glow-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(139, 92, 246, 0.5) !important;
        }
        .standard-btn:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: var(--text-muted) !important;
          transform: translateY(-2px);
        }
        .pdf-btn:hover {
          background: rgba(6, 182, 212, 0.15) !important;
          border-color: rgba(6, 182, 212, 0.5) !important;
          transform: translateY(-2px);
        }
        .preset-btn:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          color: var(--text-primary) !important;
          border-color: var(--accent-violet) !important;
        }
        .recent-topic-item:hover {
          background: rgba(139, 92, 246, 0.05) !important;
          border-color: rgba(139, 92, 246, 0.25) !important;
          color: var(--text-primary) !important;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </>
  );
}

export default App;