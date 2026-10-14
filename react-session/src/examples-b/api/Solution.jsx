import { useState, useEffect } from 'react'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchUsers() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setUsers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchUsers() }, [])

  return (
    <main className="page">
      <div className="card">
        <span className="badge">API</span>
        <h1 className="ev-title">Users</h1>
        {loading && <p className="desc">Loading…</p>}
        {error && <p className="error-text">Error: {error}</p>}
        {!loading && !error && (
          <div className="user-list">
            {users.map((user) => (
              <div className="user-card" key={user.id}>
                <span className="user-name">{user.name}</span>
                <span className="user-email">{user.email}</span>
              </div>
            ))}
          </div>
        )}
        <button className="btn" onClick={fetchUsers}>Refresh</button>
      </div>
    </main>
  )
}

export default App
