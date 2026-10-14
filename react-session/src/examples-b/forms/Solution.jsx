import { useState } from 'react'

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (name && email) {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <main className="page">
        <div className="card">
          <span className="badge">Forms</span>
          <h1 className="ev-title">Welcome, {name}!</h1>
          <p className="desc">Your email is {email}</p>
          <button className="btn" onClick={() => setSubmitted(false)}>Go back</button>
        </div>
      </main>
    )
  }

  return (
    <main className="page">
      <div className="card">
        <span className="badge">Forms</span>
        <h1 className="ev-title">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input className="name-input" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="name-input" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <button className="btn" type="submit">Submit</button>
        </form>
      </div>
    </main>
  )
}

export default App
