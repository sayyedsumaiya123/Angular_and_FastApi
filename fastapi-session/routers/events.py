from fastapi import APIRouter, HTTPException, status, Query
from typing import List, Optional
from schemas import EventCreate, EventUpdate, EventResponse, RsvpRequest, RsvpResponse, EventStats
from database import db

router = APIRouter(prefix="/api/events", tags=["Events"])

@router.get("", response_model=List[EventResponse])
def get_all_events(
    category: Optional[str] = Query(None, description="Filter by category (Tech, Workshop, Hackathon, Design, Networking)"),
    search: Optional[str] = Query(None, description="Search term in title or description")
):
    """Retrieve all events with optional category and search keyword filtering."""
    return db.get_all(category=category, search=search)

@router.get("/{event_id}", response_model=EventResponse)
def get_event_by_id(event_id: int):
    """Fetch details of a specific event by ID."""
    event = db.get_by_id(event_id)
    if not event:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Event {event_id} not found")
    return event

@router.post("", response_model=EventResponse, status_code=status.HTTP_201_CREATED)
def create_event(event: EventCreate):
    """Publish a new event to the management system."""
    new_event = db.create(event.model_dump())
    return new_event

@router.put("/{event_id}", response_model=EventResponse)
def update_event(event_id: int, updates: EventUpdate):
    """Modify event properties (title, date, seats, location)."""
    try:
        updated = db.update(event_id, updates.model_dump(exclude_unset=True))
    except ValueError as exc:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(exc)) from exc
    if not updated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Event {event_id} not found")
    return updated

@router.delete("/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_event(event_id: int):
    """Remove an event by ID."""
    success = db.delete(event_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Event {event_id} not found")
    return None

@router.post("/{event_id}/rsvp", response_model=RsvpResponse)
def rsvp_to_event(event_id: int, payload: RsvpRequest):
    """Register an attendee and decrement available seats."""
    result = db.rsvp(event_id, payload.attendee_name, payload.attendee_email)
    if result.get("error") == "not_found":
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    if result.get("error") == "sold_out":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Event is already sold out")

    return {
        "success": True,
        "message": f"RSVP confirmed for {payload.attendee_name}!",
        "event_id": event_id,
        "remaining_seats": result["remaining_seats"]
    }

@router.post("/{event_id}/cancel-rsvp", response_model=RsvpResponse)
def cancel_rsvp(event_id: int):
    """Cancel an RSVP and increment open seats."""
    result = db.cancel_rsvp(event_id)
    if result.get("error") == "not_found":
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Event not found")
    if result.get("error") == "no_rsvps":
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No active registrations to cancel")

    return {
        "success": True,
        "message": "RSVP registration cancelled",
        "event_id": event_id,
        "remaining_seats": result["remaining_seats"]
    }

@router.get("/stats/summary", response_model=EventStats)
def get_stats():
    """Get aggregate statistics across all events."""
    return db.get_stats()
