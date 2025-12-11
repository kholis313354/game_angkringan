import React, { useState } from 'react'
import StartScreen from './components/StartScreen'
import GameScreen from './components/GameScreen'
import GameOver from './components/GameOver'
import './App.css'

function App() {
  const [gameState, setGameState] = useState('start') // 'start', 'playing', 'gameover'
  const [playerName, setPlayerName] = useState('')
  const [score, setScore] = useState(0)

  const handleStart = (name) => {
    setPlayerName(name)
    setGameState('playing')
    setScore(0)
  }

  const handleGameOver = (finalScore) => {
    setScore(finalScore)
    setGameState('gameover')
  }

  const handleRestart = () => {
    setGameState('start')
    setScore(0)
  }

  return (
    <div className="app">
      {gameState === 'start' && (
        <StartScreen onStart={handleStart} />
      )}
      {gameState === 'playing' && (
        <GameScreen 
          playerName={playerName}
          onGameOver={handleGameOver}
        />
      )}
      {gameState === 'gameover' && (
        <GameOver 
          playerName={playerName}
          score={score}
          onRestart={handleRestart}
        />
      )}
    </div>
  )
}

export default App

