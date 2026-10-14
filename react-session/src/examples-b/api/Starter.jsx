function App() {
  return (
    <main className="page">
      <div className="card">
        <span className="badge">API</span>
        <h1 className="ev-title">Users</h1>
        <div className="user-list">
          <div className="user-card">
            <span className="user-name">Leanne Graham</span>
            <span className="user-email">leanne@example.com</span>
          </div>
          <div className="user-card">
            <span className="user-name">Ervin Howell</span>
            <span className="user-email">ervin@example.com</span>
          </div>
        </div>
        <button className="btn">Load Users</button>
        <p className="demo-note">The button does nothing. These users are hardcoded.</p>
      </div>
    </main>
  )
}

export default App
