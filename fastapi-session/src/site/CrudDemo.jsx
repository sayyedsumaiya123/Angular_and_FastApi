import { useState } from 'react'
import { validateEvent } from './validation.js'

export default function CrudDemo() {
  const [events, setEvents] = useState([{ id: 1, title: 'Modern API Design Workshop', total_seats: 60 }])
  const [nextId, setNextId] = useState(2)
  const [selectedId, setSelectedId] = useState(1)
  const [title, setTitle] = useState('Community API Workshop')
  const [seats, setSeats] = useState('30')
  const [response, setResponse] = useState(null)

  function request(method) {
    if (method === 'GET') { setResponse({ status: 200, body: events }); return }
    const found = events.find(e => e.id === Number(selectedId))
    if (method !== 'POST' && !found) { setResponse({ status: 404, body: { detail: 'Event not found' } }); return }
    if (method === 'DELETE') {
      setEvents(list => list.filter(e => e.id !== found.id))
      setResponse({ status: 204, message: 'Deleted. No response body. Use GET to see the remaining events.' })
      return
    }
    const detail = validateEvent(title, seats)
    if (detail.length) { setResponse({ status: 422, body: { detail } }); return }
    const event = { id: method === 'POST' ? nextId : found.id, title: title.trim(), total_seats: Number(seats) }
    if (method === 'POST') {
      setEvents(list => [...list, event]); setNextId(id => id + 1); setSelectedId(event.id)
    } else setEvents(list => list.map(e => e.id === event.id ? event : e))
    setResponse({ status: method === 'POST' ? 201 : 200, body: event })
  }

  return <div className="api-tester-card">
    <h4>RESTful CRUD · In-memory demo</h4>
    <p className="demo-note">Create, read, update and delete the same event. Reset demo restores the initial data.</p>
    <label>Event ID for PUT / DELETE<input className="input-field" aria-label="Event ID for PUT or DELETE" value={selectedId} onChange={e => setSelectedId(e.target.value)} /></label>
    <label>Event title<input className="input-field" aria-label="Event title" value={title} onChange={e => setTitle(e.target.value)} /></label>
    <label>Total seats<input className="input-field" aria-label="Total seats" type="number" min="1" step="1" value={seats} onChange={e => setSeats(e.target.value)} /></label>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '12px 0' }}>
      {['GET', 'POST', 'PUT', 'DELETE'].map(method => <button key={method} className="btn btn-auto btn-outline" onClick={() => request(method)}>{method}</button>)}
    </div>
    <p role="status">Stored events: {events.length}</p>
    {response && <pre className="json-response-box" aria-live="polite">{JSON.stringify(response, null, 2)}</pre>}
  </div>
}
