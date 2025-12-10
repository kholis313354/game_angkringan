import React, { useState, useEffect } from 'react'
import { getLeaderboard, clearLeaderboard } from '../utils/leaderboard'
import './Leaderboard.css'

function Leaderboard({ refreshTrigger }) {
  const [scores, setScores] = useState([])

  useEffect(() => {
    const leaderboard = getLeaderboard()
    setScores(leaderboard)
  }, [refreshTrigger])

  // Listen for storage changes to update leaderboard in real-time
  useEffect(() => {
    const handleStorageChange = () => {
      const leaderboard = getLeaderboard()
      setScores(leaderboard)
    }

    window.addEventListener('storage', handleStorageChange)
    // Also check periodically for same-tab updates
    const interval = setInterval(() => {
      const leaderboard = getLeaderboard()
      setScores(leaderboard)
    }, 500)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      clearInterval(interval)
    }
  }, [])

  const handleClearLeaderboard = () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus semua data leaderboard?')) {
      clearLeaderboard()
      setScores([])
    }
  }

  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h2 className="leaderboard-title">🏆 Leaderboard</h2>
        {scores.length > 0 && (
          <button 
            onClick={handleClearLeaderboard} 
            className="clear-leaderboard-btn"
            title="Hapus semua data leaderboard"
          >
            🗑️
          </button>
        )}
      </div>
      {scores.length === 0 ? (
        <p className="no-scores">Belum ada skor tertinggi</p>
      ) : (
        <div className="scores-list">
          {scores.map((entry, index) => (
            <div key={`${entry.name}-${entry.score}-${index}`} className="score-item">
              <span className="rank">#{index + 1}</span>
              <span className="name">{entry.name}</span>
              <span className="score">{entry.score}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Leaderboard

