# VectorShift Frontend Assessment

This repository contains the completed frontend and backend for the VectorShift technical assessment.

## How to Run the Application

This project is split into two parts: the **Frontend** (React) and the **Backend** (FastAPI). You will need two separate terminal windows to run them both simultaneously.

### 1. Running the Backend
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the necessary Python packages (if you haven't already):
   ```bash
   pip install fastapi uvicorn
   ```
3. Start the FastAPI backend server using Uvicorn:
   ```bash
   uvicorn main:app --reload
   ```
   *The backend will be running on `http://localhost:8000`.*

### 2. Running the Frontend
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
   *The frontend will open in your browser at `http://localhost:3000`.*

---

## Features Implemented
* **Node Abstraction:** A `BaseNode` component handles all standard node styling, resizing, and connections for unlimited scalability.
* **Premium Glassmorphism UI:** Complete dark mode visual overhaul, floating toolbars, glowing inputs, and a custom animation suite.
* **Dynamic Auto-resizing Text Nodes:** `<textarea>` elements adapt to their content dynamically in width and height.
* **Variable Parsing with RegEx:** Types `{{ var }}` dynamically generate handle inputs on the left side of Text nodes.
* **Node Resizers & Undo History:** Full `Ctrl + Z` undo history implementation, `NodeResizer` elements for scaling, and custom Edge deletion (one-click "X" button on flows).
* **Custom Verification UI Modal:** Removed the ugly browser `alert()` and replaced it with a stylized, loading overlay that validates the network's Directed Acyclic Graph structure against the Python backend.
