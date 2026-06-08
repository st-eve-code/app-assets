import React, { useEffect, useState } from 'react'
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native'

const ROWS = 6
const COLS = 7
const EMPTY = 0
const PLAYER1 = 1
const PLAYER2 = 2

type WinningLine = { row: number; col: number }[]

type BoardProps = {
  onMove: (player: number) => void
  onGameEnd: (winner: number | null, winningLine?: WinningLine) => void
  currentPlayer: number
  disabled?: boolean
}

export default function Connect4Board({ onMove, onGameEnd, currentPlayer, disabled = false }: BoardProps) {
  const [board, setBoard] = useState<number[][]>(
    Array(ROWS).fill(null).map(() => Array(COLS).fill(EMPTY))
  )
  const [animatingPiece, setAnimatingPiece] = useState<{col: number, row: number, player: number} | null>(null)
  const [dropAnim] = useState(new Animated.Value(0))

  // Check for winner and return winning line
  const checkWinner = (board: number[][]): { winner: number | null; line: WinningLine } => {
    // Check horizontal
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS - 3; col++) {
        const player = board[row][col]
        if (player !== EMPTY &&
            player === board[row][col + 1] &&
            player === board[row][col + 2] &&
            player === board[row][col + 3]) {
          return {
            winner: player,
            line: [
              { row, col },
              { row, col: col + 1 },
              { row, col: col + 2 },
              { row, col: col + 3 },
            ]
          }
        }
      }
    }

    // Check vertical
    for (let col = 0; col < COLS; col++) {
      for (let row = 0; row < ROWS - 3; row++) {
        const player = board[row][col]
        if (player !== EMPTY &&
            player === board[row + 1][col] &&
            player === board[row + 2][col] &&
            player === board[row + 3][col]) {
          return {
            winner: player,
            line: [
              { row, col },
              { row: row + 1, col },
              { row: row + 2, col },
              { row: row + 3, col },
            ]
          }
        }
      }
    }

    // Check diagonal (down-right)
    for (let row = 0; row < ROWS - 3; row++) {
      for (let col = 0; col < COLS - 3; col++) {
        const player = board[row][col]
        if (player !== EMPTY &&
            player === board[row + 1][col + 1] &&
            player === board[row + 2][col + 2] &&
            player === board[row + 3][col + 3]) {
          return {
            winner: player,
            line: [
              { row, col },
              { row: row + 1, col: col + 1 },
              { row: row + 2, col: col + 2 },
              { row: row + 3, col: col + 3 },
            ]
          }
        }
      }
    }

    // Check diagonal (down-left)
    for (let row = 0; row < ROWS - 3; row++) {
      for (let col = 3; col < COLS; col++) {
        const player = board[row][col]
        if (player !== EMPTY &&
            player === board[row + 1][col - 1] &&
            player === board[row + 2][col - 2] &&
            player === board[row + 3][col - 3]) {
          return {
            winner: player,
            line: [
              { row, col },
              { row: row + 1, col: col - 1 },
              { row: row + 2, col: col - 2 },
              { row: row + 3, col: col - 3 },
            ]
          }
        }
      }
    }

    // Check for draw
    const isFull = board[0].every(cell => cell !== EMPTY)
    if (isFull) return { winner: 0, line: [] } // Draw

    return { winner: null, line: [] }
  }

  const dropPiece = (col: number) => {
    if (disabled) return

    // Find the lowest empty row in this column
    let row = -1
    for (let r = ROWS - 1; r >= 0; r--) {
      if (board[r][col] === EMPTY) {
        row = r
        break
      }
    }

    if (row === -1) return // Column is full

    // Animate the piece dropping
    setAnimatingPiece({ col, row, player: currentPlayer })
    dropAnim.setValue(0)
    
    Animated.timing(dropAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      // Update board after animation
      const newBoard = board.map(r => [...r])
      newBoard[row][col] = currentPlayer
      setBoard(newBoard)
      setAnimatingPiece(null)

      // Notify parent that move was made (for seed counting)
      onMove(currentPlayer)

      // Check for winner
      const result = checkWinner(newBoard)
      if (result.winner !== null) {
        onGameEnd(result.winner, result.line)
      }
    })
  }

  const resetBoard = () => {
    setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(EMPTY)))
    setAnimatingPiece(null)
  }

  // Expose reset method via key prop change
  useEffect(() => {
    resetBoard()
  }, [disabled])

  return (
    <View style={styles.boardContainer}>
      <View style={styles.board}>
        {/* Column touch areas */}
        <View style={styles.columnContainer}>
          {Array(COLS).fill(0).map((_, col) => (
            <TouchableOpacity
              key={col}
              style={styles.column}
              onPress={() => dropPiece(col)}
              disabled={disabled}
            >
              <View style={styles.columnHighlight} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Board grid */}
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => {
              const isAnimating = animatingPiece?.col === colIndex && animatingPiece?.row === rowIndex
              
              return (
                <View key={colIndex} style={styles.cell}>
                  {cell !== EMPTY && !isAnimating && (
                    <View 
                      style={[
                        styles.piece,
                        cell === PLAYER1 ? styles.player1Piece : styles.player2Piece,
                      ]} 
                    />
                  )}
                  {isAnimating && (
                    <Animated.View
                      style={[
                        styles.piece,
                        animatingPiece.player === PLAYER1 ? styles.player1Piece : styles.player2Piece,
                        {
                          transform: [{
                            translateY: dropAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [-400, 0]
                            })
                          }]
                        }
                      ]}
                    />
                  )}
                </View>
              )
            })}
          </View>
        ))}
      </View>
    </View>
  )
}

const CELL_SIZE = 38
const PIECE_SIZE = 32

const styles = StyleSheet.create({
  boardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  board: {
    backgroundColor: '#1a3fcc',
    borderRadius: 14,
    padding: 8,
    shadowColor: '#0e2a99',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  columnContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 8,
    right: 8,
    zIndex: 10,
  },
  column: {
    width: CELL_SIZE,
    height: CELL_SIZE * ROWS + 40,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  columnHighlight: {
    width: CELL_SIZE,
    height: 20,
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    gap: 5,
    marginBottom: 5,
  },
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: CELL_SIZE / 2,
    backgroundColor: '#091880',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  piece: {
    width: PIECE_SIZE,
    height: PIECE_SIZE,
    borderRadius: PIECE_SIZE / 2,
  },
  player1Piece: {
    backgroundColor: '#e8231a',
  },
  player2Piece: {
    backgroundColor: '#f5c800',
  },
})
