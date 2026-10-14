function App() {
  return (
    <main className="page">
      <div className="card">
        <span className="badge">Events</span>
        <h1 className="ev-title">Upcoming Events</h1>
        <div className="event-list">
          <div className="event-item">
            <span className="event-name">React Workshop</span>
            <span className="event-date">Aug 31</span>
          </div>
          <div className="event-item">
            <span className="event-name">Hackathon</span>
            <span className="event-date">Sep 15</span>
          </div>
          <div className="event-item">
            <span className="event-name">Tech Talk</span>
            <span className="event-date">Oct 1</span>
          </div>
        </div>
        <p className="demo-note">3 events. All hardcoded. Want a 4th? Copy another block.</p>
      </div>
    </main>
  )
}

export default App
