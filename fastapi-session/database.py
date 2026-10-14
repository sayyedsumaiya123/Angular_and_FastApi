from typing import Dict, Any, List
from datetime import datetime, timezone

# Seed events for the Event Management System
INITIAL_EVENTS = [
    {
        "id": 1,
        "title": "Angular 18 & FastAPI Masterclass",
        "category": "Workshop",
        "date": "Nov 20, 2026",
        "time": "10:00 AM - 1:00 PM",
        "location": "Auditorium A & Live Stream",
        "total_seats": 60,
        "available_seats": 14,
        "registered_count": 46,
        "is_sold_out": False,
        "description": "Full-stack workshop exploring Angular signals and FastAPI API design.",
        "speaker": "Zaid Rakhange & Team",
        "price": "Free"
    },
    {
        "id": 2,
        "title": "National GenAI Hackathon 2026",
        "category": "Hackathon",
        "date": "Dec 02, 2026",
        "time": "9:00 AM - 9:00 PM",
        "location": "Innovation Hub, Block 4",
        "total_seats": 100,
        "available_seats": 2,
        "registered_count": 98,
        "is_sold_out": False,
        "description": "36-hour sprint building real-world AI applications with awards and mentorship from top industry leaders.",
        "speaker": "Industry Mentors",
        "price": "Free"
    },
    {
        "id": 3,
        "title": "Modern UI/UX Design System Conference",
        "category": "Design",
        "date": "Dec 14, 2026",
        "time": "2:00 PM - 6:00 PM",
        "location": "Virtual Webinar",
        "total_seats": 200,
        "available_seats": 75,
        "registered_count": 125,
        "is_sold_out": False,
        "description": "Deep-dive into component design tokens, micro-interactions, accessibility, and sleek aesthetic standards.",
        "speaker": "Elena Rostova",
        "price": "Free"
    },
    {
        "id": 4,
        "title": "Tech Founders & Builders Mixer",
        "category": "Networking",
        "date": "Jan 10, 2027",
        "time": "6:30 PM - 9:30 PM",
        "location": "Rooftop Lounge, Tech District",
        "total_seats": 40,
        "available_seats": 0,
        "registered_count": 40,
        "is_sold_out": True,
        "description": "Connect with engineers, founders, and angel investors over coffee and pitch sessions.",
        "speaker": "VC Panel",
        "price": "Free"
    }
]

class EventDatabase:
    def __init__(self):
        self._events: Dict[int, Dict[str, Any]] = {e["id"]: dict(e) for e in INITIAL_EVENTS}
        self._rsvps: List[Dict[str, Any]] = []
        self._next_id: int = 5

    def get_all(self, category: str = None, search: str = None) -> List[Dict[str, Any]]:
        results = list(self._events.values())
        if category and category.lower() != "all":
            results = [e for e in results if e["category"].lower() == category.lower()]
        if search:
            q = search.lower()
            results = [e for e in results if q in e["title"].lower() or q in e["description"].lower()]
        return results

    def get_by_id(self, event_id: int) -> Dict[str, Any]:
        return self._events.get(event_id)

    def create(self, event_data: Dict[str, Any]) -> Dict[str, Any]:
        event_id = self._next_id
        self._next_id += 1
        total_seats = event_data.get("total_seats", 50)
        new_event = {
            **event_data,
            "id": event_id,
            "available_seats": total_seats,
            "registered_count": 0,
            "is_sold_out": False
        }
        self._events[event_id] = new_event
        return new_event

    def update(self, event_id: int, updates: Dict[str, Any]) -> Dict[str, Any]:
        event = self._events.get(event_id)
        if not event:
            return None
        capacity = updates.get("total_seats")
        if capacity is not None and capacity < event["registered_count"]:
            raise ValueError("Total seats cannot be less than existing registrations")
        for key, value in updates.items():
            if value is not None:
                event[key] = value
        event["available_seats"] = event["total_seats"] - event["registered_count"]
        event["is_sold_out"] = event["available_seats"] <= 0
        return event

    def delete(self, event_id: int) -> bool:
        if event_id in self._events:
            del self._events[event_id]
            self._rsvps = [r for r in self._rsvps if r["event_id"] != event_id]
            return True
        return False

    def rsvp(self, event_id: int, attendee_name: str, attendee_email: str) -> Dict[str, Any]:
        event = self._events.get(event_id)
        if not event:
            return {"error": "not_found"}
        if event["available_seats"] <= 0:
            return {"error": "sold_out"}

        event["available_seats"] -= 1
        event["registered_count"] += 1
        event["is_sold_out"] = event["available_seats"] <= 0

        rsvp_record = {
            "event_id": event_id,
            "attendee_name": attendee_name,
            "attendee_email": attendee_email,
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
        self._rsvps.append(rsvp_record)
        return {"success": True, "remaining_seats": event["available_seats"]}

    def cancel_rsvp(self, event_id: int) -> Dict[str, Any]:
        event = self._events.get(event_id)
        if not event:
            return {"error": "not_found"}
        if event["registered_count"] <= 0:
            return {"error": "no_rsvps"}

        event["available_seats"] += 1
        event["registered_count"] -= 1
        event["is_sold_out"] = event["available_seats"] <= 0
        return {"success": True, "remaining_seats": event["available_seats"]}

    def get_stats(self) -> Dict[str, int]:
        events = list(self._events.values())
        return {
            "total_events": len(events),
            "total_seats": sum(e["total_seats"] for e in events),
            "total_rsvp_count": sum(e["registered_count"] for e in events),
            "sold_out_events": sum(1 for e in events if e["is_sold_out"])
        }

db = EventDatabase()
