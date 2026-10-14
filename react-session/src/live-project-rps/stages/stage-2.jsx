const moves = [
  { name: 'Rock', emoji: '\u270a' },
  { name: 'Paper', emoji: '\u270b' },
  { name: 'Scissors', emoji: '\u270c\ufe0f' },
]

function App() {
  return (
    <div className="card rps-card">
      <span className="badge">Live Project</span>
      <h1 className="ev-title">Rock Paper Scissors</h1>
      <p className="desc">You vs the CPU — {moves.length} moves, pick one to start.</p>

      <div className="row rps-scores">
        <span className="pill pill-green">You 0</span>
        <span className="pill pill-red">CPU 0</span>
        <span className="pill pill-yellow">Draw 0</span>
      </div>

      <div className="rps-fight">
        <div className="rps-side">
          <div className="rps-emoji">?</div>
          <span className="rps-name">You</span>
        </div>
        <span className="rps-vs">vs</span>
        <div className="rps-side">
          <div className="rps-emoji">?</div>
          <span className="rps-name">CPU</span>
        </div>
      </div>

      <p className="status rps-result">Pick your move</p>

      <div className="row rps-choices">
        {moves.map((move) => (
          <button key={move.name} className="rps-choice">
            <span className="rps-choice-emoji">{move.emoji}</span>
            <span>{move.name}</span>
          </button>
        ))}
      </div>

      <button className="btn btn-auto rps-reset">Reset game</button>
    </div>
  )
}

export default App