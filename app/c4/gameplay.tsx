import { Image, ImageBackground } from 'expo-image'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native'
import Connect4Board from './components/Connect4Board'
import Gameplaybuttons from './components/gameplaybuttons'
import PlayerCard from './components/playerCard'

const TURN_TIME = 30 // 30 seconds per turn
const MAX_ROUNDS = 3 // Maximum 3 rounds

type WinningLine = { row: number; col: number }[]

export default function gamePlay() {
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [player1Seeds, setPlayer1Seeds] = useState(0)
  const [player2Seeds, setPlayer2Seeds] = useState(0)
  const [player1Hearts, setPlayer1Hearts] = useState(3)
  const [player2Hearts, setPlayer2Hearts] = useState(3)
  const [timer, setTimer] = useState(TURN_TIME)
  const [timerActive, setTimerActive] = useState(false) // Timer only starts after first move
  const [gameActive, setGameActive] = useState(true)
  const [boardKey, setBoardKey] = useState(0)
  const [roundNumber, setRoundNumber] = useState(1)
  const [showRoundModal, setShowRoundModal] = useState(false)
  const [pendingRoundUpdate, setPendingRoundUpdate] = useState<{winner: number | null} | null>(null)
  const [firstMoveMade, setFirstMoveMade] = useState(false)

  // Timer countdown - only runs when active
  useEffect(() => {
    if (!gameActive || !timerActive) return

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          // Time's up - current player loses a heart
          handleTimeOut()
          return TURN_TIME
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [gameActive, timerActive, currentPlayer])

  const handleTimeOut = () => {
    setTimerActive(false) // Pause timer
    
    // Current player loses a heart for running out of time
    if (currentPlayer === 1) {
      const newHearts = player1Hearts - 1
      if (newHearts <= 0) {
        endGame(2) // Player 2 wins the match
        return
      }
      setPendingRoundUpdate({ winner: 2 })
    } else {
      const newHearts = player2Hearts - 1
      if (newHearts <= 0) {
        endGame(1) // Player 1 wins the match
        return
      }
      setPendingRoundUpdate({ winner: 1 })
    }
    
    // Show round modal after 3 seconds
    setTimeout(() => {
      setShowRoundModal(true)
    }, 3000)
  }

  const handleMove = (player: number) => {
    // Start timer on first move
    if (!firstMoveMade) {
      setFirstMoveMade(true)
      setTimerActive(true)
    }

    // Update seeds count for the player who just moved
    if (player === 1) {
      setPlayer1Seeds(prev => prev + 1)
    } else {
      setPlayer2Seeds(prev => prev + 1)
    }

    // Switch player and reset timer
    setCurrentPlayer(player === 1 ? 2 : 1)
    setTimer(TURN_TIME)
  }

  const handleGameEnd = (winner: number | null, winningLine?: WinningLine) => {
    setGameActive(false)
    setTimerActive(false) // Pause timer when round ends
    
    // Wait 3 seconds before showing modal
    setTimeout(() => {
      if (winner === 0) {
        // Draw - both players lose a heart
        const newP1Hearts = player1Hearts - 1
        const newP2Hearts = player2Hearts - 1
        
        if (newP1Hearts <= 0 || newP2Hearts <= 0) {
          // At least one player out of hearts - game over
          if (newP1Hearts <= 0 && newP2Hearts <= 0) {
            endGame(0) // Both lost - draw
          } else if (newP1Hearts <= 0) {
            endGame(2) // Player 2 wins
          } else {
            endGame(1) // Player 1 wins
          }
        } else {
          // Both still have hearts - show modal then start new round
          setPendingRoundUpdate({ winner: 0 })
          setShowRoundModal(true)
        }
      } else if (winner === 1) {
        // Player 1 wins this round - Player 2 loses a heart
        const newHearts = player2Hearts - 1
        if (newHearts <= 0) {
          endGame(1) // Player 1 wins the match - hearts reached 0
        } else {
          setPendingRoundUpdate({ winner: 1 })
          setShowRoundModal(true)
        }
      } else if (winner === 2) {
        // Player 2 wins this round - Player 1 loses a heart
        const newHearts = player1Hearts - 1
        if (newHearts <= 0) {
          endGame(2) // Player 2 wins the match - hearts reached 0
        } else {
          setPendingRoundUpdate({ winner: 2 })
          setShowRoundModal(true)
        }
      }
    }, 3000) // Wait 3 seconds before modal
  }

  const handleModalClose = () => {
    setShowRoundModal(false)
    
    // Now update hearts and start new round
    if (pendingRoundUpdate) {
      const { winner } = pendingRoundUpdate
      
      if (winner === 0) {
        // Draw - both lose hearts
        setPlayer1Hearts(prev => prev - 1)
        setPlayer2Hearts(prev => prev - 1)
      } else if (winner === 1) {
        // Player 1 won - Player 2 loses heart
        setPlayer2Hearts(prev => prev - 1)
      } else if (winner === 2) {
        // Player 2 won - Player 1 loses heart
        setPlayer1Hearts(prev => prev - 1)
      }
      
      setPendingRoundUpdate(null)
      startNewRound()
    }
  }

  const startNewRound = () => {
    setTimeout(() => {
      // Reset for new round
      setRoundNumber(prev => prev + 1)
      setPlayer1Seeds(0)
      setPlayer2Seeds(0)
      setCurrentPlayer(1)
      setTimer(TURN_TIME)
      setFirstMoveMade(false)
      setTimerActive(false) // Timer starts on first move
      setGameActive(true)
      setBoardKey(prev => prev + 1) // Force board reset
    }, 500)
  }

  const endGame = (winner: number) => {
    // Only navigate to result when the entire match is over
    setTimeout(() => {
      router.push('/c4/result')
    }, 1500)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
     <ImageBackground
        source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/gbg.png' }}
        contentFit={'cover'}
        style={{
            flex: 1,
        }}>
      <ScrollView 
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical:23,
          paddingHorizontal:14,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{flexDirection:"row", justifyContent:"center",alignItems:"center",gap:50,paddingHorizontal:18}}>
            <PlayerCard 
            playername={"Player 1"} 
            width={100} height={90} 
            font={16} seedheight={20} 
            seedwidth={20}
            seeds={player1Seeds}
            hearts={player1Hearts}
            playerNumber={1}/>
            <View style={{ alignItems:"center"}}>
                <Image 
                source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/timer.png' }} 
                style={{ marginBottom:0, width:54, height:54}}
                contentFit='fill'/>
                <Text style={{fontSize:18, color:"white", top:5}}>{formatTime(timer)}</Text>
            </View>
             <PlayerCard 
            playername={"Player 2"} 
            width={100} height={90} 
            font={16} seedheight={20} 
            seedwidth={20}
            seeds={player2Seeds}
            hearts={player2Hearts}
            playerNumber={2}/>
        </View>
        <View style={{marginVertical:25, alignItems:"center"}}>
           {/* Connect 4 Game Board */}
           <Connect4Board 
             key={boardKey}
             onMove={handleMove}
             onGameEnd={handleGameEnd}
             currentPlayer={currentPlayer}
             disabled={!gameActive}
           />
        </View>
        <Gameplaybuttons/>
      </ScrollView>

      {/* Round Modal */}
      <Modal
        visible={showRoundModal}
        transparent
        animationType="fade"
        onRequestClose={handleModalClose}
      >
        <View style={modalStyles.overlay}>
          <View style={modalStyles.modal}>
            <Text style={modalStyles.title}>Round {roundNumber + 1}</Text>
            <Text style={modalStyles.message}>Get ready for the next round!</Text>
            <View style={modalStyles.buttonContainer}>
              <Text 
                style={modalStyles.button}
                onPress={handleModalClose}
              >
                Continue
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  )
}

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Reduced opacity from 0.8 to 0.5
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 32,
    width: 300,
    borderWidth: 2,
    borderColor: '#8C3DF1',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#8C3DF1',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#8C3DF1',
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
})
