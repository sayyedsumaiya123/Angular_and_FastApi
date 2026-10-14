import { useState } from 'react'

const moves = [
  { name: 'Rock', emoji: '\u270a' },
  { name: 'Paper', emoji: '\u270b' },
  { name: 'Scissors', emoji: '\u270c\ufe0f' },
]

function Scoreboard({ you, cpu, draws }) {
  return (
    <div className="row rps-scores">
      <span className="pill pill-green">You {you}</span>
      <span className="pill pill-red">CPU {cpu}</span>
      <span className="pill pill-yellow">Draw {draws}</span>
    </div>
  )
}

function MoveButton({ move, onPick }) {
  return (
    <button className="rps-choice" onClick={onPick}>
      <span className="rps-choice-emoji">{move.emoji}</span>
      <span>{move.name}</span>
    </button>
  )
}

function pickCpuMove() {
  return moves[Math.floor(Math.random() * moves.length)]
}

function App() {
  const [playerPick, setPlayerPick] = useState(null)
  const [cpuPick, setCpuPick] = useState(null)
  const [score] = useState({ you: 0, cpu: 0, draws: 0 })

  function play(pick) {
    const cpu = pickCpuMove()
    setPlayerPick(pick)
    setCpuPick(cpu)
  }

  return (
    <div className="card rps-card">
      <span className="badge">Live Project</span>
      <h1 className="ev-title">Rock Paper Scissors</h1>
      <p className="desc">You vs the CPU — {moves.length} moves, pick one to start.</p>

      <Scoreboard you={score.you} cpu={score.cpu} draws={score.draws} />

      <div className="rps-fight">
        <div className="rps-side">
          <div className="rps-emoji">{playerPick ? playerPick.emoji : '?'}</div>
          <span className="rps-name">You</span>
        </div>
        <span className="rps-vs">vs</span>
        <div className="rps-side">
          <div className="rps-emoji">{cpuPick ? cpuPick.emoji : '?'}</div>
          <span className="rps-name">CPU</span>
        </div>
      </div>

      <p className="status rps-result">Pick your move</p>

      <div className="row rps-choices">
        {moves.map((move) => (
          <MoveButton key={move.name} move={move} onPick={() => play(move)} />
        ))}
      </div>

      <button className="btn btn-auto rps-reset">Reset game</button>
    </div>
  )
}

export default App