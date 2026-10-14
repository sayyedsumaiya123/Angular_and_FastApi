function App() {
  return (
    <main className="page">
      <div className="card">
        <span className="badge">Forms</span>
        <h1 className="ev-title">Sign Up</h1>
        <div className="form-group">
          <label className="form-label">Name</label>
          <input className="name-input" type="text" placeholder="Your name" />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="name-input" type="email" placeholder="you@email.com" />
        </div>
        <button className="btn">Submit</button>
        <p className="demo-note">Type something — nothing happens. The inputs are dead.</p>
      </div>
    </main>
  )
}

export default App
