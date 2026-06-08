/**
 * Piano Tiles — Loading Screen (Purple + White)
 *
 * Background : pure white with a soft purple radial wash
 * Tile A     : rich purple gradient with glowing border frame + shimmer
 * Tile B     : deep purple gradient with orb-pendulum detail
 * Text       : deep violet (#4c1d95) — crisp and readable on white
 */

import { router } from 'expo-router'
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  View,
} from 'react-native'

const { width: SW, height: SH } = Dimensions.get('window')

const COLS    = 4
const COL_W   = SW / COLS
const MIN_GAP = 55
const MIN_H   = 150
const MAX_H   = 260
const MIN_SPD = 210
const MAX_SPD = 390

function rand(a: number, b: number) { return a + Math.random() * (b - a) }

type TileType = 'a' | 'b'

interface TileData {
  id:     number
  col:    number
  h:      number
  speed:  number
  type:   TileType
  animY:  Animated.Value
  yRef:   { current: number }
}

let _id = 0
function createTile(col: number, speed: number, y: number, h: number, type: TileType): TileData {
  const yRef  = { current: y }
  const animY = new Animated.Value(y)
  return { id: _id++, col, h, speed, type, animY, yRef }
}

// ─── Tile A: border-frame glow ─────────────────────────────────────────────
const TileA = React.memo(({ tile }: { tile: TileData }) => {
  const shimmer = useRef(new Animated.Value(0)).current
  useEffect(() => {
    const run = () => {
      shimmer.setValue(0)
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 900, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.delay(2600),
      ]).start(run)
    }
    run()
  }, [])

  const shimmerX = shimmer.interpolate({ inputRange: [0, 1], outputRange: [-80, COL_W + 40] })

  return (
    <Animated.View style={[
      styles.tile,
      styles.tileA,
      {
        left:      tile.col * COL_W + 5,
        width:     COL_W - 10,
        height:    tile.h,
        transform: [{ translateY: tile.animY }],
      },
    ]}>
      {/* inner border glow */}
      <View style={[StyleSheet.absoluteFill, styles.tileAInner]} pointerEvents="none" />
      {/* shimmer sweep */}
      <Animated.View
        style={[styles.shimmer, { transform: [{ translateX: shimmerX }] }]}
        pointerEvents="none"
      />
    </Animated.View>
  )
})

// ─── Tile B: orb pendulum ──────────────────────────────────────────────────
const TileB = React.memo(({ tile }: { tile: TileData }) => {
  const orbGlow = useRef(new Animated.Value(0)).current
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(orbGlow, { toValue: 1, duration: 2000, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(orbGlow, { toValue: 0, duration: 2200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start()
  }, [])

  const orbScale = orbGlow.interpolate({ inputRange: [0, 1], outputRange: [1, 1.25] })

  return (
    <Animated.View style={[
      styles.tile,
      styles.tileB,
      {
        left:      tile.col * COL_W + 5,
        width:     COL_W - 10,
        height:    tile.h,
        transform: [{ translateY: tile.animY }],
      },
    ]}>
      {/* orb dot */}
      <Animated.View style={[styles.orbDot, { transform: [{ scale: orbScale }] }]} />
      {/* connector line */}
      <View style={styles.orbLine} />
      {/* ring */}
      <Animated.View style={[styles.orbRing, { transform: [{ scale: orbScale.interpolate({ inputRange: [1, 1.25], outputRange: [1, 1.1] }) }] }]} />
    </Animated.View>
  )
})

// ─── Router ────────────────────────────────────────────────────────────────
const TileView = React.memo(({ tile }: { tile: TileData }) =>
  tile.type === 'a' ? <TileA tile={tile} /> : <TileB tile={tile} />
)

// ─── Piano Keys ────────────────────────────────────────────────────────────
const BLACK_KEY_OFFSETS = [1, 2, 4, 5, 6]
const KEY_W = 112 / 7

function PianoKeysIcon() {
  const [activeIdx, setActiveIdx] = React.useState(0)
  useEffect(() => {
    const id = setInterval(() => setActiveIdx(p => (p + 1) % 7), 280)
    return () => clearInterval(id)
  }, [])
  return (
    <View style={styles.keysWrap}>
      <View style={styles.whiteKeysRow}>
        {[0,1,2,3,4,5,6].map(i => (
          <View key={i} style={[styles.whiteKey, activeIdx === i && styles.whiteKeyLit]} />
        ))}
      </View>
      {BLACK_KEY_OFFSETS.map((pos, i) => (
        <View key={i} style={[styles.blackKey, { left: pos * KEY_W - 5.5 }]} />
      ))}
    </View>
  )
}

// ─── Progress bar ──────────────────────────────────────────────────────────
function ProgressBar() {
  const x = useRef(new Animated.Value(-190)).current
  useEffect(() => {
    const run = () => {
      x.setValue(-190)
      Animated.timing(x, {
        toValue: 190, duration: 2600,
        easing: Easing.inOut(Easing.ease), useNativeDriver: true,
      }).start(run)
    }
    run()
  }, [])
  return (
    <View style={styles.progressTrack}>
      <Animated.View style={[styles.progressFill, { transform: [{ translateX: x }] }]} />
    </View>
  )
}

// ─── Bouncing dots ─────────────────────────────────────────────────────────
function LoadingDots() {
  return (
    <View style={styles.dotsRow}>
      {[0,1,2].map(i => {
        const y = useRef(new Animated.Value(0)).current
        useEffect(() => {
          const run = () => {
            Animated.sequence([
              Animated.delay(i * 150),
              Animated.timing(y, { toValue: -6, duration: 280, easing: Easing.out(Easing.quad), useNativeDriver: true }),
              Animated.timing(y, { toValue:  0, duration: 280, easing: Easing.in(Easing.quad),  useNativeDriver: true }),
              Animated.delay(500),
            ]).start(run)
          }
          run()
        }, [])
        return <Animated.View key={i} style={[styles.dot, { transform: [{ translateY: y }] }]} />
      })}
    </View>
  )
}

// ─── Main ──────────────────────────────────────────────────────────────────
export default function LoadingScreen() {
  useEffect(() => {
  const timer = setTimeout(() => {
    router.replace('/piano/home')
  }, 7000)

  return () => clearTimeout(timer)
}, [])
  const laneNextType = useRef<TileType[]>(['a','b','a','b'])
  const laneSpeeds   = useMemo(() => Array.from({ length: COLS }, () => rand(MIN_SPD, MAX_SPD)), [])

  const [tiles, setTiles] = useState<TileData[]>(() => {
    const init: TileData[] = []
    for (let col = 0; col < COLS; col++) {
      let cursor = -rand(60, 200)
      for (let i = 0; i < 3; i++) {
        const h    = rand(MIN_H, MAX_H)
        const type = laneNextType.current[col]
        laneNextType.current[col] = type === 'a' ? 'b' : 'a'
        init.push(createTile(col, laneSpeeds[col], cursor, h, type))
        cursor -= (h + rand(MIN_GAP + 20, MIN_GAP + 100))
      }
    }
    return init
  })

  const tilesRef = useRef(tiles)
  tilesRef.current = tiles
  const frameRef = useRef<number | null>(null)
  const lastRef  = useRef<number | null>(null)

  const tick = useCallback((ts: number) => {
    if (lastRef.current === null) lastRef.current = ts
    const dt = Math.min((ts - lastRef.current) / 1000, 0.05)
    lastRef.current = ts

    const current  = tilesRef.current
    const toRemove = new Set<number>()
    const toAdd: TileData[] = []

    for (const t of current) {
      t.yRef.current += t.speed * dt
      t.animY.setValue(t.yRef.current)
      if (t.yRef.current > SH + 20) toRemove.add(t.id)
    }

    for (let col = 0; col < COLS; col++) {
      const lane = current.filter(t => t.col === col)
      if (!lane.length) continue
      const top     = lane.reduce((a, b) => a.yRef.current < b.yRef.current ? a : b)
      const newH    = rand(MIN_H, MAX_H)
      const newTop  = (top.yRef.current - MIN_GAP) - newH
      if (newTop < -newH) {
        const type = laneNextType.current[col]
        laneNextType.current[col] = type === 'a' ? 'b' : 'a'
        toAdd.push(createTile(col, laneSpeeds[col], newTop, newH, type))
      }
    }

    if (toRemove.size > 0 || toAdd.length > 0)
      setTiles(prev => [...prev.filter(t => !toRemove.has(t.id)), ...toAdd])

    frameRef.current = requestAnimationFrame(tick)
  }, [laneSpeeds])

  useEffect(() => {
    frameRef.current = requestAnimationFrame(tick)
    return () => { if (frameRef.current !== null) cancelAnimationFrame(frameRef.current) }
  }, [tick])

  const logoOpacity = useRef(new Animated.Value(0)).current
  const logoScale   = useRef(new Animated.Value(0.72)).current
  const loadOpacity = useRef(new Animated.Value(0)).current
  const loadY       = useRef(new Animated.Value(14)).current

  useEffect(() => {
    Animated.parallel([
      Animated.spring(logoOpacity, { toValue: 1, useNativeDriver: true }),
      Animated.spring(logoScale,   { toValue: 1, damping: 10, stiffness: 100, useNativeDriver: true }),
    ]).start()
    Animated.sequence([
      Animated.delay(400),
      Animated.parallel([
        Animated.spring(loadOpacity, { toValue: 1, useNativeDriver: true }),
        Animated.spring(loadY,       { toValue: 0, damping: 14, stiffness: 80, useNativeDriver: true }),
      ]),
    ]).start()
  }, [])

  return (
    <View style={styles.background}>
      {/* subtle purple column separators */}
      {[1,2,3].map(i => (
        <View key={i} style={[styles.colSep, { left: i * COL_W }]} pointerEvents="none" />
      ))}

      {/* tiles */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {tiles.map(t => <TileView key={t.id} tile={t} />)}
      </View>

      {/* edge fade so tiles vanish cleanly at top and bottom */}
      <View style={styles.edgeFadeTop}    pointerEvents="none" />
      <View style={styles.edgeFadeBottom} pointerEvents="none" />
      <View style={styles.edgeFadeLeft}   pointerEvents="none" />
      <View style={styles.edgeFadeRight}  pointerEvents="none" />

      {/* logo */}
      <Animated.View style={[
        styles.logoWrap,
        { opacity: logoOpacity, transform: [{ scale: logoScale }] },
      ]}>
        <PianoKeysIcon />
        {/*
          Swap in your logo:
          <Image source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/piano/assets/logo.png' }}
                 style={{ width: 169, height: 150 }} resizeMode="stretch" />
        */}
        <Text style={styles.gameTitle}>Piano Tiles</Text>
        <Text style={styles.subtitle}>TAP TO THE BEAT</Text>
      </Animated.View>

      {/* loading */}
      <Animated.View style={[
        styles.loadingSection,
        { opacity: loadOpacity, transform: [{ translateY: loadY }] },
      ]}>
        <ProgressBar />
        <View style={styles.loadingRow}>
          <Text style={styles.loadingLabel}>LOADING</Text>
          <LoadingDots />
        </View>
      </Animated.View>
    </View>
  )
}

// ─── Styles ────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  background: {
    flex: 1, width: '100%', height: '100%',
    backgroundColor: '#ffffff',
    overflow: 'hidden',
    justifyContent: 'center', alignItems: 'center',
  },
  colSep: {
    position: 'absolute', top: 0, bottom: 0, width: 1,
    backgroundColor: 'rgba(109,40,217,0.08)',
  },

  // ── Tile A (border frame) ──
  tile: { position: 'absolute', borderRadius: 18, overflow: 'hidden' },
  tileA: {
    backgroundColor: '#6d28d9',
    borderWidth: 1.5, borderColor: 'rgba(167,139,250,0.55)',
    shadowColor: '#6d28d9', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35, shadowRadius: 16, elevation: 10,
  },
  tileAInner: {
    borderRadius: 14, margin: 4,
    borderWidth: 1, borderColor: 'rgba(196,170,255,0.2)',
  },
  shimmer: {
    position: 'absolute', top: 0, bottom: 0, width: 40,
    backgroundColor: 'rgba(255,255,255,0.07)',
  },

  // ── Tile B (orb pendulum) ──
  tileB: {
    backgroundColor: '#5b21b6',
    borderWidth: 1.5, borderColor: 'rgba(139,92,246,0.45)',
    alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 14, paddingBottom: 16,
    shadowColor: '#4c1d95', shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4, shadowRadius: 16, elevation: 10,
  },
  orbDot: {
    width: 11, height: 11, borderRadius: 5.5,
    backgroundColor: '#c084fc',
    shadowColor: '#c084fc', shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9, shadowRadius: 8,
  },
  orbLine: {
    flex: 1, width: 1.5, marginVertical: 5,
    backgroundColor: 'rgba(196,170,255,0.5)',
  },
  orbRing: {
    width: 30, height: 30, borderRadius: 15,
    borderWidth: 2, borderColor: 'rgba(196,170,255,0.7)',
    shadowColor: '#c084fc', shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7, shadowRadius: 8,
  },

  // ── Edge fades ──
  edgeFadeTop: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 80,
    backgroundColor: 'rgba(255,255,255,0)',
    // Use a gradient mask on iOS via MaskedView, or just a white overlay:
    // For a simple approximation on both platforms:
    zIndex: 15,
    // react-native doesn't support gradient natively without a library —
    // swap this View for a LinearGradient from expo-linear-gradient:
    // <LinearGradient colors={['#fff','transparent']} style={...} />
  },
  edgeFadeBottom: {
    position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
    zIndex: 15,
  },
  edgeFadeLeft:  { position: 'absolute', top: 0, bottom: 0, left: 0,  width: 5, backgroundColor: 'rgba(255,255,255,0.9)', zIndex: 15 },
  edgeFadeRight: { position: 'absolute', top: 0, bottom: 0, right: 0, width: 5, backgroundColor: 'rgba(255,255,255,0.9)', zIndex: 15 },

  // ── Piano keys ──
  keysWrap:     { width: 112, height: 64, position: 'relative', marginBottom: 22 },
  whiteKeysRow: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '100%', flexDirection: 'row', gap: 2.5 },
  whiteKey: {
    flex: 1, height: '100%',
    backgroundColor: '#ede9fe',
    borderRadius: 6,
    borderWidth: 1, borderColor: 'rgba(109,40,217,0.18)',
  },
  whiteKeyLit: {
    backgroundColor: '#8b5cf6',
    shadowColor: '#8b5cf6', shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8, shadowRadius: 8,
  },
  blackKey: {
    position: 'absolute', top: 0, width: 11, height: '60%',
    backgroundColor: '#1e1b2e',
    borderRadius: 4, borderWidth: 1, borderColor: 'rgba(109,40,217,0.2)', zIndex: 2,
  },

  // ── Text ── deep violet on white = always readable ──
  logoWrap: { alignItems: 'center', marginBottom: 56, zIndex: 20 },
  gameTitle: {
    fontFamily: 'System', fontSize: 30, fontWeight: '900',
    color: '#4c1d95',          // deep violet — high contrast on white
    letterSpacing: 2, textAlign: 'center',
    textShadowColor: 'rgba(109,40,217,0.15)',
    textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 8,
  },
  subtitle: {
    fontFamily: 'System', fontSize: 10, fontWeight: '600',
    color: 'rgba(109,40,217,0.42)',   // mid violet — readable but soft
    letterSpacing: 6, marginTop: 9,
  },

  // ── Loading ──
  loadingSection: { alignItems: 'center', gap: 13, zIndex: 20 },
  progressTrack: {
    width: 190, height: 4,
    backgroundColor: 'rgba(109,40,217,0.1)', borderRadius: 99, overflow: 'hidden',
  },
  progressFill: {
    width: 120, height: '100%', borderRadius: 99,
    backgroundColor: '#8b5cf6',
    shadowColor: '#8b5cf6', shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6, shadowRadius: 6,
  },
  loadingRow:   { flexDirection: 'row', alignItems: 'center', gap: 8 },
  loadingLabel: {
    fontFamily: 'System', fontSize: 9, fontWeight: '700',
    color: 'rgba(109,40,217,0.38)', letterSpacing: 5,
  },
  dotsRow: { flexDirection: 'row', gap: 4, alignItems: 'center' },
  dot: { width: 5, height: 5, borderRadius: 2.5, backgroundColor: 'rgba(139,92,246,0.65)' },
})
