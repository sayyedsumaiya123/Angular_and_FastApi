import { MemoryRouter, Routes, Route, Link } from 'react-router-dom'

function Home() {
  return (
    <div className="card">
      <span className="badge">Home</span>
      <h1 className="ev-title">Welcome to CSI ACE</h1>
      <p className="desc">This is the home page.</p>
    </div>
  )
}

function About() {
  return (
    <div className="card">
      <span className="badge">About</span>
      <h1 className="ev-title">About Us</h1>
      <p className="desc">CSI ACE is the technical chapter of our college.</p>
    </div>
  )
}

function Contact() {
  return (
    <div className="card">
      <span className="badge">Contact</span>
      <h1 className="ev-title">Get in Touch</h1>
      <p className="desc">Email us at csi@college.edu</p>
    </div>
  )
}

function App() {
  return (
    <MemoryRouter>
      <main className="page">
        <div className="card">
          <nav className="row" style={{ marginBottom: 16 }}>
            <Link to="/" className="btn btn-auto">Home</Link>
            <Link to="/about" className="btn btn-auto">About</Link>
            <Link to="/contact" className="btn btn-auto">Contact</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </main>
    </MemoryRouter>
  )
}

export default App
