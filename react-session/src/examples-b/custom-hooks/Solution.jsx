import { useState, useEffect } from 'react'

function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false
    setLoading(true) // eslint-disable-line react-hooks/set-state-in-effect
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed')
        return res.json()
      })
      .then((json) => { if (!ignore) { setData(json); setLoading(false) } })
      .catch((err) => { if (!ignore) { setError(err.message); setLoading(false) } })
    return () => { ignore = true }
  }, [url])

  return { data, loading, error }
}

function UserList() {
  const { data: users, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users')

  if (loading) return <p className="desc">Loading users…</p>
  if (error) return <p className="error-text">Error: {error}</p>

  return (
    <div className="user-list">
      {users.map((u) => (
        <div className="user-card" key={u.id}>
          <span className="user-name">{u.name}</span>
          <span className="user-email">{u.email}</span>
        </div>
      ))}
    </div>
  )
}

function PostList() {
  const { data: posts, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts?_limit=5')

  if (loading) return <p className="desc">Loading posts…</p>
  if (error) return <p className="error-text">Error: {error}</p>

  return (
    <div className="event-list">
      {posts.map((p) => (
        <div className="event-item" key={p.id}>
          <span className="event-name">{p.title}</span>
        </div>
      ))}
    </div>
  )
}

function App() {
  const [tab, setTab] = useState('users')

  return (
    <main className="page">
      <div className="card">
        <span className="badge">Custom Hooks</span>
        <h1 className="ev-title">Data Viewer</h1>
        <div className="row" style={{ marginBottom: 16 }}>
          <button className="btn btn-auto" onClick={() => setTab('users')}>Users</button>
          <button className="btn btn-auto" onClick={() => setTab('posts')}>Posts</button>
        </div>
        {tab === 'users' ? <UserList /> : <PostList />}
        <p className="demo-note">One useFetch hook — both components use it. Zero duplication.</p>
      </div>
    </main>
  )
}

export default App
