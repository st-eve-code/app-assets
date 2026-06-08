import React, { useEffect, useRef, useState } from 'react'
import { Animated, Dimensions, Easing, StyleSheet, View } from 'react-native'

const { width: W, height: H } = Dimensions.get('window')

const COLORS = [
  '#f43f5e', '#a855f7', '#3b82f6', '#22d3ee',
  '#facc15', '#4ade80', '#fb923c', '#e879f9',
]

const PIECE_COUNT = 60

interface Piece {
  id: number
  x: number
  color: string
  size: number
  animY: Animated.Value
  animX: Animated.Value
  animOpacity: Animated.Value
  animRotate: Animated.Value
  delay: number
  duration: number
  driftX: number
}

function createPiece(id: number): Piece {
  return {
    id,
    x: Math.random() * W,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: 6 + Math.random() * 8,
    animY: new Animated.Value(-20),
    animX: new Animated.Value(0),
    animOpacity: new Animated.Value(0),
    animRotate: new Animated.Value(0),
    delay: Math.random() * 1200,
    duration: 2000 + Math.random() * 2000,
    driftX: (Math.random() - 0.5) * 120,
  }
}

type ConfettiProps = {
  isActive: boolean
}

export default function Confetti({ isActive }: ConfettiProps) {
  const [pieces] = useState<Piece[]>(() =>
    Array.from({ length: PIECE_COUNT }, (_, i) => createPiece(i))
  )
  const loopRefs = useRef<Animated.CompositeAnimation[]>([])
  // Track whether we've ever been active so we know to render
  const hasBeenActive = useRef(false)
  const [rendered, setRendered] = useState(false)

  useEffect(() => {
    if (isActive) {
      hasBeenActive.current = true
      setRendered(true)
      startAll()
    } else if (hasBeenActive.current) {
      // Only stop if we were previously active
      stopGradually()
    }

    return () => {
      loopRefs.current.forEach(a => a.stop())
    }
  }, [isActive])

  function startAll() {
    loopRefs.current.forEach(a => a.stop())
    loopRefs.current = []

    pieces.forEach(piece => {
      piece.animY.setValue(-20)
      piece.animX.setValue(0)
      piece.animOpacity.setValue(1)
      piece.animRotate.setValue(0)

      const loop = Animated.loop(
        Animated.sequence([
          Animated.delay(piece.delay),
          Animated.parallel([
            Animated.timing(piece.animY, {
              toValue: H + 40,
              duration: piece.duration,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            Animated.timing(piece.animX, {
              toValue: piece.driftX,
              duration: piece.duration,
              easing: Easing.inOut(Easing.sin),
              useNativeDriver: true,
            }),
            Animated.timing(piece.animRotate, {
              toValue: 1,
              duration: piece.duration * 0.6,
              easing: Easing.linear,
              useNativeDriver: true,
            }),
          ]),
          // Instant reset to top before next loop
          Animated.parallel([
            Animated.timing(piece.animY,       { toValue: -20, duration: 0, useNativeDriver: true }),
            Animated.timing(piece.animX,       { toValue: 0,   duration: 0, useNativeDriver: true }),
            Animated.timing(piece.animRotate,  { toValue: 0,   duration: 0, useNativeDriver: true }),
            Animated.timing(piece.animOpacity, { toValue: 1,   duration: 0, useNativeDriver: true }),
          ]),
        ])
      )

      loop.start()
      loopRefs.current.push(loop)
    })
  }

  function stopGradually() {
    // Stop all loops first
    loopRefs.current.forEach(a => a.stop())
    loopRefs.current = []

    // Each piece fades out staggered — giving a gradual wind-down feel
    pieces.forEach((piece, i) => {
      const stagger = (i / pieces.length) * 2000 // spread over 2 seconds
      Animated.timing(piece.animOpacity, {
        toValue: 0,
        duration: 1000,
        delay: stagger,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start(({ finished }) => {
        // Once last piece fades, fully unmount
        if (finished && i === pieces.length - 1) {
          setRendered(false)
          hasBeenActive.current = false
        }
      })
    })
  }

  if (!rendered) return null

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {pieces.map(piece => {
        const rotate = piece.animRotate.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        })
        return (
          <Animated.View
            key={piece.id}
            style={[
              styles.piece,
              {
                left: piece.x,
                width: piece.size,
                height: piece.size * 1.6,
                backgroundColor: piece.color,
                opacity: piece.animOpacity,
                transform: [
                  { translateY: piece.animY },
                  { translateX: piece.animX },
                  { rotate },
                ],
              },
            ]}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  piece: {
    position: 'absolute',
    top: 0,
    borderRadius: 2,
  },
})
