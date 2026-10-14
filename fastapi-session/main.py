from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.events import router as events_router
import uvicorn

app = FastAPI(
    title="Event Management System API",
    description="Full-featured REST API for the Event Management System workshop session. Includes events CRUD, RSVP registration, seat capacity validation, and stats.",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Explicit local development origins for browser-based API clients.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", "http://127.0.0.1:5173",
        "http://localhost:5174", "http://127.0.0.1:5174",
        "http://localhost:5175", "http://127.0.0.1:5175",
        "http://localhost:4200", "http://127.0.0.1:4200",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(events_router)

@app.get("/", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "service": "Event Management System API",
        "version": "1.0.0",
        "docs": "/docs",
        "redoc": "/redoc",
        "endpoints": {
            "events": "/api/events",
            "stats": "/api/events/stats/summary"
        }
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
