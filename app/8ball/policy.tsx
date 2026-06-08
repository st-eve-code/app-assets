import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { ImageBackground, Image } from 'expo-image'
import * as ScreenOrientation from 'expo-screen-orientation'
import { router } from 'expo-router'

export default function Policies() {

  useEffect(() => {
    async function lockOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      )
    }
    lockOrientation()
    return () => { ScreenOrientation.unlockAsync() }
  }, [])

  return (
    <ImageBackground
      source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/8ball/assets/gameplay.png' }}
      style={styles.background}
      contentFit="cover"
    >
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/8ball/assets/coverboard2.png' }}
          contentFit="fill"
          style={{ width: '100%', height: '100%' }}
        />
        <View style={styles.overlay}>

          {/* Policies text box */}
          <View style={styles.policiesContainer}>
            <Text style={styles.title}></Text>
            <ScrollView
              style={styles.scrollArea}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.scrollContent}
            >
              <Text style={styles.title}>Terms & Policies</Text>
              <Text style={styles.sectionTitle}>1. General Rules</Text>
              <Text style={styles.bodyText}>
                By accessing and playing this game, you agree to abide by all rules and regulations set forth by the platform. Any violation of these terms may result in suspension or permanent ban from the platform.
              </Text>

              <Text style={styles.sectionTitle}>2. Fair Play</Text>
              <Text style={styles.bodyText}>
                Players are expected to compete fairly at all times. The use of cheats, exploits, bots, or any third-party software to gain an unfair advantage is strictly prohibited and will result in immediate account termination.
              </Text>

              <Text style={styles.sectionTitle}>3. Stakes & Coins</Text>
              <Text style={styles.bodyText}>
                All in-game coins and stakes are virtual currency with no real monetary value. Coins cannot be exchanged for real money or transferred between accounts. The platform reserves the right to modify coin values at any time.
              </Text>

              <Text style={styles.sectionTitle}>4. Privacy</Text>
              <Text style={styles.bodyText}>
                We collect only the data necessary to provide the gaming experience. Your personal information will never be sold to third parties. By playing, you consent to the collection of anonymized gameplay data for improvement purposes.
              </Text>

              <Text style={styles.sectionTitle}>5. Account Responsibility</Text>
              <Text style={styles.bodyText}>
                You are solely responsible for maintaining the security of your account credentials. Any activity carried out under your account is your responsibility. Report any unauthorized access immediately.
              </Text>
            </ScrollView>
          </View>

          {/* Close button — pinned to bottom */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.push('/8ball/home')}
          >
            <Image
              source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/8ball/assets/ball1.png' }}
              contentFit="fill"
              style={{ width: '100%', height: '100%' }}
            />
          </TouchableOpacity>

        </View>
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
  card: {
    width: 700,
    height: 350,
    paddingLeft: 23,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 28,
    left: 60,
    right: 60,
    bottom: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  policiesContainer: {
    width: '100%',
    flex: 1,
    gap: 6,
    marginBottom: 6,
    paddingHorizontal: 12,
    alignItems: 'center',  // ✅ centres the scroll area horizontally
  },
  title: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 11,
  },
  scrollArea: {
    width: '100%',
    maxHeight: 250,        // ✅ pulled up by capping the height
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  scrollContent: {
    gap: 10,
    padding: 14,
    paddingRight: 16,
  },
  sectionTitle: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  bodyText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    lineHeight: 20,
    fontWeight: '400',
  },
  closeButton: {
    width: 55,
    height: 55,
    alignSelf: 'center',
    marginBottom: -12,
  },
})