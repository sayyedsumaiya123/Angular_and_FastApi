"""
Quick test suite for Event Management System API
Can be run via: python test_api.py
"""
import asyncio
import httpx
from main import app

async def run_tests():
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as client:
        # 1. Health check
        res = await client.get("/")
        assert res.status_code == 200, res.text
        assert res.json()["status"] == "healthy"
        print("PASS: Health check")

        # 2. Get events list
        res = await client.get("/api/events")
        assert res.status_code == 200, res.text
        events = res.json()
        assert len(events) >= 4
        print(f"PASS: Get events (found {len(events)} events)")

        # 3. Create a new event
        new_event = {
            "title": "FastAPI Performance Sprint",
            "category": "Tech",
            "date": "Dec 20, 2026",
            "time": "11:00 AM - 3:00 PM",
            "location": "Virtual Online",
            "total_seats": 50,
            "description": "Building lightning fast microservices with async python.",
            "speaker": "Zaid Rakhange",
            "price": "Free"
        }
        res = await client.post("/api/events", json=new_event)
        assert res.status_code == 201, res.text
        created = res.json()
        created_id = created["id"]
        assert created["title"] == new_event["title"]
        assert created["available_seats"] == 50
        print(f"PASS: Create event (ID {created_id})")

        # 4. RSVP to created event
        rsvp_payload = {
            "attendee_name": "Test Attendee",
            "attendee_email": "test@domain.com"
        }
        res = await client.post(f"/api/events/{created_id}/rsvp", json=rsvp_payload)
        assert res.status_code == 200, res.text
        assert res.json()["remaining_seats"] == 49
        print(f"PASS: RSVP event (Seats remaining: {res.json()['remaining_seats']})")

        # 5. Filter by category
        res = await client.get("/api/events?category=Tech")
        assert res.status_code == 200, res.text
        tech_events = res.json()
        assert all(e["category"].lower() == "tech" for e in tech_events)
        print("PASS: Category filter")

        # 6. Delete created event
        res = await client.delete(f"/api/events/{created_id}")
        assert res.status_code == 204, res.text
        print("PASS: Delete event")

        print("\nAll Event Management System API tests passed successfully!")

if __name__ == "__main__":
    asyncio.run(run_tests())
