# ARES-X: Autonomous Research Evolution System

ARES-X coordinates a decentralized swarm of AI agents to accelerate clinical, theoretical, and engineering research pipelines. Using an advanced multi-agent architecture, ARES-X automates literature synthesis, detects research gaps, drafts academic manuscripts, reviews papers, and validates intellectual property claims.

---

## 🚀 Key Features

* **Multi-Agent Research Swarm**: Coordinates 10 specialized AI agents (Literature Review, Gap Detector, Hypothesis Planner, etc.) to perform deep scientific analysis.
* **Paper Writer Engine**: Generates ready-to-publish academic drafts with structured sections, bibliographies, and citations.
* **Patent Analysis Mode**: Screens your research hypothesis against existing patents to identify intellectual property conflicts and novelty.
* **ARES-X Copilot (Research Assistant)**: Real-time, chat-based agent assistant powered by Gemini.
* **Interactive Core Console**: A dynamic dashboard with quick-action triggers, background stepper progress visualization, and clickable status cards for navigation.

---

## 🛠️ Architecture & Tech Stack

### Frontend
* **Core**: React 18, Vite
* **Styling**: Vanilla CSS with glassmorphic designs, dark mode accents, and premium animations.
* **Icons**: `lucide-react`

### Backend
* **Core**: FastAPI (Python 3.10+)
* **AI Engine**: Google GenAI SDK (utilizing `gemini-2.5-flash` / `gemini-2.5-pro`)
* **Server**: Uvicorn

---

## 📦 Installation & Setup

### 1. Prerequisites
Ensure you have the following installed:
* [Python 3.10+](https://www.python.org/downloads/)
* [Node.js (v18+)](https://nodejs.org/)

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On macOS/Linux:
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file in the `backend/` directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```
5. Start the backend server:
   ```bash
   python -m uvicorn app.main:app --reload
   ```

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install Node packages:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Access the web app at `http://localhost:5173`.

---

## 💡 How to Use

1. **Set Your Topic**: Enter your research hypothesis or topic area in the main dashboard console (e.g., *AI-powered Drug Discovery using Multi-Agent Systems*).
2. **Run Pipeline**: Click **Execute Pipeline** to trigger literature review and gap analysis. You will see a 5-step background agent execution flow.
3. **Draft & Review**: Use **Draft Paper** to assemble a full academic manuscript, and **Peer Review** to evaluate it.
4. **Export**: Export compiled analysis and manuscripts to high-quality PDF reports.
5. **Quick Navigation**: Click on any of the four status boxes (**Research Modules**, **Paper Writer Engine**, **Patent Analysis Mode**, **Workspace Status**) at the bottom of the dashboard to quickly switch between working workspaces.
