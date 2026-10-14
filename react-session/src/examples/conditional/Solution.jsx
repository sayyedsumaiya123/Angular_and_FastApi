import { useState } from 'react'

function App() {
  const [joined, setJoined] = useState(false)
  const [going, setGoing] = useState(24)

  function handleJoin() {
    setGoing(going + 1)
    setJoined(true)
  }

  return (
    <div className="card">
      <span className="badge">Workshop</span>
      <h1 className="ev-title">React Workshop</h1>
      <p className="going"><b>{going}</b> people are going</p>

      {joined ? (
        <p className="status">✅ You're attending!</p>
      ) : (
        <button className="btn" onClick={handleJoin}>Join Workshop</button>
      )}
    </div>
  )
}

export default App