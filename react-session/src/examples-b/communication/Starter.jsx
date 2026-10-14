function UserCard() {
  const name = 'Zaid Rakhange'
  const role = 'Web Lead'
  return (
    <div className="card">
      <h1 className="ev-title">{name}</h1>
      <p className="desc">{role}</p>
    </div>
  )
}

function Counter() {
  const count = 5
  return (
    <div className="card">
      <h1 className="ev-title">Likes: {count}</h1>
      <button className="btn" disabled>Like</button>
    </div>
  )
}

function App() {
  return (
    <main className="page">
      <UserCard />
      <Counter />
    </main>
  )
}

export default App
