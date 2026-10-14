import { useState, useEffect } from 'react'

function UserList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => { setUsers(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <p className="desc">Loading users…</p>

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
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
      .then((res) => res.json())
      .then((data) => { setPosts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <p className="desc">Loading posts…</p>

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
        <p className="demo-note">Same fetch logic duplicated in both components.</p>
      </div>
    </main>
  )
}

export default App
