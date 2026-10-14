import { useEffect, useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `Count is ${count}`
  }, [count])

  return (
    <div className="card">
      <span className="badge">useEffect</span>
      <h1 className="ev-title">{count}</h1>
      <p className="desc">Now the browser tab reacts to state — that's an effect.</p>
      <button className="btn btn-auto" onClick={() => setCount(count + 1)}>+1</button>
      <button className="btn btn-auto" onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}

export default App