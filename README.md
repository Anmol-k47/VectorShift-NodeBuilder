# VectorShift Frontend Assessment: Premium Pipeline Editor 🚀

Welcome to my highly customized and polished submission for the **VectorShift Technical Assessment**. 

This project goes far beyond a simple drag-and-drop implementation. It is a **fully functional, beautifully designed, and highly interactive Directed Acyclic Graph (DAG) node editor**. I set out to create a truly premium user experience, akin to industry-leading visual programming interfaces. 

It seamlessly connects a React-based frontend canvas with a FastAPI Python backend to parse, validate, and analyze node networks in real-time.

---

## ✨ Why This Project is Wonderful (Key Highlights)

### 🎨 1. Premium "Glassmorphism" UI & Dark Mode
The entire interface was designed from scratch without relying on bloated component libraries. It features:
- **Deep Indigo Dark Mode:** A stunning, eye-friendly gradient backdrop.
- **Glassmorphic Nodes:** Translucent, frosted-glass nodes (`backdrop-filter: blur()`) with subtle box-shadows that make them feel like they are floating over the canvas.
- **Interactive Animations:** Nodes float in when created, pulse with a glowing aura when selected, and inputs feature smooth focus transitions.

### 🧠 2. Intelligent Node Abstraction
To ensure the codebase scales effortlessly, I built a universal `<BaseNode />` component.
- All nodes (Input, LLM, Text, Output, and 5 Custom Add-ons) inherit from this master component.
- It automatically handles the Node body, glowing header dots, standardized padding, and even dynamic Handle (connection dot) generation.

### 🔧 3. Advanced Interactivity & Ease of Use
- **Unlimited Resizing:** Integrated React Flow's `<NodeResizer />` allowing users to click any node and drag glowing handles to scale it to any size.
- **Auto-Expanding Text Nodes:** Textarea inputs calculate their scroll heights and dynamically resize to fit content perfectly as you type.
- **Regex Variable Parsing:** Typing `{{ variable_name }}` instantly parses the string via Regex and magically sprouts a new connection handle on the node's edge.
- **Effortless Flow Deletion:** Created a Custom Edge component. If you connect a flow incorrectly, simply click the bright red "X" sitting directly on the line to disjoint it.
- **Robust Ctrl+Z Undo History:** Built a full History Stack inside our Zustand store. Made a mistake? Deleted the wrong node? Just press `Ctrl+Z` (or `Cmd+Z`) anywhere to instantly undo your actions!

### ⚙️ 4. Seamless Backend Integration & Custom Verification
- Instead of using a clunky, default browser `alert()` to show backend responses, I built a **Custom Overlay Modal**.
- When you click submit, it simulates a processing delay, sends the entire graph structure to the FastAPI backend, calculates cycle-detection (DFS), and gracefully animates in a dashboard showing the exact `Number of Nodes`, `Number of Edges`, and mathematically verifies if your pipeline is a valid `DAG`.

---

## 🛠️ How to Run the Application Locally

This project is split into two parts: the **Frontend** (React) and the **Backend** (FastAPI). You will need two separate terminal windows to run them both simultaneously.

### 1. Running the Backend (Python/FastAPI)
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the necessary Python packages:
   ```bash
   pip install fastapi uvicorn
   ```
3. Start the FastAPI backend server using Uvicorn:
   ```bash
   uvicorn main:app --reload
   ```
   *The backend will be running on `http://localhost:8000`.*

### 2. Running the Frontend (ReactJS)
1. Open a second terminal window and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the Node modules:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   *The frontend will seamlessly open in your browser at `http://localhost:3000`.*

---

Thank you for reviewing my assessment! I had a lot of fun building this and focused heavily on achieving a level of polish that users would truly love interacting with.
