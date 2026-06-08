import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';

// ─────────────────────────────────────────────────────────────
//  BOARD CONTROLS — tweak these to change the look & feel
// ─────────────────────────────────────────────────────────────
const ROWS = 4;          // Number of rows        (ROWS × COLS = total circles)
const COLS = 4;          // Number of columns     (4 × 4 = 16 circles)
const BOARD_SIZE = 150;  // Board width & height in px (always a square)
const GAP = 8;           // Gap between each circle in px

// ─────────────────────────────────────────────────────────────
//  ANIMATION CONTROLS — tweak these to change timing
// ─────────────────────────────────────────────────────────────
const DROP_STAGGER = 300;    // ms delay between each disc starting to drop
const DROP_DURATION = 700;   // ms a single disc takes to fall into place
const SETTLE_DELAY = 800;    // ms pause after all discs have fully landed
const PULSE_DURATION = 500;  // ms for one in/out beat of the win flash
const PULSE_HOLD = 2500;     // ms to hold the win flash before routing

// ─────────────────────────────────────────────────────────────
//  ROUTING — total time before navigating to home screen
//  = SETTLE_DELAY + PULSE_HOLD  (≈ 3s after last disc lands)
// ─────────────────────────────────────────────────────────────
const ROUTE_AFTER_MS = 9000; // ms from mount before routing to home

// ─────────────────────────────────────────────────────────────
//  DERIVED — calculated from controls above, do not edit
// ─────────────────────────────────────────────────────────────
const CELL_SIZE = (BOARD_SIZE - GAP * (COLS + 1)) / COLS;

// Alternating red/yellow checkerboard pattern
const PATTERN: string[][] = [
  ['r', 'y', 'r', 'y'],
  ['y', 'r', 'y', 'r'],
  ['r', 'y', 'r', 'y'],
  ['y', 'r', 'y', 'r'],
];

// The 4 cells that form the diagonal win highlight
const WIN_CELLS: number[][] = [
  [0, 0], [1, 1], [2, 2], [3, 3],
];

export default function Connect4Loader() {
  const router = useRouter();

  // One Animated.Value per circle (0 = off-screen, 1 = landed)
  const anims = useRef(
    Array.from({ length: ROWS * COLS }, () => new Animated.Value(0))
  ).current;

  // One Animated.Value per win cell (0 = dim, 1 = bright flash)
  const pulseAnims = useRef(
    Array.from({ length: WIN_CELLS.length }, () => new Animated.Value(0))
  ).current;

  // Keep references so we can stop loops on unmount / reset
  const pulseLoops = useRef<Animated.CompositeAnimation[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // ── Helpers ──────────────────────────────────────────────
  /** Store a timer so we can clear it all on unmount */
  function addTimer(ms: number, fn: () => void) {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
    return id;
  }

  /** Stop all pulse loops and clear every pending timer */
  function cleanup() {
    pulseLoops.current.forEach(l => l.stop());
    pulseLoops.current = [];
    timers.current.forEach(id => clearTimeout(id));
    timers.current = [];
  }

  // ── Lifecycle ─────────────────────────────────────────────
  useEffect(() => {
    startDropAnimation();

    // Navigate to home after ROUTE_AFTER_MS from mount
    addTimer(ROUTE_AFTER_MS, () => {
      router.replace('/c4/home'); // ← change this path to match your home route
    });

    return () => cleanup();
  }, []);

  // ── Animation phases ──────────────────────────────────────

  /**
   * Phase 1 — Drop
   * Discs fall column by column, top-to-bottom within each column.
   * Each disc is staggered by DROP_STAGGER ms and takes DROP_DURATION ms to land.
   */
  function startDropAnimation() {
    cleanup();
    anims.forEach(a => a.setValue(0));
    pulseAnims.forEach(a => a.setValue(0));

    // Build drop order: column 0 top→bottom, then column 1, etc.
    const dropOrder: number[] = [];
    for (let c = 0; c < COLS; c++) {
      for (let r = 0; r < ROWS; r++) {
        dropOrder.push(r * COLS + c);
      }
    }

    // Create one staggered timing animation per disc
    const drops = dropOrder.map((idx, i) =>
      Animated.sequence([
        Animated.delay(i * DROP_STAGGER),
        Animated.timing(anims[idx], {
          toValue: 1,
          duration: DROP_DURATION,
          useNativeDriver: true, // translateY + opacity on native thread
        }),
      ])
    );

    // Run all drops in parallel; when done, wait then flash
    Animated.parallel(drops).start(() => {
      addTimer(SETTLE_DELAY, startWinFlash);
    });
  }

  /**
   * Phase 2 — Win flash
   * The 4 diagonal win cells pulse bright, staggered by 120ms each.
   * Loops continuously for PULSE_HOLD ms, then the route timer takes over.
   */
  function startWinFlash() {
    WIN_CELLS.forEach((_pos, i) => {
      addTimer(i * 120, () => {
        const loop = Animated.loop(
          Animated.sequence([
            // fade up to bright
            Animated.timing(pulseAnims[i], {
              toValue: 1,
              duration: PULSE_DURATION,
              useNativeDriver: false, // backgroundColor not supported on native driver
            }),
            // fade back to base colour
            Animated.timing(pulseAnims[i], {
              toValue: 0,
              duration: PULSE_DURATION,
              useNativeDriver: false,
            }),
          ])
        );
        pulseLoops.current.push(loop);
        loop.start();
      });
    });
  }

  // ── Render ────────────────────────────────────────────────
  return (
    <View style={styles.wrapper}>
      <View style={styles.board}>
        {Array.from({ length: ROWS }, (_, r) => (
          <View key={r} style={styles.row}>
            {Array.from({ length: COLS }, (_, c) => {
              const idx = r * COLS + c;

              // Colour for this cell from the checkerboard pattern
              const color = PATTERN[r % PATTERN.length][c % PATTERN[0].length];

              // Is this cell part of the win diagonal?
              const winIdx = WIN_CELLS.findIndex(
                ([wr, wc]) => wr === r && wc === c
              );
              const isPulse = winIdx !== -1;

              // Interpolate background between base and flash colour
              const bgColor = isPulse
                ? pulseAnims[winIdx].interpolate({
                    inputRange: [0, 1],
                    outputRange:
                      color === 'r'
                        ? ['#e8231a', '#ff7066'] // red  → bright red
                        : ['#f5c800', '#fff176'], // yellow → bright yellow
                  })
                : undefined;

              return (
                <View key={c} style={styles.cell}>
                  <Animated.View
                    style={[
                      styles.disc,
                      // Base disc colour
                      color === 'r' ? styles.red : styles.yellow,
                      // Override with animated pulse colour on win cells
                      isPulse && bgColor ? { backgroundColor: bgColor } : null,
                      {
                        // Drop: slide from far above down to resting position
                        transform: [
                          {
                            translateY: anims[idx].interpolate({
                              inputRange: [0, 1],
                              outputRange: [-(BOARD_SIZE * 2.5), 0],
                            }),
                          },
                        ],
                        // Fade in quickly once disc enters the cell
                        opacity: anims[idx].interpolate({
                          inputRange: [0, 0.15, 1],
                          outputRange: [0, 1, 1],
                        }),
                      },
                    ]}
                  />
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

// ─────────────────────────────────────────────────────────────
//  STYLES
// ─────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Outer square that acts as the board background
  wrapper: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1a3fcc',
    borderRadius: 14,
    // iOS shadow
    shadowColor: '#0e2a99',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    // Android shadow
    elevation: 8,
  },
  // Inner grid — centered column of rows
  board: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: GAP,
  },
  // Single horizontal row of cells
  row: {
    flexDirection: 'row',
    gap: GAP,
  },
  // Hole cut into the board (dark circle)
  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: CELL_SIZE / 2,
    backgroundColor: '#091880',
    overflow: 'hidden',
  },
  // The coloured disc that drops into a cell
  disc: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: CELL_SIZE / 2,
  },
  red: {
    backgroundColor: '#e8231a',
  },
  yellow: {
    backgroundColor: '#f5c800',
  },
});