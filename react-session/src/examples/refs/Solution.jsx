import { useRef } from 'react'

function App() {
  const inputRef = useRef(null)

  function focusSearch() {
    inputRef.current.focus()
  }

  return (
    <div className="card">
      <span className="badge">useRef</span>
      <h1 className="ev-title">Search Events</h1>
      <input
        ref={inputRef}
        className="name-input"
        placeholder="Type to search…"
      />
      <button className="btn" onClick={focusSearch}>Focus the input</button>
    </div>
  )
}

export default App