from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class EventBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=100, example="Cloud & AI Developer Summit 2026")
    category: str = Field(..., example="Tech")
    date: str = Field(..., example="Nov 15, 2026")
    time: str = Field(..., example="10:00 AM - 4:00 PM")
    location: str = Field(..., example="Tech Park Convention Hall & Online")
    total_seats: int = Field(..., gt=0, example=120)
    description: str = Field(default="", example="Hands-on sessions on Cloud Native architectures, GenAI, and modern web dev.")
    speaker: Optional[str] = Field(default="Industry Experts", example="Zaid Rakhange")
    price: Optional[str] = Field(default="Free", example="Free")

class EventCreate(EventBase):
    pass

class EventUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=3, max_length=100)
    category: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    location: Optional[str] = None
    total_seats: Optional[int] = Field(None, gt=0)
    description: Optional[str] = None
    speaker: Optional[str] = None
    price: Optional[str] = None

class EventResponse(EventBase):
    id: int
    available_seats: int
    is_sold_out: bool
    registered_count: int

    class Config:
        from_attributes = True

class RsvpRequest(BaseModel):
    attendee_name: str = Field(..., min_length=2, example="Alex Johnson")
    attendee_email: str = Field(..., example="alex@example.com")

class RsvpResponse(BaseModel):
    success: bool
    message: str
    event_id: int
    remaining_seats: int

class EventStats(BaseModel):
    total_events: int
    total_seats: int
    total_rsvp_count: int
    sold_out_events: int
