const LEADERBOARD_KEY = 'angkringan_leaderboard'
const MAX_LEADERBOARD_ENTRIES = 10

export const saveScore = (name, score) => {
  try {
    const leaderboard = getLeaderboard()
    
    // Add new score with unique ID
    const newEntry = {
      id: Date.now() + Math.random(), // Unique ID
      name,
      score,
      date: new Date().toISOString()
    }
    
    leaderboard.push(newEntry)

    // Sort by score (descending), then by date (newer first for same score)
    leaderboard.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score
      }
      return new Date(b.date) - new Date(a.date)
    })

    // Remove duplicates based on name and score combination
    const seen = new Set()
    const uniqueLeaderboard = leaderboard.filter(entry => {
      const key = `${entry.name}-${entry.score}`
      if (seen.has(key)) {
        return false
      }
      seen.add(key)
      return true
    })

    // Keep only top scores
    const topScores = uniqueLeaderboard.slice(0, MAX_LEADERBOARD_ENTRIES)

    // Save to localStorage
    localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(topScores))
  } catch (error) {
    console.error('Error saving score:', error)
  }
}

export const getLeaderboard = () => {
  try {
    const data = localStorage.getItem(LEADERBOARD_KEY)
    if (data) {
      return JSON.parse(data)
    }
    return []
  } catch (error) {
    console.error('Error getting leaderboard:', error)
    return []
  }
}

export const clearLeaderboard = () => {
  try {
    localStorage.removeItem(LEADERBOARD_KEY)
  } catch (error) {
    console.error('Error clearing leaderboard:', error)
  }
}

