function App() {
  return (
    <div className="card">
      <span className="badge">useRef</span>
      <h1 className="ev-title">Search Events</h1>
      <input className="name-input" placeholder="Type to search…" />
      <button className="btn">Focus the input</button>
      <p className="demo-note">The button is dead — no way to reach the input.</p>
    </div>
  )
}

export default App