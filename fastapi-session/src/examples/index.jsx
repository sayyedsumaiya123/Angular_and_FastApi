import { beginnerCrudCode } from './beginner-crud.js'
import { useState } from 'react'
import { MOCK_EVENTS } from '../live-project-ems/index.jsx'
import CrudDemo from '../site/CrudDemo.jsx'
import { validateEvent, validInteger } from '../site/validation.js'

// --- 01 First Route Preview ---
function FirstRouteStarter() {
  return (
    <div className="api-tester-card">
      <div className="endpoint-bar">
        <span className="http-method method-get">GET</span>
        <span className="endpoint-url">http://127.0.0.1:8000/</span>
      </div>
      <p style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '12px' }}>
        Server not running. No routes defined.
      </p>
      <button className="btn btn-secondary" disabled>Execute Request</button>
    </div>
  )
}

function FirstRouteSolution() {
  const [response, setResponse] = useState({ status: 200, data: { status: 'online', message: 'Welcome to the Event Management API', docs_url: '/docs' } })
  const [loading, setLoading] = useState(false)

  function runRequest() {
    setLoading(true)
    setTimeout(() => {
      setResponse({
        status: 200,
        data: {
          status: 'online',
          message: 'Welcome to the Event Management API',
          docs_url: '/docs'
        }
      })
      setLoading(false)
    }, 200)
  }

  return (
    <div className="api-tester-card">
      <div className="endpoint-bar">
        <span className="http-method method-get">GET</span>
        <span className="endpoint-url">http://127.0.0.1:8000/</span>
        <button className="btn btn-auto" onClick={runRequest}>
          {loading ? 'Sending...' : 'Send Request'}
        </button>
      </div>

      {response && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span className="status-badge status-200">HTTP 200 OK</span>
            <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Simulated response · Content-Type: application/json</span>
          </div>
          <pre className="json-response-box">
            {JSON.stringify(response.data, null, 2)}
          </pre>
        </>
      )}
    </div>
  )
}

// --- 02 Path Parameters Preview ---
function PathParamsStarter() {
  return (
    <div className="api-tester-card">
      <div className="endpoint-bar">
        <span className="http-method method-get">GET</span>
        <span className="endpoint-url">/events/1</span>
      </div>
      <p style={{ color: 'var(--muted)', fontSize: '13px' }}>
        Untyped string parameter: No automatic validation or integer conversion.
      </p>
    </div>
  )
}

function PathParamsSolution() {
  const [eventId, setEventId] = useState('1')
  const [result, setResult] = useState(null)

  function testParam() {
    if (eventId === '1') {
      setResult({
        status: 200,
        body: { id: 1, title: 'Modern API Design Workshop', seats: 60 }
      })
    } else if (!validInteger(eventId)) {
      setResult({
        status: 422,
        body: {
          detail: [{ loc: ['path', 'event_id'], msg: 'Input should be a valid integer', type: 'int_parsing' }]
        }
      })
    } else {
      setResult({
        status: 404,
        body: { detail: `Event ${eventId} not found` }
      })
    }
  }

  return (
    <div className="api-tester-card">
      <div className="endpoint-bar">
        <span className="http-method method-get">GET</span>
        <span className="endpoint-url">/events/{'{event_id}'}</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <input
          className="input-field"
          value={eventId}
          onChange={e => setEventId(e.target.value)}
          placeholder="Try 1, 99, or 'abc' to test 422 error"
        />
        <button className="btn btn-auto" onClick={testParam}>Test</button>
      </div>

      {result && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span className={`status-badge status-${result.status}`}>HTTP {result.status}</span>
          </div>
          <pre className="json-response-box">
            {JSON.stringify(result.body, null, 2)}
          </pre>
        </>
      )}
    </div>
  )
}

// --- 03 Query Parameters Preview ---
function QueryParamsStarter() {
  return (
    <div className="api-tester-card">
      <p style={{ color: 'var(--muted)', fontSize: '13px' }}>Unfiltered endpoint returning static list.</p>
    </div>
  )
}

function QueryParamsSolution() {
  const [category, setCategory] = useState('Workshop')
  const [limit, setLimit] = useState(5)
  const [res, setRes] = useState(null)

  function runQuery() {
    if (!validInteger(limit) || Number(limit) < 1 || Number(limit) > 100) {
      setRes({ status: 422, detail: 'limit must be an integer from 1 to 100' }); return
    }
    setRes({ status: 200, applied_filters: { category, limit: Number(limit) },
      events_returned: MOCK_EVENTS.filter(e => e.category === category).slice(0, Number(limit)) })
  }

  return (
    <div className="api-tester-card">
      <div className="endpoint-bar">
        <span className="http-method method-get">GET</span>
        <span className="endpoint-url">/events?category={category}&limit={limit}</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <select className="input-field" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="Workshop">Workshop</option>
          <option value="Hackathon">Hackathon</option>
          <option value="Design">Design</option>
        </select>
        <input
          type="number"
          className="input-field"
          value={limit}
          onChange={e => setLimit(e.target.value)}
          style={{ width: '80px' }}
        />
        <button className="btn btn-auto" onClick={runQuery}>Filter</button>
      </div>

      {res && (
        <pre className="json-response-box">
          {JSON.stringify(res, null, 2)}
        </pre>
      )}
    </div>
  )
}

// --- 04 Request Body & Pydantic Preview ---
function RequestBodyStarter() {
  return (
    <div className="api-tester-card">
      <p style={{ color: 'var(--muted)', fontSize: '13px' }}>Raw string parsing without schema validation.</p>
    </div>
  )
}

function RequestBodySolution() {
  const [title, setTitle] = useState('DevOps Summit 2026')
  const [seats, setSeats] = useState(100)
  const [res, setRes] = useState(null)

  function submitBody() {
    const detail = validateEvent(title, seats)
    if (detail.length) {
      setRes({
        status: 422,
        body: {
          detail
        }
      })
    } else {
      setRes({
        status: 201,
        body: {
          id: 105,
          title,
          category: 'Tech',
          total_seats: Number(seats),
          available_seats: Number(seats),
          status: 'Created successfully via Pydantic model'
        }
      })
    }
  }

  return (
    <div className="api-tester-card">
      <div className="endpoint-bar">
        <span className="http-method method-post">POST</span>
        <span className="endpoint-url">/api/events</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
        <input
          className="input-field"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          type="number"
          className="input-field"
          value={seats}
          onChange={e => setSeats(Number(e.target.value))}
          placeholder="Seats"
        />
        <button className="btn" onClick={submitBody}>Send POST with Pydantic Schema</button>
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

// --- 05 CRUD Operations Preview ---
function CrudStarter() {
  return (
    <div className="api-tester-card">
      <p style={{ color: 'var(--muted)', fontSize: '13px' }}>Only GET supported. No PUT or DELETE.</p>
    </div>
  )
}

function CrudSolution() { return <CrudDemo /> }

// --- 06 Response Models Preview ---
function ResponseModelsStarter() {
  return (
    <div className="api-tester-card">
      <p style={{ color: 'var(--muted)', fontSize: '13px' }}>Database internal fields exposed to public clients.</p>
    </div>
  )
}

function ResponseModelsSolution() {
  return (
    <div className="api-tester-card">
      <h4>Pydantic response_model Filtering</h4>
      <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>
        Internal DB fields (e.g. <code>secret_organizer_key</code>) are filtered out automatically.
      </p>
      <pre className="json-response-box">
{`// Internal DB: { "id": 1, "title": "Conf", "secret_key": "xyz" }
// Client Receives:
{
  "id": 1,
  "title": "Conf",
  "available_seats": 60,
  "is_sold_out": false
}`}
      </pre>
    </div>
  )
}

// --- 07 Error Handling Preview ---
function ExceptionsStarter() {
  return (
    <div className="api-tester-card">
      <p style={{ color: 'var(--muted)', fontSize: '13px' }}>Uncaught 500 Internal Server Error when item not found.</p>
    </div>
  )
}

function ExceptionsSolution() {
  const [testId, setTestId] = useState('999')
  const [output, setOutput] = useState(null)

  function trigger() {
    const event = MOCK_EVENTS.find(e => e.id === Number(testId))
    setOutput(!validInteger(testId) ? { status: 422, detail: 'Event ID must be an integer' } : event ? { status: 200, body: event } : { status: 404, detail: `Event with ID ${testId} does not exist.` })
  }

  return (
    <div className="api-tester-card">
      <div className="endpoint-bar">
        <span className="http-method method-get">GET</span>
        <span className="endpoint-url">/api/events/{testId}</span>
        <input className="input-field" aria-label="Event ID" value={testId} onChange={e => setTestId(e.target.value)} /><button className="btn btn-auto" onClick={trigger}>Send request</button>
      </div>
      {output && (
        <pre className="json-response-box">
          {JSON.stringify(output, null, 2)}
        </pre>
      )}
    </div>
  )
}

// --- 08 CORS Preview ---
function CorsStarter() {
  return (
    <div className="api-tester-card">
      <p style={{ color: '#ef4444', fontSize: '13px' }}>
        ❌ Access to fetch from origin 'http://localhost:4200' has been blocked by CORS policy.
      </p>
    </div>
  )
}

function CorsSolution() {
  return (
    <div className="api-tester-card">
      <span className="status-badge status-200">✓ CORS Configured</span>
      <p style={{ color: 'var(--muted)', fontSize: '13px', margin: '8px 0' }}>
        CORSMiddleware allows explicitly listed local frontend origins to call FastAPI:
      </p>
      <pre className="json-response-box">
{`Access-Control-Allow-Origin: http://localhost:5173
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: *`}
      </pre>
    </div>
  )
}

// --- 09 Dependency Injection Preview ---
function DependenciesStarter() {
  return (
    <div className="api-tester-card">
      <p style={{ color: 'var(--muted)', fontSize: '13px' }}>
        Each route parses its own search and pagination parameters, duplicating logic.
      </p>
      <pre className="json-response-box">{'@app.get("/api/events")\ndef list_events(q: str | None = None, limit: int = 20): ...\n\n@app.get("/api/speakers")\ndef list_speakers(q: str | None = None, limit: int = 20): ...'}</pre>
    </div>
  )
}

function DependenciesSolution() {
  const [query, setQuery] = useState('')
  const [limit, setLimit] = useState(2)
  const [response, setResponse] = useState(null)

  function run() {
    if (!validInteger(limit) || Number(limit) < 1 || Number(limit) > 100) {
      setResponse({ status: 422, detail: 'limit must be an integer from 1 to 100' }); return
    }
    const filtered = MOCK_EVENTS.filter(event => !query ||
      event.title.toLowerCase().includes(query.toLowerCase()) ||
      (event.description || '').toLowerCase().includes(query.toLowerCase()))
    setResponse(filtered.slice(0, Number(limit)))
  }

  return (
    <div className="api-tester-card">
      <div className="endpoint-bar">
        <span className="http-method method-get">GET</span>
        <span className="endpoint-url">/api/events?q={query || '…'}&amp;limit={limit}</span>
      </div>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <input className="input-field" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search title or description" />
        <input className="input-field" type="number" min="1" max="100" value={limit} onChange={e => setLimit(e.target.value)} style={{ width: '90px' }} />
        <button className="btn btn-auto" onClick={run}>Run</button>
      </div>
      <p style={{ color: 'var(--muted)', fontSize: '12px', marginBottom: '8px' }}>
        Demo of shared query parsing through a dependency. The preview is simulated; the code below uses FastAPI Depends.
      </p>
      {response && <pre className="json-response-box">{JSON.stringify(response, null, 2)}</pre>}
    </div>
  )
}

const originalExamples = [
  {
    id: 'first-route',
    num: '01',
    title: 'First Route & ASGI App',
    teach: 'Create a FastAPI ASGI application, register a path operation, and inspect its generated OpenAPI docs.',
    blurb: {
      starter: 'An ASGI app object without any registered path operations.',
      solution: 'A FastAPI application serving JSON at @app.get("/"); Uvicorn runs the ASGI application.',
    },
    theory: [
      { h: 'What is FastAPI?' },
      { p: 'FastAPI is an ASGI web framework built on Starlette and Pydantic. A path operation may be sync def or async def; choose based on the I/O libraries it calls. Return values such as dictionaries are serialized to JSON.' },
      { code: `from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello World", "status": "online"}` },
      { h: 'Running with Uvicorn' },
      { p: 'Start the development server with: uvicorn main:app --reload. Use sync def for ordinary blocking libraries; use async def when you await async I/O.' }
    ],
    starterCode: `# main.py starter
from fastapi import FastAPI

app = FastAPI()
# No routes registered yet`,
    solutionCode: `from fastapi import FastAPI

app = FastAPI(title="Event Management API")

@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "Welcome to the Event Management API",
        "docs_url": "/docs"
    }`,
    Starter: FirstRouteStarter,
    Solution: FirstRouteSolution,
  },
  {
    id: 'path-params',
    num: '02',
    title: 'Path Parameters & Type Safety',
    teach: 'Extracting typed values directly from the URL path with automatic validation.',
    blurb: {
      starter: 'String-only path variables that fail silently or produce unvalidated runtime errors.',
      solution: 'Type-annotated event_id: int returning 422 Unprocessable Entity automatically on bad inputs.',
    },
    theory: [
      { h: 'Path Variable Declaration' },
      { p: 'Use {param_name} in the decorator path and annotate the argument type in the Python function signature.' },
      { code: `@app.get("/events/{event_id}")
def get_event(event_id: int):
    return {"event_id": event_id}` }
    ],
    starterCode: `@app.get("/events/{event_id}")
def get_event(event_id):
    return {"id": event_id}`,
    solutionCode: `from fastapi import FastAPI, HTTPException

app = FastAPI()

@app.get("/events/{event_id}")
def get_event(event_id: int):
    # event_id is guaranteed to be an int
    return {"id": event_id, "type": str(type(event_id))}`,
    Starter: PathParamsStarter,
    Solution: PathParamsSolution,
  },
  {
    id: 'query-params',
    num: '03',
    title: 'Query Parameters & Filtering',
    teach: 'Reading URL query parameters (?category=tech&limit=10) with defaults and optional types.',
    blurb: {
      starter: 'Endpoints that return unfiltered datasets regardless of query string.',
      solution: 'Optional category and search values plus bounded limit inputs are parsed and validated automatically.',
    },
    theory: [
      { h: 'Query Parameters' },
      { p: 'Any function parameter not declared in the path decorator is interpreted as a query parameter.' },
      { code: `from typing import Annotated
from fastapi import Query

@app.get("/events")
def list_events(
    category: str | None = None,
    limit: Annotated[int, Query(ge=1, le=100)] = 20,
):
    return {"category": category, "limit": limit}` }
    ],
    starterCode: `@app.get("/events")
def list_events():
    return {"events": []}`,
    solutionCode: `from fastapi import FastAPI, Query
from typing import Optional

app = FastAPI()

@app.get("/events")
def list_events(
    category: Optional[str] = Query(None, description="Category filter"),
    limit: int = Query(default=10, ge=1, le=100)
):
    return {"category": category, "limit": limit}`,
    Starter: QueryParamsStarter,
    Solution: QueryParamsSolution,
  },
  {
    id: 'request-body',
    num: '04',
    title: 'Request Body & Pydantic',
    teach: 'Declaring data schemas with Pydantic BaseModel for JSON parsing and constraint checks.',
    blurb: {
      starter: 'Raw request dictionaries with manual type checking.',
      solution: 'Pydantic EventCreate model with Field(min_length=3, gt=0) and automatic error formatting.',
    },
    theory: [
      { h: 'Pydantic BaseModel' },
      { p: 'FastAPI parses request bodies against Pydantic schemas, raising HTTP 422 if fields are missing or invalid.' },
      { code: `from pydantic import BaseModel, Field

class EventCreate(BaseModel):
    title: str = Field(..., min_length=3)
    total_seats: int = Field(gt=0)` }
    ],
    starterCode: `@app.post("/events")
def create_event(data: dict):
    return data`,
    solutionCode: `from pydantic import BaseModel, Field
from fastapi import FastAPI

app = FastAPI()

class EventCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=100)
    category: str
    total_seats: int = Field(..., gt=0)

@app.post("/events", status_code=201)
def create_event(event: EventCreate):
    return {"created": event.model_dump()}`,
    Starter: RequestBodyStarter,
    Solution: RequestBodySolution,
  },
  {
    id: 'crud',
    num: '05',
    title: 'CRUD Operations & Verbs',
    teach: 'Implementing standard RESTful endpoints: GET, POST, PUT, DELETE with appropriate HTTP semantics.',
    blurb: {
      starter: 'Only GET routes implemented; state mutations not supported.',
      solution: 'Full CRUD suite with proper status codes (201 Created, 204 No Content).',
    },
    theory: [
      { h: 'REST HTTP Verbs' },
      { p: 'GET for retrieval, POST for creation, PUT for updates, and DELETE for deletion.' }
    ],
    starterCode: `@app.get("/events")
def get_all():
    return []`,
    solutionCode: `@app.get("/events")
def get_events(): ...

@app.post("/events", status_code=201)
def create_event(data: EventCreate): ...

@app.put("/events/{id}")
def update_event(id: int, data: EventUpdate): ...

@app.delete("/events/{id}", status_code=204)
def delete_event(id: int): ...`,
    Starter: CrudStarter,
    Solution: CrudSolution,
  },
  {
    id: 'response-models',
    num: '06',
    title: 'Response Models & Filtering',
    teach: 'Using response_model to filter out sensitive internal data and enforce API output contracts.',
    blurb: {
      starter: 'Returning raw internal objects with internal IDs and secrets.',
      solution: 'Clean output serialization conforming strictly to EventResponse schema.',
    },
    theory: [
      { h: 'The response_model Argument' },
      { p: 'Filters data before returning to the client, guaranteeing consistency with OpenAPI docs.' }
    ],
    starterCode: `@app.get("/events/{id}")
def get_event(id: int):
    return db_item`,
    solutionCode: `@app.get("/events/{id}", response_model=EventResponse)
def get_event(id: int):
    # Only fields declared in EventResponse are serialized
    return db.get(id)`,
    Starter: ResponseModelsStarter,
    Solution: ResponseModelsSolution,
  },
  {
    id: 'error-handling',
    num: '07',
    title: 'Error Handling & Exceptions',
    teach: 'Interrupting execution and returning clean JSON error responses with HTTPException.',
    blurb: {
      starter: 'Exceptions causing ugly 500 crashes and unhandled stacktraces.',
      solution: 'raise HTTPException(status_code=404, detail="Event not found") returning clean JSON.',
    },
    theory: [
      { h: 'HTTPException' },
      { p: 'FastAPI catches HTTPException and transforms it into a standard JSON response with status codes.' }
    ],
    starterCode: `@app.get("/events/{id}")
def get_event(id: int):
    return events[id] # IndexError if missing!`,
    solutionCode: `from fastapi import HTTPException, status

@app.get("/events/{id}")
def get_event(id: int):
    if id not in events:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Event {id} does not exist"
        )
    return events[id]`,
    Starter: ExceptionsStarter,
    Solution: ExceptionsSolution,
  },
  {
    id: 'cors',
    num: '08',
    title: 'CORS & Browser Clients',
    teach: 'Configure CORSMiddleware so an explicitly allowed browser origin can call the API.',
    blurb: {
      starter: 'A browser blocks a request from an origin the API has not allowed.',
      solution: 'CORSMiddleware allows known local frontend origins with explicit methods and headers.',
    },
    theory: [
      { h: 'Cross-Origin Resource Sharing (CORS)' },
      { p: 'When a browser page and API use different origins, the API must return suitable CORS headers for the browser to expose the response to that page.' }
    ],
    starterCode: `app = FastAPI()
# Without CORS middleware`,
    solutionCode: `from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)`,
    Starter: CorsStarter,
    Solution: CorsSolution,
  },
  {
    id: 'dependencies',
    num: '09',
    title: 'Dependencies & Reusable Inputs',
    teach: 'Use Depends to share validated query parameters and understand how FastAPI supplies request-scoped resources.',
    blurb: {
      starter: 'Each endpoint repeats query parsing and directly reaches into global state.',
      solution: 'A reusable dependency owns common inputs, while the route stays focused on returning the filtered resources.',
    },
    theory: [
      { h: 'FastAPI dependency injection' },
      { p: 'A dependency is a callable declared with Depends. FastAPI resolves it per request and passes its result to the path operation. Use it for repeated parameters, authentication, and request-scoped resources such as a database session.' },
      { h: 'Keep HTTP and data access separate' },
      { p: 'For a small workshop, an in-memory repository is enough to explain the seam. It is not persistence: it resets on restart and does not protect concurrent writes.' },
      { code: `from typing import Annotated
from fastapi import Depends, FastAPI, Query

app = FastAPI()

def event_search(
    q: str | None = None,
    limit: int = Query(default=20, ge=1, le=100),
):
    return {"q": q, "limit": limit}

Search = Annotated[dict, Depends(event_search)]

@app.get("/api/events")
def list_events(search: Search):
    return {"filters": search, "items": []}` },
      { ul: [
        'The companion preview above simulates the filter; the FastAPI code uses Depends at request time.',
        'For database work, yield a request-scoped session from a dependency and close it after the request.',
        'Prefer Annotated with Depends for reusable typed dependency declarations.'
      ]}
    ],
    starterCode: `@app.get('/api/events')
def list_events(q: str | None = None, limit: int = 20):
    # Similar parsing gets copied into every list endpoint.
    return repository.search(q=q, limit=limit)`,
    solutionCode: `from typing import Annotated
from fastapi import Depends, Query

def event_search(
    q: str | None = None,
    limit: int = Query(default=20, ge=1, le=100),
):
    return {"q": q, "limit": limit}

Search = Annotated[dict, Depends(event_search)]

@router.get('', response_model=list[EventResponse])
def get_all_events(search: Search):
    return db.get_all(search=search["q"])[:search["limit"]]

# Exercise: add limit support to the in-memory repository.`,
    Starter: DependenciesStarter,
    Solution: DependenciesSolution,
  }
]

const beginnerContent = {"first-route": ["Your first API request", "An API lets one program ask another for data. A route is a URL your Python function responds to.", "No route exists yet, so there is no working endpoint.", "GET / returns a small JSON response.", "Click Send Request. Explain: request goes in, Python runs, JSON comes back.", "GET means read. JSON is data written as names and values. 200 means success."], "path-params": ["Find one event by ID", "The number in /events/1 tells the API which event you want. The int type asks for a whole number.", "The URL value is an unchecked string.", "A valid ID finds an event; bad input gets a helpful error.", "Try 1, then 99, then abc. Compare 200, 404 and 422.", "404 = no matching event. 422 = the input does not match the expected type."], "query-params": ["Filter the event list", "Values after ? are query parameters. They let the caller filter a list without creating a new route.", "The same list is returned every time.", "Category and limit decide which events are returned.", "Select Hackathon and click Filter. Try zero as the limit to see a validation error.", "Compare /events/1 (one item) with /events?category=Workshop (a filtered list)."], "request-body": ["Create an event with validation", "POST sends new data in the request body. A Pydantic model describes the fields and checks their values.", "Unchecked data can enter the app.", "A title and positive seat count create a valid event.", "Send a valid event. Then try a short title and negative seats; read the field named in the error.", "A model is a checklist: title is text, seats is a positive whole number. 201 means created."], "crud": ["Create, read, update and delete", "CRUD is four everyday actions: create an event, read it, update it and delete it.", "Only reading is available.", "Each button performs an action on the same in-memory list.", "POST a new event, change its title and PUT, then GET. DELETE it and GET again.", "GET reads, POST creates, PUT updates this demo, DELETE removes. Reset demo restores the sample data."], "error-handling": ["Return useful errors", "When a request cannot succeed, return a clear status and message instead of crashing.", "A missing event can cause an unhelpful server error.", "The response explains whether input is invalid or an event is missing.", "Try ID 1, 999 and abc. Ask the group to predict each status before sending.", "HTTPException is how a FastAPI route stops and sends an error response."], "response-models": ["Optional: choose response fields", "A response model describes what the caller should receive. It can leave private internal fields out.", "Internal fields could be returned by mistake.", "Only public event fields are returned.", "Compare the internal object with the JSON sent to the caller.", "Input model checks incoming data. Response model shapes outgoing data."], "cors": ["Optional: allow a browser client", "A browser checks whether a website may call an API at a different origin. CORS tells it which origins are allowed.", "The browser blocks a call from another origin.", "The API explicitly allows the intended website origin.", "Explain that localhost ports 5173 and 8000 are different origins. Compare the configured origin with the response header.", "CORS is a browser rule, not login or authentication. Keep the allowed origins explicit."], "dependencies": ["Optional: reuse a helper", "A dependency is a helper FastAPI runs before your route. Depends passes the helper result into the route.", "Several routes repeat the same input-handling code.", "One helper checks shared search and limit values.", "Search for Hackathon, set limit to 1 and Run. Try limit 0 next.", "Think of Depends as: run this helper first, then give me its result. Skip database sessions and authentication here."]}
export const conceptExamples = originalExamples.map(example => {
 const lesson = beginnerContent[example.id]
 if (!lesson) return example
 return { ...example, solutionCode: example.id === 'crud' ? beginnerCrudCode : example.solutionCode, num: String(["first-route", "path-params", "query-params", "request-body", "crud", "error-handling"].indexOf(example.id) + 1).padStart(2, "0"), title: lesson[0], teach: lesson[1], blurb: {starter: lesson[2], solution: lesson[3]}, demo: lesson[4], theory: [{h: "In simple words"}, {p: lesson[1]}, {h: "Live demo — do this together"}, {p: lesson[4]}, {h: "Remember"}, {p: lesson[5]}] }
})
