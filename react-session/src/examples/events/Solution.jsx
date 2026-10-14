import { useState } from 'react'

function App() {
  const [name, setName] = useState('')
  const [guests, setGuests] = useState([])

  function addGuest(e) {
    e.preventDefault()
    if (!name.trim()) return
    setGuests([...guests, name])
    setName('')
  }

  return (
    <div className="card">
      <span className="badge">Events</span>
      <h1 className="ev-title">Event Guest Book</h1>
      <form onSubmit={addGuest}>
        <input
          className="name-input"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="btn" type="submit">Sign in</button>
      </form>
      <div className="row" style={{ marginTop: 12 }}>
        {guests.map((guest) => (
          <span key={guest} className="pill pill-green">{guest}</span>
        ))}
      </div>
    </div>
  )
}

export default App