import { ImageBackground } from 'expo-image'
import { useRouter } from 'expo-router'
import * as ScreenOrientation from 'expo-screen-orientation'
import React, { useEffect, useRef } from 'react'
import { Animated, Dimensions, Easing, StyleSheet, Text, View } from 'react-native'

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export default function Loading() {
  const router = useRouter()
  
  // Create animated values for 3 pool balls
  const ball1 = useRef(new Animated.Value(0)).current
  const ball2 = useRef(new Animated.Value(0)).current
  const ball3 = useRef(new Animated.Value(0)).current
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Lock to landscape
    async function lockOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      )
    }
    lockOrientation()

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()

    // Bouncing animation for ball 1
    Animated.loop(
      Animated.sequence([
        Animated.timing(ball1, {
          toValue: -30,
          duration: 400,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(ball1, {
          toValue: 0,
          duration: 400,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start()

    // Bouncing animation for ball 2 (delayed)
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(ball2, {
            toValue: -30,
            duration: 400,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(ball2, {
            toValue: 0,
            duration: 400,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
        ])
      ).start()
    }, 200)

    // Bouncing animation for ball 3 (more delayed)
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(ball3, {
            toValue: -30,
            duration: 400,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(ball3, {
            toValue: 0,
            duration: 400,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
        ])
      ).start()
    }, 400)

    // Navigate to home after 3 seconds
    const timer = setTimeout(() => {
      router.replace('/8ball/home')
    }, 3000)

    return () => {
      clearTimeout(timer)
      ScreenOrientation.unlockAsync()
    }
  }, [])

  return (
   
      <ImageBackground
        source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/8ball/assets/bg.png' }}
        style={styles.background}
        contentFit="cover"
      >
        <Animated.View style={[styles.contentContainer, { opacity: fadeAnim }]}>
          {/* Pool balls bouncing animation */}
          <View style={styles.ballsContainer}>
            {/* Ball 1 - Solid color (e.g., red) */}
            <Animated.View
              style={[
                styles.ball,
                styles.ball1,
                { transform: [{ translateY: ball1 }] },
              ]}
            />
            
            {/* Ball 2 - Solid color (e.g., yellow) */}
            <Animated.View
              style={[
                styles.ball,
                styles.ball2,
                { transform: [{ translateY: ball2 }] },
              ]}
            />
            
            {/* Ball 3 - 8 Ball (black) */}
            <Animated.View
              style={[
                styles.ball,
                styles.ball8,
                { transform: [{ translateY: ball3 }] },
              ]}
            >
              <View style={styles.eightBallCircle}>
                <Text style={{color: 'white', textAlign:"center", top:1, paddingVertical:2, fontWeight:"500"}}>
                  8
                </Text>
              </View>
            </Animated.View>
          </View>

          {/* Loading text */}
          <Animated.Text style={styles.loadingText}>
            Loading...
          </Animated.Text>
        </Animated.View>
      </ImageBackground>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
   
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ballsContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 30,
    top:320
  },
  ball: {
    width: 20,
    height: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  ball1: {
    backgroundColor: '#e74c3c', // Red ball
  },
  ball2: {
    backgroundColor: '#f1c40f', // Yellow ball
  },
  ball8: {
    backgroundColor: '#000', // Black 8 ball
    justifyContent: 'center',
    alignItems: 'center',
  },
  eightBallCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    paddingVertical:2,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  loadingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginTop:297
  },
})
