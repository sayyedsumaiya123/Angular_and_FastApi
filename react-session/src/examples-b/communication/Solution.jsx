import { useState } from 'react'

function UserCard({ name, role, onRemove }) {
  return (
    <div className="card">
      <h1 className="ev-title">{name}</h1>
      <p className="desc">{role}</p>
      <button className="btn" onClick={onRemove}>Remove</button>
    </div>
  )
}

function Counter({ count, onLike }) {
  return (
    <div className="card">
      <h1 className="ev-title">Likes: {count}</h1>
      <button className="btn" onClick={onLike}>Like</button>
    </div>
  )
}

function App() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Zaid Rakhange', role: 'Web Lead' },
    { id: 2, name: 'Arjun Mehta', role: 'Design Lead' },
  ])
  const [count, setCount] = useState(0)

  function removeUser(id) {
    setUsers(users.filter((u) => u.id !== id))
  }

  return (
    <main className="page">
      {users.map((user) => (
        <UserCard
          key={user.id}
          name={user.name}
          role={user.role}
          onRemove={() => removeUser(user.id)}
        />
      ))}
      <Counter count={count} onLike={() => setCount(count + 1)} />
    </main>
  )
}

export default App
