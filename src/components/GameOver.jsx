import React, { useEffect, useState } from 'react'
import { saveScore } from '../utils/leaderboard'
import Leaderboard from './Leaderboard'
import './GameOver.css'

function GameOver({ playerName, score, onRestart }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  useEffect(() => {
    // Save score when game over
    saveScore(playerName, score)
    setRefreshTrigger(prev => prev + 1)
  }, [playerName, score])

  const baseUrl = import.meta.env.BASE_URL

  return (
    <div className="game-over-screen" style={{ backgroundImage: `url(${baseUrl}img/background.png)` }}>
      <div className="game-over-content">
        <h1 className="game-over-title">Game Over!</h1>
        <div className="final-score">
          <p className="player-name-display">{playerName}</p>
          <p className="score-display">Skor Akhir: <span className="score-value">{score}</span></p>
        </div>

        <Leaderboard refreshTrigger={refreshTrigger} />

        <button onClick={onRestart} className="restart-button">
          Main Lagi
        </button>
      </div>
    </div>
  )
}

export default GameOver

