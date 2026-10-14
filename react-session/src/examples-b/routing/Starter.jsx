import { useState } from 'react'

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
  const [page, setPage] = useState('home')

  return (
    <main className="page">
      <div className="card">
        <div className="row" style={{ marginBottom: 16 }}>
          <button className="btn btn-auto" onClick={() => setPage('home')}>Home</button>
          <button className="btn btn-auto" onClick={() => setPage('about')}>About</button>
          <button className="btn btn-auto" onClick={() => setPage('contact')}>Contact</button>
        </div>
        {page === 'home' && <Home />}
        {page === 'about' && <About />}
        {page === 'contact' && <Contact />}
      </div>
    </main>
  )
}

export default App
