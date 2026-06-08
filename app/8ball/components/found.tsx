import React, { useEffect, useRef } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native'
import { ImageBackground, Image } from 'expo-image'
import { useRouter } from 'expo-router'
import * as ScreenOrientation from 'expo-screen-orientation'

// ─── placeholder data — replace with real API data later ───
const CURRENT_USER = {
  name: 'Gordon Zack',
  rank: 17,
  stake: 2000,
  avatar: { uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/8ball/assets/8ball.png' },
}

const OPPONENT = {
  name: 'Brunno Mark',
  rank: 17,
  stake: 2000,
  avatar: { uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/8ball/assets/8ball.png' },
}
// ────────────────────────────────────────────────────────────

type PlayerCardProps = {
  name: string
  rank: number
  stake: number
  avatar: { uri: string }
  slideAnim: Animated.Value
  fadeAnim: Animated.Value
  direction: 'left' | 'right'
}

function PlayerCard({ name, rank, stake, avatar, slideAnim, fadeAnim, direction }: PlayerCardProps) {
  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [direction === 'left' ? -120 : 120, 0],
  })

  return (
    <Animated.View style={[
      styles.playerWrapper,
      { opacity: fadeAnim, transform: [{ translateX }] }
    ]}>
      {/* Rank badge */}
      <View style={styles.rankBadge}>
        <Text style={styles.rankText}>★ {rank}</Text>
      </View>

      {/* Avatar with frame */}
      <View style={styles.avatarContainer}>
        <Image source={avatar} style={styles.avatar} contentFit="cover" />
        <Image
          source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/8ball/assets/frame.png' }}
          style={styles.frame}
          contentFit="fill"
        />
      </View>

      {/* Player name */}
      <Text style={styles.playerName}>{name}</Text>

      {/* Stake */}
      <View style={styles.stakeRow}>
        <Image
          source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/8ball/assets/coin.png' }}
          style={styles.coinIcon}
          contentFit="contain"
        />
        <Text style={styles.stakeText}>{stake.toLocaleString()}</Text>
      </View>
    </Animated.View>
  )
}

export default function Found() {
  const router = useRouter()

  const leftSlide = useRef(new Animated.Value(0)).current
  const leftFade = useRef(new Animated.Value(0)).current
  const rightSlide = useRef(new Animated.Value(0)).current
  const rightFade = useRef(new Animated.Value(0)).current
  const vsScale = useRef(new Animated.Value(0)).current
  const vsFade = useRef(new Animated.Value(0)).current
  const vsRotate = useRef(new Animated.Value(0)).current

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
    return () => { ScreenOrientation.unlockAsync() }
  }, [])

  useEffect(() => {
    // Players slide in first
    Animated.parallel([
      Animated.timing(leftSlide, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(leftFade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(rightSlide, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.timing(rightFade, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // VS pops in after players appear
      Animated.parallel([
        Animated.spring(vsScale, {
          toValue: 1,
          friction: 4,
          tension: 120,
          useNativeDriver: true,
        }),
        Animated.timing(vsFade, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(vsRotate, {
          toValue: 1,
          duration: 500,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start()
    })
  }, [])

  // Navigate to play after 7 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/8ball/play')
    }, 7000)
    return () => clearTimeout(timeout)
  }, [])

  const vsSpinInterpolate = vsRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['-15deg', '0deg'],
  })

  return (
    <ImageBackground
      source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/8ball/assets/cover.png' }}
      style={styles.background}
      contentFit="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.content}>

        <PlayerCard
          {...CURRENT_USER}
          slideAnim={leftSlide}
          fadeAnim={leftFade}
          direction="left"
        />

        <Animated.View style={[
          styles.vsWrapper,
          {
            opacity: vsFade,
            transform: [{ scale: vsScale }, { rotate: vsSpinInterpolate }]
          }
        ]}>
          <Image
            source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/8ball/assets/vs.png' }}
            style={styles.vsImage}
            contentFit="contain"
          />
        </Animated.View>

        <PlayerCard
          {...OPPONENT}
          slideAnim={rightSlide}
          fadeAnim={rightFade}
          direction="right"
        />

      </View>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  playerWrapper: {
    alignItems: 'center',
    gap: 10,
  },
  rankBadge: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  rankText: {
    color: '#FFD700',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  avatarContainer: {
    width: 130,
    height: 130,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 8,
  },
  frame: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  playerName: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.4,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  stakeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    gap: 8,
  },
  coinIcon: {
    width: 24,
    height: 24,
  },
  stakeText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '700',
  },
  vsWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  vsImage: {
    width: 100,
    height: 100,
  },
})