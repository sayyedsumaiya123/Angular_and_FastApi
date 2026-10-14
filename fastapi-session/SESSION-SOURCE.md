# FastAPI Workshop — Facilitator Guide

This repository teaches FastAPI by building an independent Event Management API for an Event Management System (EMS). Learners use the interactive endpoint previews to predict requests and responses, then run the same ideas against the API and its generated `/docs` page.

## Learning outcomes

By the end, learners can:

- Define path operations and explain how URL paths, query strings, and JSON bodies map to Python parameters.
- Use type hints and Pydantic models to validate incoming data.
- Design CRUD routes with appropriate HTTP methods and status codes.
- Use response models, `HTTPException`, and dependencies to keep route behavior explicit and reusable.
- Explain when `def` or `async def` is appropriate and configure CORS for a local browser client.
- Verify an API through OpenAPI docs and an automated request test.

## Before the session

- Use Python 3.10+ and a virtual environment. Install `requirements.txt`.
- From `fastapi-session`, run `uvicorn main:app --reload --port 8000`.
- Confirm `/`, `/docs`, and `/api/events` respond.
- The teaching database is an in-memory Python object. It resets on restart, is not safe for multiple workers, and is not a production persistence layer. Make that limitation explicit before the capstone.
- This API uses synchronous `def` route handlers for in-memory work. `async def` is useful when the handler awaits async I/O; it is not a speed switch for ordinary blocking work.

## Suggested delivery: two 90-minute sessions

### Session A — Design and validate routes

| Time | Teach and demonstrate | Learner checkpoint |
|---|---|---|
| 0–8 min | Show the target event API and inspect `/docs`. Identify resources and JSON. | Name the event resource and its fields. |
| 8–20 min | ASGI app, route decorator, path operation, Uvicorn, automatic OpenAPI. | Add `GET /health` with a small JSON response. |
| 20–32 min | Path parameters and Python type hints. Compare 200, 404, and automatic 422. | Try `/api/events/1`, `/api/events/999`, and `/api/events/abc`. |
| 32–43 min | Query parameters, defaults, optional values, `Query` constraints. | Filter by category and limit the returned list. |
| 43–60 min | Pydantic request models, validation, and `Field` constraints. | POST an event, then send invalid title/capacity and inspect 422. |
| 60–75 min | Response models and the API's public contract. | Identify which output fields are server-derived. |
| 75–90 min | Implement EMS stages 0–3; use `/docs` as the client. | Learner explains path vs query vs body for each route. |

### Session B — Build reliable event behavior

| Time | Teach and demonstrate | Learner checkpoint |
|---|---|---|
| 0–10 min | Retrieval warm-up: ask learners to predict 422 vs 404. | Fix a route's missing-resource behavior. |
| 10–27 min | CRUD semantics and status codes: 200, 201, 204. Clarify PUT replaces supplied resource state; this project's `EventUpdate` is partial, so PATCH is a better REST name if the contract remains partial. | Choose a method and response code for create, edit, delete. |
| 27–42 min | RSVP business rule: capacity, duplicate prevention, cancellation, concurrency risk. | Prove the last seat cannot be oversold in the demo's single process. |
| 42–55 min | `HTTPException` for expected client errors; avoid leaking tracebacks. | Return 404 for missing event and 400/409 for unavailable capacity. |
| 55–68 min | `Depends` for shared services/resources; keep route functions thin. | Inject a small event repository dependency into a route. |
| 68–77 min | CORS: explicit origins, methods, and headers. Explain browser cross-origin rules; CORS is not authentication. | Configure one known local development origin and inspect the preflight behavior. |
| 77–86 min | Automated API checks with the included async `httpx` ASGI test. | Add a test for invalid payload or sold-out RSVP. |
| 86–90 min | Exit ticket and next steps. | Name what must change before a real deployment. |

## Concept sequence

1. **First Route & ASGI App** — A path operation is a Python function registered to a path and HTTP method. Uvicorn serves the ASGI app; FastAPI derives OpenAPI from route declarations.
2. **Path Parameters & Type Safety** — A value in the path is parsed using its annotation. A non-integer `event_id` gets 422 before the function body runs; an integer id with no matching event should return 404.
3. **Query Parameters & Filtering** — Parameters absent from the path are query parameters. Use defaults and `Query` constraints for paging/search inputs.
4. **Request Body & Pydantic** — A Pydantic model is the request schema. Invalid input returns 422 with structured details; business rules still belong in service logic.
5. **CRUD Operations & HTTP Semantics** — Use GET to read, POST to create, PUT for replacement, PATCH for partial updates, DELETE to remove. Match response codes to outcomes.
6. **Response Models** — `response_model` validates and serializes output against the public response schema. Avoid teaching this as a magic security filter; define intentional public schemas and never put secrets in them.
7. **Errors & Business Rules** — Use `HTTPException` for expected HTTP errors. Distinguish malformed input (422), missing resources (404), and a valid request blocked by a business rule (400 or 409).
8. **CORS & Browser Clients** — Allow only known development origins. If credentials are enabled, do not use wildcard origins. CORS does not replace authentication or authorization.
9. **Dependencies & Service Boundaries** — Use `Depends` to provide reusable services, configuration, and database sessions. For this demo, inject an in-memory repository; for persistence, replace its implementation rather than putting SQL in every route.
10. **Testing the API** — Use an ASGI test client to check observable contracts: status, response shape, and business invariants. Tests should not rely on whatever state the development server happens to have accumulated.

## EMS endpoint map

| Method | Path | Purpose | Typical result |
|---|---|---|---|
| GET | `/api/events` | List, filter, and search events | 200 + event list |
| GET | `/api/events/{event_id}` | Read one event | 200 or 404 |
| POST | `/api/events` | Create an event | 201 + created event |
| PUT/PATCH | `/api/events/{event_id}` | Update an event | 200 or 404 |
| DELETE | `/api/events/{event_id}` | Delete an event | 204 or 404 |
| POST | `/api/events/{event_id}/rsvp` | Register attendee | 200, 400/409, or 404 |
| POST | `/api/events/{event_id}/cancel-rsvp` | Cancel a registration | 200, 400, or 404 |
| GET | `/api/events/stats/summary` | Read dashboard totals | 200 + summary |

## Good discussion questions

- What belongs in Pydantic validation, and what belongs in business logic?
- Why should the public event response be distinct from the stored event or RSVP record?
- Why is an in-memory list insufficient for multiple server workers or a restart?
- What race can occur when two users request the final seat at the same time? Where should a database transaction enforce capacity?
- Why can a browser reject a response even when the server handled the request successfully?

## Common mistakes to catch

- Calling a handler “async” just because FastAPI supports `async def`; blocking calls inside an async handler block the event loop.
- Expecting a missing record to cause 422. Type/shape validation and resource lookup are separate concerns.
- Using a mutable global list as durable or concurrent storage.
- Returning 200 for every action, or returning a body from a 204 response.
- Combining `allow_origins=['*']` with credentials.
- Treating CORS as an access-control or security mechanism.
- Teaching a fake preview response as a live request. The companion previews are simulations; use `/docs` or the included tests for the running API.

## Capstone extensions

After the in-memory EMS works, let learners add persistent SQLite storage, pagination, duplicate RSVP rules, and request-scoped database sessions via `Depends`. Add authentication and deployment only after explaining secrets, trusted origins, migrations, and concurrency.

Official references: [FastAPI tutorial](https://fastapi.tiangolo.com/tutorial/), [Dependencies](https://fastapi.tiangolo.com/tutorial/dependencies/), [Response models](https://fastapi.tiangolo.com/tutorial/response-model/), [CORS](https://fastapi.tiangolo.com/tutorial/cors/), [Testing](https://fastapi.tiangolo.com/tutorial/testing/).
