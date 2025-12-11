import React, { useState, useEffect } from 'react'
import Leaderboard from './Leaderboard'
import './StartScreen.css'

function StartScreen({ onStart }) {
  const [playerName, setPlayerName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (playerName.trim()) {
      onStart(playerName.trim())
    }
  }

  const baseUrl = import.meta.env.BASE_URL

  return (
    <div className="start-screen" style={{ backgroundImage: `url(${baseUrl}img/background.png)` }}>
      <div className="start-content">
        <h1 className="game-title">Game Angkringan</h1>
        <p className="game-subtitle">Tangkap makanan, hindari batu!</p>
        
        <form onSubmit={handleSubmit} className="name-form">
          <input
            type="text"
            placeholder="Masukkan nama Anda"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="name-input"
            maxLength={20}
            autoFocus
          />
          <button type="submit" className="start-button">
            Mulai Bermain
          </button>
        </form>

        <Leaderboard />
      </div>
    </div>
  )
}

export default StartScreen

