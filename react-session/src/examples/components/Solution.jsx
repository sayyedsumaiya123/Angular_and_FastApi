function Badge() {
  return <span className="badge">Core Team</span>
}

function MemberName() {
  return <h1 className="ev-title">Zaid Rakhange</h1>
}

function MemberRole() {
  return <p className="going">Web Lead</p>
}

function App() {
  return (
    <main className="page">
      <div className="card">
        <Badge />
        <MemberName />
        <MemberRole />
        <div className="row">
          <span className="pill pill-blue">Web</span>
          <span className="pill pill-green">Design</span>
        </div>
      </div>
    </main>
  )
}

export default App