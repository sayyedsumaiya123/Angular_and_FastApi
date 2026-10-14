export const beginnerCrudCode = `from fastapi import FastAPI, HTTPException, Response
from pydantic import BaseModel, Field

app = FastAPI()
events = {1: {"id": 1, "title": "API Workshop", "total_seats": 60}}
next_id = 2

class EventData(BaseModel):
    title: str = Field(min_length=3, max_length=100)
    total_seats: int = Field(gt=0)

@app.get("/events")
def read_events():
    return list(events.values())

@app.post("/events", status_code=201)
def create_event(data: EventData):
    global next_id
    event = {"id": next_id, **data.model_dump()}
    events[next_id] = event
    next_id += 1
    return event

@app.put("/events/{event_id}")
def update_event(event_id: int, data: EventData):
    if event_id not in events:
        raise HTTPException(404, "Event not found")
    events[event_id] = {"id": event_id, **data.model_dump()}
    return events[event_id]

@app.delete("/events/{event_id}", status_code=204)
def delete_event(event_id: int):
    if event_id not in events:
        raise HTTPException(404, "Event not found")
    del events[event_id]
    return Response(status_code=204)

# Save as main.py. Run: uvicorn main:app --reload
# Open http://127.0.0.1:8000/docs and try each action.
# Teaching example: memory resets when the server restarts.
`
