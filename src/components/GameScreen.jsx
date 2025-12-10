import React, { useState, useEffect, useRef } from 'react'
import './GameScreen.css'

// Responsive game dimensions
const getGameDimensions = () => {
  const width = window.innerWidth
  const height = window.innerHeight
  
  if (width < 768) {
    // Mobile
    return {
      width: Math.min(width - 20, 400),
      height: Math.min(height - 100, 600),
      characterWidth: 100,
      characterHeight: 100,
      itemSize: 70,
      characterSpeed: 4,
      fallSpeed: 2.5
    }
  } else if (width < 1024) {
    // Tablet
    return {
      width: Math.min(width - 40, 700),
      height: Math.min(height - 80, 550),
      characterWidth: 120,
      characterHeight: 120,
      itemSize: 75,
      characterSpeed: 4.5,
      fallSpeed: 2.8
    }
  } else {
    // Desktop
    return {
      width: 800,
      height: 600,
      characterWidth: 110,
      characterHeight: 110,
      itemSize: 70,
      characterSpeed: 5,
      fallSpeed: 3
    }
  }
}

const FOOD_POINTS = 10
const MILESTONES = [100, 200, 300] // Milestone points untuk manipulasi gambar
const MANIPULATION_COUNT = 2 // Jumlah manipulasi per milestone
const MANIPULATION_DISTANCE = 150 // Jarak dari karakter untuk trigger manipulasi (dalam px)

const FOOD_ITEMS = [
  'ikanLele.png',
  'Tahu.png',
  'tempe.png',
  'ayamGoreng.png'
]

function GameScreen({ playerName, onGameOver }) {
  const [dimensions, setDimensions] = useState(getGameDimensions())
  const [characterX, setCharacterX] = useState(dimensions.width / 2 - dimensions.characterWidth / 2)
  const [characterImage, setCharacterImage] = useState('fai.png')
  const [items, setItems] = useState([])
  const [score, setScore] = useState(0)
  const [keys, setKeys] = useState({})
  const [currentMilestone, setCurrentMilestone] = useState(null) // Milestone aktif saat ini
  const [manipulationCount, setManipulationCount] = useState(0) // Jumlah manipulasi di milestone saat ini
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const gameLoopRef = useRef(null)
  const itemSpawnTimerRef = useRef(null)
  const eatingTimerRef = useRef(null)
  const characterXRef = useRef(characterX)
  const itemsRef = useRef(items)
  const scoreRef = useRef(score)
  const backsoundRef = useRef(null)
  const eatSoundRef = useRef(null)
  const gameOverSoundRef = useRef(null)
  const touchStartXRef = useRef(null)
  const isDraggingRef = useRef(false)
  
  // Update refs when state changes
  useEffect(() => {
    characterXRef.current = characterX
    itemsRef.current = items
    scoreRef.current = score
  }, [characterX, items, score])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions(getGameDimensions())
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeys(prev => ({ ...prev, [e.key]: true }))
    }

    const handleKeyUp = (e) => {
      setKeys(prev => ({ ...prev, [e.key]: false }))
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  // Handle touch input for mobile/tablet
  useEffect(() => {
    const gameArea = document.querySelector('.game-area')
    if (!gameArea) return

    const handleTouchStart = (e) => {
      e.preventDefault()
      const touch = e.touches[0]
      const rect = gameArea.getBoundingClientRect()
      touchStartXRef.current = touch.clientX - rect.left
      isDraggingRef.current = true
    }

    const handleTouchMove = (e) => {
      if (!isDraggingRef.current || touchStartXRef.current === null) return
      e.preventDefault()
      
      const touch = e.touches[0]
      const rect = gameArea.getBoundingClientRect()
      const currentX = touch.clientX - rect.left
      const deltaX = currentX - touchStartXRef.current

      // Update character position directly based on touch position
      setCharacterX(prev => {
        // Calculate target position (center character on touch point)
        let targetX = currentX - dimensions.characterWidth / 2
        
        // Clamp to boundaries
        targetX = Math.max(0, Math.min(dimensions.width - dimensions.characterWidth, targetX))
        
        // Smooth movement towards target
        const diff = targetX - prev
        const speed = Math.abs(diff) > dimensions.characterSpeed * 3 
          ? dimensions.characterSpeed * 3 
          : Math.abs(diff)
        
        if (Math.abs(diff) > 1) {
          return prev + (diff > 0 ? speed : -speed)
        }
        return targetX
      })
      
      touchStartXRef.current = currentX
    }

    const handleTouchEnd = (e) => {
      e.preventDefault()
      isDraggingRef.current = false
      touchStartXRef.current = null
    }

    gameArea.addEventListener('touchstart', handleTouchStart, { passive: false })
    gameArea.addEventListener('touchmove', handleTouchMove, { passive: false })
    gameArea.addEventListener('touchend', handleTouchEnd, { passive: false })
    gameArea.addEventListener('touchcancel', handleTouchEnd, { passive: false })

    return () => {
      gameArea.removeEventListener('touchstart', handleTouchStart)
      gameArea.removeEventListener('touchmove', handleTouchMove)
      gameArea.removeEventListener('touchend', handleTouchEnd)
      gameArea.removeEventListener('touchcancel', handleTouchEnd)
    }
  }, [dimensions])

  // Character movement with requestAnimationFrame for smooth animation
  useEffect(() => {
    let animationFrameId
    const moveCharacter = () => {
      setCharacterX(prev => {
        let newX = prev
        if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
          newX = Math.max(0, prev - dimensions.characterSpeed)
        }
        if (keys['ArrowRight'] || keys['d'] || keys['D']) {
          newX = Math.min(dimensions.width - dimensions.characterWidth, prev + dimensions.characterSpeed)
        }
        return newX
      })
      animationFrameId = requestAnimationFrame(moveCharacter)
    }
    animationFrameId = requestAnimationFrame(moveCharacter)
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [keys, dimensions])

  // Check milestone and reset manipulation count
  useEffect(() => {
    // Cari milestone yang aktif (score >= milestone dan score < milestone + 100)
    const activeMilestone = MILESTONES.find(m => score >= m && score < m + 100)
    
    if (activeMilestone && activeMilestone !== currentMilestone) {
      // Masuk milestone baru
      setCurrentMilestone(activeMilestone)
      setManipulationCount(0)
    } else if (currentMilestone && (score < currentMilestone || score >= currentMilestone + 100)) {
      // Keluar dari milestone (score di bawah milestone atau sudah melewati milestone + 100)
      setCurrentMilestone(null)
      setManipulationCount(0)
    }
  }, [score, currentMilestone])

  // Spawn items
  useEffect(() => {
    const spawnItem = () => {
      const isStone = Math.random() < 0.15 // 15% chance for stone
      let itemType = isStone ? 'batu.png' : FOOD_ITEMS[Math.floor(Math.random() * FOOD_ITEMS.length)]
      const x = Math.random() * (dimensions.width - dimensions.itemSize)
      
      // Check if we should create a manipulation item (fake food that becomes stone)
      let isManipulation = false
      if (!isStone && currentMilestone !== null && manipulationCount < MANIPULATION_COUNT) {
        // 50% chance untuk manipulasi jika masih dalam milestone dan belum mencapai limit
        isManipulation = Math.random() < 0.5
      }

      setItems(prev => [...prev, {
        id: Date.now() + Math.random(),
        x,
        y: -dimensions.itemSize,
        type: itemType,
        isStone: isStone || isManipulation, // Manipulation items akan jadi stone saat collision
        originalType: itemType, // Simpan type asli untuk manipulasi
        isManipulation: isManipulation, // Flag untuk manipulasi
        manipulated: false // Flag apakah sudah di-manipulasi
      }])
    }

    itemSpawnTimerRef.current = setInterval(spawnItem, 1500) // Spawn every 1.5 seconds

    return () => {
      if (itemSpawnTimerRef.current) {
        clearInterval(itemSpawnTimerRef.current)
      }
    }
  }, [dimensions, currentMilestone, manipulationCount])

  // Game loop - move items and check collisions using requestAnimationFrame
  useEffect(() => {
    let animationFrameId
    const gameLoop = () => {
      const currentCharacterX = characterXRef.current
      const currentScore = scoreRef.current
      
      setItems(prev => {
        const updatedItems = prev.map(item => {
          const characterCenterX = currentCharacterX + dimensions.characterWidth / 2
          const characterCenterY = dimensions.height - dimensions.characterHeight / 2
          const itemCenterX = item.x + dimensions.itemSize / 2
          const itemCenterY = item.y + dimensions.itemSize / 2

          const distanceX = Math.abs(characterCenterX - itemCenterX)
          const distanceY = Math.abs(characterCenterY - itemCenterY)
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)

          // Manipulasi gambar: ubah makanan jadi batu ketika mendekati karakter
          let manipulatedItem = { ...item }
          if (item.isManipulation && !item.manipulated && distance < MANIPULATION_DISTANCE) {
            manipulatedItem.type = 'batu.png'
            manipulatedItem.manipulated = true
            // Update manipulation count
            setManipulationCount(prev => prev + 1)
          }

          return {
            ...manipulatedItem,
            y: manipulatedItem.y + dimensions.fallSpeed
          }
        })

        // Check collisions
        let shouldRemoveItem = null
        updatedItems.forEach(item => {
          const characterCenterX = currentCharacterX + dimensions.characterWidth / 2
          const characterCenterY = dimensions.height - dimensions.characterHeight / 2
          const itemCenterX = item.x + dimensions.itemSize / 2
          const itemCenterY = item.y + dimensions.itemSize / 2

          const distanceX = Math.abs(characterCenterX - itemCenterX)
          const distanceY = Math.abs(characterCenterY - itemCenterY)

          // Check if character is near item (collision detection)
          if (distanceX < (dimensions.characterWidth / 2 + dimensions.itemSize / 2) && 
              distanceY < (dimensions.characterHeight / 2 + dimensions.itemSize / 2) &&
              item.y > dimensions.height - dimensions.characterHeight - 50) {
            
            // Change character to eating state
            setCharacterImage('fai2.png')
            
            // Clear eating timer if exists
            if (eatingTimerRef.current) {
              clearTimeout(eatingTimerRef.current)
            }

            // Reset character image after eating animation
            eatingTimerRef.current = setTimeout(() => {
              setCharacterImage('fai.png')
            }, 300)

            // Check if item is stone (including manipulated items)
            const isActuallyStone = item.isStone || (item.isManipulation && item.manipulated)
            
            if (isActuallyStone) {
              // Stop background music
              if (backsoundRef.current) {
                backsoundRef.current.pause()
              }
              
              // Play game over sound
              if (gameOverSoundRef.current) {
                gameOverSoundRef.current.currentTime = 0
                gameOverSoundRef.current.play().catch(err => {
                  console.log('Error playing game over sound:', err)
                })
              }
              
              // Game over
              onGameOver(currentScore)
              return prev
            } else {
              // Play eat sound
              if (eatSoundRef.current) {
                eatSoundRef.current.currentTime = 0
                eatSoundRef.current.play().catch(err => {
                  console.log('Error playing eat sound:', err)
                })
              }
              
              // Add score - hanya 10 point per makanan
              setScore(prevScore => prevScore + FOOD_POINTS)
            }

            // Mark item for removal
            shouldRemoveItem = item.id
          }
        })

        // Remove collided item
        let finalItems = updatedItems
        if (shouldRemoveItem) {
          finalItems = updatedItems.filter(i => i.id !== shouldRemoveItem)
        }

        // Remove items that fell off screen
        return finalItems.filter(item => item.y < dimensions.height + 100)
      })
      
      animationFrameId = requestAnimationFrame(gameLoop)
    }
    
    animationFrameId = requestAnimationFrame(gameLoop)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      if (eatingTimerRef.current) {
        clearTimeout(eatingTimerRef.current)
      }
    }
  }, [dimensions, onGameOver])

  // Initialize and play background music
  useEffect(() => {
    // Create audio elements
    backsoundRef.current = new Audio('/sound/backsound.mp3')
    eatSoundRef.current = new Audio('/sound/memakan.mp3')
    gameOverSoundRef.current = new Audio('/sound/gameover.mp3')
    
    // Set background music to loop
    backsoundRef.current.loop = true
    backsoundRef.current.volume = 0.5 // Set volume to 50%
    
    // Set volume for sound effects
    eatSoundRef.current.volume = 0.7
    gameOverSoundRef.current.volume = 0.8
    
    // Play background music (user already interacted by clicking "Mulai Bermain")
    const playBacksound = async () => {
      try {
        await backsoundRef.current.play()
      } catch (err) {
        console.log('Error playing background music:', err)
        // Retry after a short delay
        setTimeout(() => {
          if (backsoundRef.current) {
            backsoundRef.current.play().catch(e => {
              console.log('Retry failed:', e)
            })
          }
        }, 100)
      }
    }
    
    playBacksound()
    
    // Cleanup on unmount
    return () => {
      if (backsoundRef.current) {
        backsoundRef.current.pause()
        backsoundRef.current.currentTime = 0
        backsoundRef.current = null
      }
      if (eatSoundRef.current) {
        eatSoundRef.current = null
      }
      if (gameOverSoundRef.current) {
        gameOverSoundRef.current = null
      }
    }
  }, [])

  // Update character position when dimensions change
  useEffect(() => {
    setCharacterX(dimensions.width / 2 - dimensions.characterWidth / 2)
  }, [dimensions])

  return (
    <div className="game-screen">
      <div className="game-container" style={{ width: dimensions.width, height: dimensions.height }}>
        <div className="game-info">
          <div className="player-name">Pemain: {playerName}</div>
          <div className="score-display">Skor: {score}</div>
          {currentMilestone !== null && manipulationCount < MANIPULATION_COUNT && (
            <div className="milestone-warning">
              ⚠️ Tantangan Poin {currentMilestone}!
            </div>
          )}
        </div>
        
        <div className="game-area">
          {/* Falling items */}
          {items.map(item => (
            <div
              key={item.id}
              className="falling-item"
              style={{
                transform: `translate(${item.x}px, ${item.y}px)`,
                width: `${dimensions.itemSize}px`,
                height: `${dimensions.itemSize}px`
              }}
            >
              <img
                src={`/img/${item.type}`}
                alt={(item.isStone || (item.isManipulation && item.manipulated)) ? 'batu' : 'makanan'}
                style={{
                  width: '100%',
                  height: '100%',
                  transition: 'opacity 0.2s'
                }}
              />
            </div>
          ))}

          {/* Character */}
          <div
            className="character"
            style={{
              transform: `translateX(${characterX}px)`,
              bottom: '20px',
              width: `${dimensions.characterWidth}px`,
              height: `${dimensions.characterHeight}px`
            }}
          >
            <img
              src={`/img/${characterImage}`}
              alt="character"
              style={{
                width: '100%',
                height: '100%'
              }}
            />
          </div>
        </div>

        <div className="game-instructions">
          {isMobile 
            ? 'Geser jari kiri/kanan untuk bergerak' 
            : 'Gunakan tombol ← → atau A D untuk bergerak'}
        </div>
      </div>
    </div>
  )
}

export default GameScreen

