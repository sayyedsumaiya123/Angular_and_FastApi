function App() {
  const events = [
    { id: 1, name: 'React Workshop', date: 'Aug 31' },
    { id: 2, name: 'Hackathon', date: 'Sep 15' },
    { id: 3, name: 'Tech Talk', date: 'Oct 1' },
  ]

  return (
    <main className="page">
      <div className="card">
        <span className="badge">Events</span>
        <h1 className="ev-title">Upcoming Events</h1>
        <div className="event-list">
          {events.map((event) => (
            <div className="event-item" key={event.id}>
              <span className="event-name">{event.name}</span>
              <span className="event-date">{event.date}</span>
            </div>
          ))}
        </div>
        <p className="demo-note">Add a 4th event to the array — the list grows automatically.</p>
      </div>
    </main>
  )
}

export default App
