# Fullstack Workshop Series: React, Angular & FastAPI

A complete, staged developer workshop curriculum featuring interactive learning companions, concept references, and live projects.

---

## 🏛️ Ecosystem Overview

| Repository | Tech Stack | Live Project | Key Topics |
|---|---|---|---|
| [`react-session/`](./react-session) | React 19 + Vite | **Rock Paper Scissors** | JSX, Components, State, Hooks, Props, Conditional Rendering |
| [`angular-session/`](./angular-session) | Angular 18+ & Signals | **Event Management System** | Standalone Components, Signals, Control Flow `@for/@if`, Forms, Services |
| [`fastapi-session/`](./fastapi-session) | Python 3.12 + FastAPI | **Event Management API** | ASGI, Pydantic v2, Path/Query Params, CRUD, CORS, Swagger Docs |

---

## 🎟️ Live Project: Event Management System (EMS)

The Angular frontend and FastAPI backend pair up seamlessly:

```
┌──────────────────────────────────────────────┐
│           Angular Frontend (EMS)             │
│   • EventCard Component   • Search & Filter  │
│   • Signal State Reactivity • RSVP Action    │
└──────────────────────┬───────────────────────┘
                       │ HTTP / JSON (CORS Enabled)
                       ▼
┌──────────────────────────────────────────────┐
│            FastAPI Backend (EMS)             │
│   • GET /api/events       • POST /api/events │
│   • POST /api/events/{id}/rsvp               │
│   • Automatic Swagger Docs at /docs          │
└──────────────────────────────────────────────┘
```

---

## ⚡ Quick Start

### 1. Angular Session
```bash
cd angular-session
npm install
npm run dev     # Starts interactive workshop at http://localhost:5174
```

To run the standalone Angular project:
```bash
cd angular-session/angular-project
npm install
npm start       # Starts Angular application at http://localhost:4200
```

### 2. FastAPI Session
```bash
cd fastapi-session

# Run the real Python API:
uvicorn main:app --reload --port 8000   # Swagger docs at http://127.0.0.1:8000/docs

# In another terminal, run the interactive tutorial companion:
npm install
npm run dev     # Starts companion at http://localhost:5175
```

### 3. React Session
```bash
cd react-session
npm install
npm run dev     # Starts React companion at http://localhost:5173
```
