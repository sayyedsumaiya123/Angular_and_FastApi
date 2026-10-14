import { useState } from 'react'
import CrudDemo from '../site/CrudDemo.jsx'
import { validateEvent, validInteger } from '../site/validation.js'

export const MOCK_EVENTS = [
  {
    id: 1,
    title: 'Modern API Design Workshop',
    category: 'Workshop',
    date: 'Nov 20, 2026',
    time: '10:00 AM - 1:00 PM',
    location: 'Auditorium A & Live Stream',
    total_seats: 60,
    available_seats: 14,
    registered_count: 46,
    is_sold_out: false
  },
  {
    id: 2,
    title: 'National GenAI Hackathon 2026',
    category: 'Hackathon',
    date: 'Dec 02, 2026',
    time: '9:00 AM - 9:00 PM',
    location: 'Innovation Hub, Block 4',
    total_seats: 100,
    available_seats: 2,
    registered_count: 98,
    is_sold_out: false
  },
  {
    id: 3,
    title: 'Modern UI/UX Design System Conference',
    category: 'Design',
    date: 'Dec 14, 2026',
    time: '2:00 PM - 6:00 PM',
    location: 'Virtual Webinar',
    total_seats: 200,
    available_seats: 75,
    registered_count: 125,
    is_sold_out: false
  },
  {
    id: 4,
    title: 'Tech Founders & Builders Mixer',
    category: 'Networking',
    date: 'Jan 10, 2027',
    time: '6:30 PM - 9:30 PM',
    location: 'Rooftop Lounge',
    total_seats: 40,
    available_seats: 0,
    registered_count: 40,
    is_sold_out: true
  }
]

// --- Stage 0 Widget ---
function Stage0Widget() {
  const [data, setData] = useState(null)

  return (
    <div className="api-tester-card">
      <div className="endpoint-bar">
        <span className="http-method method-get">GET</span>
        <span className="endpoint-url">http://127.0.0.1:8000/api/events</span>
        <button className="btn btn-auto" onClick={() => setData(MOCK_EVENTS)}>Execute</button>
      </div>
      {data && (
        <pre className="json-response-box">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  )
}

const Stage0Code = `from fastapi import FastAPI

app = FastAPI(title="Event Management API")

EVENTS = [
    {"id": 1, "title": "Modern API Design Workshop", "available_seats": 14},
    {"id": 2, "title": "GenAI Hackathon", "available_seats": 2}
]

@app.get("/api/events")
def list_events():
    """Stage 0: Return static list of events in JSON format"""
    return EVENTS`

// --- Stage 1 Widget ---
function Stage1Widget() {
  const [id, setId] = useState('1')
  const [resp, setResp] = useState(null)

  function run() {
    if (!validInteger(id)) {
      setResp({ status: 422, body: { detail: 'Event ID must be an integer' } })
      return
    }
    const found = MOCK_EVENTS.find(e => e.id === Number(id))
    if (found) {
      setResp({ status: 200, body: found })
    } else {
      setResp({ status: 404, body: { detail: `Event ${id} not found` } })
    }
  }

  return (
    <div className="api-tester-card">
      <div className="endpoint-bar">
        <span className="http-method method-get">GET</span>
        <span className="endpoint-url">/api/events/{id}</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
        <input className="input-field" value={id} onChange={e => setId(e.target.value)} placeholder="Event ID" />
        <button className="btn btn-auto" onClick={run}>Send</button>
      </div>
      {resp && (
        <>
          <span className={`status-badge status-${resp.status}`}>HTTP {resp.status}</span>
          <pre className="json-response-box" style={{ marginTop: '8px' }}>
            {JSON.stringify(resp.body, null, 2)}
          </pre>
        </>
      )}
    </div>
  )
}

const Stage1Code = `from fastapi import FastAPI, HTTPException, status

app = FastAPI()

@app.get("/api/events/{event_id}")
def get_event(event_id: int):
    """Stage 1: Fetch single event with automatic integer parsing & 404 check"""
    for event in EVENTS:
        if event["id"] == event_id:
            return event
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Event {event_id} not found"
    )`

// --- Stage 2 Widget ---
function Stage2Widget() {
  const [title, setTitle] = useState('Production Microservices with FastAPI')
  const [seats, setSeats] = useState(50)
  const [res, setRes] = useState(null)

  function create() {
    const detail = validateEvent(title, seats)
    if (detail.length) { setRes({ status: 422, body: { detail } }); return }
    setRes({
      status: 201,
      body: {
        id: 5,
        title,
        category: 'Tech',
        total_seats: Number(seats),
        available_seats: Number(seats),
        registered_count: 0,
        is_sold_out: false
      }
    })
  }

  return (
    <div className="api-tester-card">
      <div className="endpoint-bar">
        <span className="http-method method-post">POST</span>
        <span className="endpoint-url">/api/events</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px' }}>
        <input className="input-field" value={title} onChange={e => setTitle(e.target.value)} />
        <input type="number" className="input-field" value={seats} onChange={e => setSeats(e.target.value)} />
        <button className="btn" onClick={create}>Publish Event (POST 201)</button>
      </div>
      {res && (
        <>
          <span className={`status-badge status-${res.status}`}>HTTP {res.status}</span>
          <pre className="json-response-box" style={{ marginTop: '8px' }}>
            {JSON.stringify(res.body, null, 2)}
          </pre>
        </>
      )}
    </div>
  )
}

const Stage2Code = `from pydantic import BaseModel, Field
from fastapi import FastAPI, status

app = FastAPI()

class EventCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=100)
    category: str
    total_seats: int = Field(..., gt=0)

@app.post("/api/events", status_code=status.HTTP_201_CREATED)
def create_event(event: EventCreate):
    """Stage 2: Pydantic payload validation & creation"""
    new_event = {
        "id": len(EVENTS) + 1,
        **event.model_dump(),
        "available_seats": event.total_seats,
        "registered_count": 0,
        "is_sold_out": False
    }
    EVENTS.append(new_event)
    return new_event`

// --- Stage 3 Widget ---
function Stage3Widget() {
  const [cat, setCat] = useState('All')
  const [search, setSearch] = useState('')
  const [res, setRes] = useState(null)

  function filter() {
    let list = MOCK_EVENTS
    if (cat !== 'All') list = list.filter(e => e.category === cat)
    if (search) list = list.filter(e => e.title.toLowerCase().includes(search.toLowerCase()))
    setRes(list)
  }

  return (
    <div className="api-tester-card">
      <div className="endpoint-bar">
        <span className="http-method method-get">GET</span>
        <span className="endpoint-url">/api/events?category={cat}&search={search}</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
        <select className="input-field" value={cat} onChange={e => setCat(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Workshop">Workshop</option>
          <option value="Hackathon">Hackathon</option>
          <option value="Design">Design</option>
          <option value="Networking">Networking</option>
        </select>
        <input className="input-field" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        <button className="btn btn-auto" onClick={filter}>Filter</button>
      </div>
      {res && (
        <pre className="json-response-box">
          {JSON.stringify(res, null, 2)}
        </pre>
      )}
    </div>
  )
}

const Stage3Code = `from fastapi import FastAPI, Query
from typing import Optional

app = FastAPI()

@app.get("/api/events")
def search_events(
    category: Optional[str] = Query(None, description="Category filter"),
    search: Optional[str] = Query(None, description="Keyword search in title")
):
    """Stage 3: Advanced filtering and query string search"""
    results = EVENTS
    if category and category.lower() != "all":
        results = [e for e in results if e["category"].lower() == category.lower()]
    if search:
        results = [e for e in results if search.lower() in e["title"].lower()]
    return results`

// --- Stage 4 Widget ---
function Stage4Widget() {
  const [seats, setSeats] = useState(14)
  const [statusMsg, setStatusMsg] = useState(null)

  function rsvp() {
    if (seats <= 0) {
      setStatusMsg({ status: 400, detail: 'Event is already sold out!' })
    } else {
      setSeats(s => s - 1)
      setStatusMsg({
        status: 200,
        data: {
          success: true,
          message: 'RSVP confirmed!',
          event_id: 1,
          remaining_seats: seats - 1
        }
      })
    }
  }

  return (
    <div className="api-tester-card">
      <div className="endpoint-bar">
        <span className="http-method method-post">POST</span>
        <span className="endpoint-url">/api/events/1/rsvp</span>
        <button className="btn btn-auto" onClick={rsvp}>Send RSVP</button>
      </div>
      <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>
        Current Available Seats in Database: <b>{seats}</b>
      </div>
      {statusMsg && (
        <>
          <span className={`status-badge status-${statusMsg.status}`}>HTTP {statusMsg.status}</span>
          <pre className="json-response-box" style={{ marginTop: '8px' }}>
            {JSON.stringify(statusMsg.data || statusMsg, null, 2)}
          </pre>
        </>
      )}
    </div>
  )
}

const Stage4Code = `from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, status

app = FastAPI()

class RsvpRequest(BaseModel):
    attendee_name: str
    attendee_email: str

@app.post("/api/events/{event_id}/rsvp")
def rsvp_to_event(event_id: int, payload: RsvpRequest):
    """Stage 4: RSVP registration with seat capacity guard"""
    event = find_event(event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    if event["available_seats"] <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Event is already sold out"
        )
    event["available_seats"] -= 1
    event["registered_count"] += 1
    event["is_sold_out"] = event["available_seats"] <= 0
    return {
        "success": True,
        "message": f"RSVP confirmed for {payload.attendee_name}!",
        "remaining_seats": event["available_seats"]
    }`

// --- Stage 5 Widget ---
function Stage5Widget() { return <CrudDemo /> }

const Stage5Code = `from fastapi import FastAPI, HTTPException, status

app = FastAPI()

@app.put("/api/events/{event_id}")
def update_event(event_id: int, updates: EventUpdate):
    """Stage 5: Modify event details with partial updates"""
    event = find_event(event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    for key, val in updates.model_dump(exclude_unset=True).items():
        event[key] = val
    return event

@app.delete("/api/events/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_event(event_id: int):
    """Stage 5: Delete event and free resources"""
    event = find_event(event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    EVENTS.remove(event)
    return None`

// --- Stage 6 Widget ---
function Stage6Widget() {
  const [stats, setStats] = useState(null)

  return (
    <div className="api-tester-card">
      <h4>Stage 6 · Complete Connected REST API with Swagger Docs</h4>
      <p style={{ fontSize: '13px', color: 'var(--muted)', margin: '8px 0 14px' }}>
        Features a modular APIRouter, explicit CORS settings, and a summary stats endpoint.
      </p>
      <div className="endpoint-bar">
        <span className="http-method method-get">GET</span>
        <span className="endpoint-url">/api/events/stats/summary</span>
        <button
          className="btn btn-auto"
          onClick={() => setStats({ total_events: MOCK_EVENTS.length, total_seats: MOCK_EVENTS.reduce((sum, e) => sum + e.total_seats, 0), total_rsvp_count: MOCK_EVENTS.reduce((sum, e) => sum + e.registered_count, 0), sold_out_events: MOCK_EVENTS.filter(e => e.is_sold_out).length })}
        >
          Get Stats
        </button>
      </div>

      {stats && (
        <pre className="json-response-box">
          {JSON.stringify(stats, null, 2)}
        </pre>
      )}

      <div className="ex-panel" style={{ marginTop: '14px', background: '#f8fafc' }}>
        <b>Interactive Swagger Docs Available At:</b> <a href="http://127.0.0.1:8000/docs" target="_blank" rel="noreferrer">Open Swagger docs</a>
      </div>
    </div>
  )
}

const Stage6Code = `# main.py - Complete Event Management System API
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.events import router as events_router

app = FastAPI(
    title="Event Management System API",
    description="Workshop REST API for learning route design, validation, and event registration.",
    version="1.0.0"
)

# Explicit local browser-client origins. Never combine wildcard origins with credentials.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(events_router)

@app.get("/")
def health_check():
    return {"status": "healthy", "docs": "/docs"}

# Run with: uvicorn main:app --reload --port 8000`

export const emsStages = [
  {
    id: 'ems-0',
    name: 'Stage 0 — In-Memory Event List',
    topic: 'GET Endpoints & JSON',
    intro: 'Return an initial list of event objects in JSON format at GET /api/events.',
    steps: [
      'Initialize FastAPI app = FastAPI()',
      'Define in-memory list of event dictionaries',
      'Create @app.get("/api/events") returning the events list',
      'Run uvicorn main:app --reload and view the JSON response'
    ],
    code: Stage0Code,
    Component: Stage0Widget,
  },
  {
    id: 'ems-1',
    name: 'Stage 1 — Path Parameters & 404',
    topic: 'Route Parameters & HTTPException',
    intro: 'Fetch a single event by ID with automatic integer validation and HTTP 404 error handling.',
    steps: [
      'Add route decorator @app.get("/api/events/{event_id}")',
      'Type-hint event_id: int in the handler function',
      'Look up event in database; if missing, raise HTTPException(status_code=404)',
      'Notice: Requesting /events/abc automatically returns HTTP 422 Unprocessable Entity'
    ],
    code: Stage1Code,
    Component: Stage1Widget,
  },
  {
    id: 'ems-2',
    name: 'Stage 2 — Pydantic Validation & Creation',
    topic: 'POST & Request Body',
    intro: 'Accept and validate event creation payloads with Pydantic BaseModel and HTTP 201 Created.',
    steps: [
      'Define class EventCreate(BaseModel) with title and total_seats fields',
      'Decorate route with @app.post("/api/events", status_code=status.HTTP_201_CREATED)',
      'Append new validated event to database and return created resource'
    ],
    code: Stage2Code,
    Component: Stage2Widget,
  },
  {
    id: 'ems-3',
    name: 'Stage 3 — Filtering & Search Query Params',
    topic: 'Query Parameters',
    intro: 'Support query parameters (?category=Workshop&search=AI) to filter and search events dynamically.',
    steps: [
      'Add optional category: str | None = None and search: str | None = None parameters',
      'Filter database list according to supplied query values',
      'Return filtered subset to client'
    ],
    code: Stage3Code,
    Component: Stage3Widget,
  },
  {
    id: 'ems-4',
    name: 'Stage 4 — RSVP Endpoint & Capacity Guard',
    topic: 'Business Logic & Validation',
    intro: 'Register attendee for an event, decrement open seats, and guard against overselling.',
    steps: [
      'Create endpoint @app.post("/api/events/{id}/rsvp")',
      'Check if available_seats > 0; if 0, raise HTTP 400 Bad Request ("Sold Out")',
      'Decrement available_seats and increment registered_count',
      'Return remaining seat count to client'
    ],
    code: Stage4Code,
    Component: Stage4Widget,
  },
  {
    id: 'ems-5',
    name: 'Stage 5 — Update & Delete CRUD Endpoints',
    topic: 'PUT & DELETE Operations',
    intro: 'Modify event fields with PUT and remove events with DELETE returning 204 No Content.',
    steps: [
      'Define @app.put("/api/events/{id}") accepting EventUpdate schema',
      'Define @app.delete("/api/events/{id}", status_code=204) to remove event',
      'Verify resource exists before applying mutations'
    ],
    code: Stage5Code,
    Component: Stage5Widget,
  },
  {
    id: 'ems-6',
    name: 'Stage 6 — Modular Architecture & CORS',
    topic: 'APIRouter, CORS & Production Setup',
    intro: 'Complete modular Event Management API with APIRouter, CORSMiddleware, and interactive Swagger docs.',
    steps: [
      'Split endpoints into routers/events.py using APIRouter',
      'Add CORSMiddleware with an explicit local browser-client origin',
      'Add aggregate stats summary endpoint GET /api/events/stats/summary',
      'Open http://127.0.0.1:8000/docs to explore the full interactive OpenAPI docs'
    ],
    code: Stage6Code,
    Component: Stage6Widget,
  }
]
