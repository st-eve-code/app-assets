import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { ImageBackground, Image } from 'expo-image'
import * as ScreenOrientation from 'expo-screen-orientation'
import { router } from 'expo-router'

export default function AboutGame() {

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

          {/* About text box */}
          <View style={styles.policiesContainer}>
            <Text style={styles.title}></Text>
            <ScrollView
              style={styles.scrollArea}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={styles.scrollContent}
            >
              <Text style={styles.title}>About the Game</Text>

              <Text style={styles.sectionTitle}>What is 8 Ball Pool?</Text>
              <Text style={styles.bodyText}>
                8 Ball Pool is a competitive multiplayer billiards game where two players face off on a virtual pool table. Your goal is to pocket all your assigned balls — either solids or stripes — and then sink the 8 ball to win the match.
              </Text>

              <Text style={styles.sectionTitle}>How to Play</Text>
              <Text style={styles.bodyText}>
                At the start of each match, one player breaks the rack. The first ball pocketed determines which group each player owns — solids (1–7) or stripes (9–15). Take turns potting your balls, then finish by sinking the 8 ball in a called pocket to claim victory.
              </Text>

              <Text style={styles.sectionTitle}>Stakes & Winning</Text>
              <Text style={styles.bodyText}>
                Before each match, both players agree on a coin stake. The winner takes the full pot. Play smart, aim carefully, and manage your coins wisely to climb the ranks and unlock better cues and tables.
              </Text>

              <Text style={styles.sectionTitle}>Turn Timer</Text>
              <Text style={styles.bodyText}>
                Each player has a limited time per shot. If the timer runs out before you shoot, your turn passes to your opponent. Stay focused and plan your shots quickly to keep the pressure on.
              </Text>

              <Text style={styles.sectionTitle}>Ranking System</Text>
              <Text style={styles.bodyText}>
                Your rank reflects your skill and experience. Win matches to earn rank points and rise through the tiers. Higher ranks unlock exclusive tables, cues, and higher-stakes rooms for bigger rewards.
              </Text>

            </ScrollView>
          </View>

          {/* Close button */}
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
    alignItems: 'center',
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
    maxHeight: 260,
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