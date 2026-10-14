# FastAPI Workshop — Session Companion & Event Management API

A complete, self-contained workshop package for learning modern FastAPI (Python 3.10+, Pydantic v2, Async ASGI, Type Hints, CRUD & CORS), featuring an interactive **Event Management System API** live project.

---

## 📂 Repository Structure

- **`SESSION-SOURCE.md`**: Complete, in-depth reference guide covering modern FastAPI concepts, Starlette foundations, and REST best practices.
- **Runnable FastAPI Backend (`main.py`, `routers/events.py`, `schemas.py`, `database.py`)**: A local workshop API ready to run with Uvicorn. Its in-memory store is for teaching only: data resets on restart and is not suitable for production or multiple workers.
- **Interactive Workshop Companion (`src/`)**: Facilitator-led concepts (01 to 09), starter/solution examples, simulated request/response previews, and progressive Event Management System API stages. Use the running `/docs` page for live requests.

---

## 🚀 Quick Start

### 1. Run the Python FastAPI Backend

```bash
# 1. Navigate to fastapi-session
cd fastapi-session

# 2. Install dependencies (optional if uvicorn & fastapi are already installed)
pip install -r requirements.txt

# 3. Start Uvicorn server with auto-reload
uvicorn main:app --reload --port 8000
```

- API Base: `http://127.0.0.1:8000`
- Interactive OpenAPI Docs: `http://127.0.0.1:8000/docs`
- ReDoc Docs: `http://127.0.0.1:8000/redoc`

#### Test the backend with the test script:
```bash
python test_api.py
```

---

### 2. Run the Interactive Workshop Companion Web App

```bash
# In another terminal:
cd fastapi-session
npm install
npm run dev
```

Open `http://localhost:5175` to explore:
- **Session A**: FastAPI Core & Pydantic (First Route, Path Params, Query Params, Request Body)
- **Session B**: CRUD, CORS & Dependencies (CRUD semantics, response models, business errors, dependency injection, CORS, and API testing)
- **Live Project**: Event Management API progressive stages 0 through 6!

---

## 🎯 Curriculum Breakdown

1. **01 · First Route & ASGI App**: `@app.get("/")`, JSON responses, and Uvicorn
2. **02 · Path Parameters & Type Safety**: `/events/{event_id}: int` with 422 validation
3. **03 · Query Parameters & Filtering**: Optional query strings, defaults, and pagination
4. **04 · Request Body & Pydantic**: Data modeling with `BaseModel` and validation
5. **05 · CRUD Operations & HTTP Verbs**: Standard `GET`, `POST`, `PUT`, `DELETE` semantics
6. **06 · Response Models & Status Codes**: `status.HTTP_201_CREATED` and data filtering
7. **07 · Error Handling & HTTP Exceptions**: `HTTPException` with clean JSON payloads
8. **08 · CORS & Browser Clients**: `CORSMiddleware` and explicit development origins

---

## ⚡ Live Project — Event Management API (EMS)

Progressive stages:
- **Stage 0**: In-Memory Event List (`GET /api/events`)
- **Stage 1**: Path Parameters & 404 (`GET /api/events/{id}`)
- **Stage 2**: Pydantic Validation & Event Creation (`POST /api/events`)
- **Stage 3**: Filtering & Search Query Params (`category`, `search`)
- **Stage 4**: RSVP Endpoint with Capacity Guard (`POST /api/events/{id}/rsvp`)
- **Stage 5**: Update & Delete CRUD Endpoints (`PUT /api/events/{id}`, `DELETE /api/events/{id}`)
- **Stage 6**: Complete Modular REST API with CORS & Swagger Interactive UI
