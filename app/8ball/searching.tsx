import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native'
import { ImageBackground, Image } from 'expo-image'
import { useRouter } from 'expo-router'
import * as ScreenOrientation from 'expo-screen-orientation'

export default function Searching() {
  const router = useRouter()
  const [dots, setDots] = useState('')

  const ballRotate = useRef(new Animated.Value(0)).current
  const ballFloat = useRef(new Animated.Value(0)).current
  const ring1Scale = useRef(new Animated.Value(0.4)).current
  const ring1Opacity = useRef(new Animated.Value(0.8)).current
  const ring2Scale = useRef(new Animated.Value(0.4)).current
  const ring2Opacity = useRef(new Animated.Value(0.8)).current
  const ring3Scale = useRef(new Animated.Value(0.4)).current
  const ring3Opacity = useRef(new Animated.Value(0.8)).current
  const textFade = useRef(new Animated.Value(0)).current
  const overlayFade = useRef(new Animated.Value(0)).current

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
    return () => { ScreenOrientation.unlockAsync() }
  }, [])

  useEffect(() => {
    Animated.loop(
      Animated.timing(ballRotate, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()
  }, [])

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(ballFloat, {
          toValue: -14,
          duration: 900,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(ballFloat, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start()
  }, [])

  useEffect(() => {
    const ripple = (scale: Animated.Value, opacity: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.parallel([
            Animated.timing(scale, {
              toValue: 1,
              duration: 1800,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: 1800,
              easing: Easing.out(Easing.ease),
              useNativeDriver: true,
            }),
          ]),
          Animated.parallel([
            Animated.timing(scale, { toValue: 0.4, duration: 0, useNativeDriver: true }),
            Animated.timing(opacity, { toValue: 0.8, duration: 0, useNativeDriver: true }),
          ]),
        ])
      )
    }

    ripple(ring1Scale, ring1Opacity, 0).start()
    ripple(ring2Scale, ring2Opacity, 600).start()
    ripple(ring3Scale, ring3Opacity, 1200).start()
  }, [])

  useEffect(() => {
    Animated.parallel([
      Animated.timing(textFade, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(overlayFade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // ✅ Updated to 7 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('./components/found')
    }, 7000)
    return () => clearTimeout(timeout)
  }, [])

  const spin = ballRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  return (
    <ImageBackground
      source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/8ball/assets/gameplay.png' }}
      style={styles.background}
      contentFit="cover"
    >
      <Animated.View style={[styles.overlay, { opacity: overlayFade }]} />

      <Animated.View style={[styles.content, { opacity: textFade }]}>

        <View style={styles.ballContainer}>
          <Animated.View style={[styles.ring, { transform: [{ scale: ring3Scale }], opacity: ring3Opacity }]} />
          <Animated.View style={[styles.ring, { transform: [{ scale: ring2Scale }], opacity: ring2Opacity }]} />
          <Animated.View style={[styles.ring, { transform: [{ scale: ring1Scale }], opacity: ring1Opacity }]} />

          <Animated.View style={[styles.ballWrapper, { transform: [{ rotate: spin }, { translateY: ballFloat }] }]}>
            <Image
              source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/8ball/assets/8ball.png' }}
              style={styles.ball}
              contentFit="contain"
            />
          </Animated.View>
        </View>

        <View style={styles.textBlock}>
          <Text style={styles.title}>Finding opponent{dots}</Text>
          <Text style={styles.subtitle}>Matchmaking in progress</Text>
        </View>

        {/* ✅ Cancel button */}
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => router.push('./stake')}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>

      </Animated.View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  ballContainer: {
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  ballWrapper: {
    width: 110,
    height: 110,
    zIndex: 1,
  },
  ball: {
    width: '100%',
    height: '100%',
  },
  textBlock: {
    alignItems: 'center',
    gap: 6,
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.4,
    minWidth: 280,
    textAlign: 'center',
  },
  subtitle: {
    color: 'rgba(255,255,255,0.55)',
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  // ✅ Cancel button styles
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  cancelText: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 15,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
})