import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useRouter } from 'expo-router'

export default function SearchingScreen() {
  const router = useRouter()

  const [seconds, setSeconds] = useState(7)

  // ================= ANIMATIONS =================

  const pulse1 = useRef(new Animated.Value(0.4)).current
  const pulse2 = useRef(new Animated.Value(0.4)).current
  const pulse3 = useRef(new Animated.Value(0.4)).current

  const scaleAnim = useRef(new Animated.Value(1)).current

  // ================= TIMER =================

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval)

          setTimeout(() => {
            router.replace('/piano/gameplay')
          }, 400)

          return 0
        }

        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // ================= DOT ANIMATION =================

  useEffect(() => {
    const animateDot = (
      animatedValue: Animated.Value,
      delay: number
    ) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),

          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 650,
            useNativeDriver: true,
          }),

          Animated.timing(animatedValue, {
            toValue: 0.35,
            duration: 650,
            useNativeDriver: true,
          }),
        ])
      ).start()
    }

    animateDot(pulse1, 0)
    animateDot(pulse2, 220)
    animateDot(pulse3, 440)

    // center pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.06,
          duration: 1200,
          useNativeDriver: true,
        }),

        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [])

  return (
    <ImageBackground
      source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/piano/assets/bgcover.png' }}
      style={styles.container}
      resizeMode="cover"
    >
      {/* ================= COIN OVERLAYS ================= */}

      <Image
        source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/piano/assets/coin.png' }}
        style={styles.coinTopLeft}
      />

      <Image
        source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/piano/assets/coin.png' }}
        style={styles.coinTopRight}
      />

      <Image
        source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/piano/assets/coin.png' }}
        style={styles.coinBottomLeft}
      />

      <Image
        source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/piano/assets/coin.png' }}
        style={styles.coinBottomRight}
      />

      {/* ================= MAIN CONTENT ================= */}

      <View style={styles.content}>
        {/* SEARCH ORB */}

        <Animated.View
          style={[
            styles.searchCircleOuter,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <View style={styles.searchCircleMiddle}>
            <View style={styles.searchCircleInner}>
              {/* GAME ICON */}

              <Image
                source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/piano/assets/disc.png' }}
                style={styles.centerGameIcon}
                resizeMode="contain"
              />
            </View>
          </View>
        </Animated.View>

        {/* DOTS */}

        <View style={styles.dotsRow}>
          <Animated.View
            style={[
              styles.dot,
              {
                opacity: pulse1,
                transform: [{ scale: pulse1 }],
              },
            ]}
          />

          <Animated.View
            style={[
              styles.dot,
              {
                opacity: pulse2,
                transform: [{ scale: pulse2 }],
              },
            ]}
          />

          <Animated.View
            style={[
              styles.dot,
              {
                opacity: pulse3,
                transform: [{ scale: pulse3 }],
              },
            ]}
          />
        </View>

        {/* BOTTOM TEXT */}

        <Text style={styles.searchingText}>
          Searching Players
        </Text>

        {/* CANCEL BUTTON */}

        <TouchableOpacity
          activeOpacity={0.88}
          style={styles.cancelButtonOuter}
          onPress={() => router.replace('/piano/home')}
        >
          <View style={styles.cancelButtonInner}>
            <Text style={styles.cancelButtonText}>
              Cancel
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  // ================= CONTAINER =================

  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 26,
  },

  // ================= SEARCH ORB =================

  searchCircleOuter: {
    width: 255,
    height: 255,
    borderRadius: 999,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(134,92,255,0.08)',

    borderWidth: 1.5,
    borderColor: 'rgba(180,150,255,0.12)',
  },

  searchCircleMiddle: {
    width: 205,
    height: 205,
    borderRadius: 999,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(104,76,180,0.12)',

    borderWidth: 1.5,
    borderColor: 'rgba(188,166,255,0.16)',
  },

  searchCircleInner: {
    width: 165,
    height: 165,
    borderRadius: 999,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: 'rgba(88,60,160,0.22)',

    borderWidth: 1.5,
    borderColor: 'rgba(220,210,255,0.16)',
  },

  centerGameIcon: {
    width: 92,
    height: 92,
  },

  // ================= DOTS =================

  dotsRow: {
    flexDirection: 'row',
    gap: 12,

    marginTop: 38,
  },

  dot: {
    width: 14,
    height: 14,
    borderRadius: 100,

    backgroundColor: '#C8A8FF',
  },

  // ================= TEXT =================

  searchingText: {
    marginTop: 24,

    color: '#E8DEFF',
    fontSize: 17,
    fontWeight: '700',

    letterSpacing: 0.5,
  },

  // ================= BUTTON =================

  cancelButtonOuter: {
    marginTop: 48,

    borderRadius: 28,
    padding: 2.5,

    backgroundColor: 'rgba(186,155,255,0.3)',

    shadowColor: '#8F5CFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.24,
    shadowRadius: 16,

    elevation: 10,
  },

  cancelButtonInner: {
    minWidth: 185,

    paddingVertical: 17,
    paddingHorizontal: 30,

    borderRadius: 26,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#4D367F',
  },

  cancelButtonText: {
    color: '#F4EEFF',
    fontSize: 17,
    fontWeight: '800',

    letterSpacing: 0.6,
  },

  // ================= COIN OVERLAYS =================

  coinTopLeft: {
    position: 'absolute',

    width: 120,
    height: 120,

    top: 70,
    left: -30,

    opacity: 0.08,

    transform: [{ rotate: '-20deg' }],
  },

  coinTopRight: {
    position: 'absolute',

    width: 90,
    height: 90,

    top: 150,
    right: -15,

    opacity: 0.07,

    transform: [{ rotate: '18deg' }],
  },

  coinBottomLeft: {
    position: 'absolute',

    width: 100,
    height: 100,

    bottom: 170,
    left: -20,

    opacity: 0.07,

    transform: [{ rotate: '20deg' }],
  },

  coinBottomRight: {
    position: 'absolute',

    width: 140,
    height: 140,

    bottom: 40,
    right: -40,

    opacity: 0.08,

    transform: [{ rotate: '-15deg' }],
  },
})