import { useState } from 'react'

function App() {
  const [likes, setLikes] = useState(0)

  function handleLike() {
    setLikes(likes + 1)
  }

  function reset() {
    setLikes(0)
  }

  return (
    <div className="card">
      <span className="badge">useState</span>
      <h1 className="ev-title">❤️ {likes} likes</h1>
      <p className="desc">Click the button — React remembers, then redraws the screen.</p>
      <button className="btn" onClick={handleLike}>Like</button>
      <p className="demo-note" />
      <button className="btn btn-auto" onClick={reset}>Reset</button>
    </div>
  )
}

export default App