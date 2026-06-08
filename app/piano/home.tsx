import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Image, ImageBackground } from 'expo-image'
import Confetti from './components/confetti'
import DailyGift from './components/dailygift'
import Header from './components/header'
import MatchRewards from './components/matchrewards'
import MusicCardList from './components/music'
import Stars from './components/stars'
import TabMenu from './components/tabmenu'

// Set to true when a match has just finished
const isMatchDone = true

export default function home() {
  // confettiActive mirrors matchrewards visibility
  // starts true with isMatchDone, flips false when matchrewards calls onDone
  const [confettiActive, setConfettiActive] = useState(isMatchDone)
  return (
    <ImageBackground
      source={{ uri: 'https://raw.githubusercontent.com/st-eve-code/app-assets/main/app/piano/assets/bgcover.png' }}
      style={{ flex: 1, width: '100%', height: '100%' }}
      contentFit='cover'
    >
      {/* Scrollable content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 14 }}>
          <Header />
        </View>

        {/* Music discs - horizontal scroll */}
        <MusicCardList />

        {/* Stars section — gift floats on top absolutely */}
        <View style={{ position: 'relative' }}>
          <Stars />
          <DailyGift />
        </View>
        <MatchRewards
          isMatchDone={isMatchDone}
          onDone={() => setConfettiActive(false)}
        />
        {/* Score section */}
        <View style={styles.scoreSection}>
          <Text style={styles.scoreNumber}>48,250</Text>
          <View style={styles.bannerWrapper}>
            <Image
              source={{ uri: 'https://raw.githubusercontent.com/st-eve-code/app-assets/main/app/piano/assets/banner.png' }}
              style={styles.bannerImage}
              contentFit="contain"
            />
            <Text style={styles.bannerText}>New Score</Text>
          </View>
        </View>

        {/* Match rewards — visible when match is done, fades out after 7s */}
        

      </ScrollView>

      {/* Fixed footer tab bar */}
      <View style={styles.footer}>
        <TabMenu />
      </View>

      {/* Confetti — stops exactly when matchrewards finishes fading */}
      <Confetti isActive={confettiActive} />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 25,
    paddingBottom: 100,
    gap: 12,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 13,
  },
  // Score section
  scoreSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -12,
    paddingHorizontal: 16,
    gap: 12,
  },
  scoreNumber: {
    fontSize: 72,
    fontWeight: '900',
    color: '#fff',
    textShadowColor: 'rgba(192,132,252,0.8)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
    letterSpacing: 2,
  },
  bannerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -32
  },
  bannerImage: {
    width: 1700,
    height: 140,
  },
  bannerText: {
    position: 'absolute',
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 1,
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
})
