import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="card">
      <span className="badge">useEffect</span>
      <h1 className="ev-title">{count}</h1>
      <p className="desc">The counter works… but the browser tab still reads the page title.</p>
      <button className="btn btn-auto" onClick={() => setCount(count + 1)}>+1</button>
      <button className="btn btn-auto" onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}

export default App