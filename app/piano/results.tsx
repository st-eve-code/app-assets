import React, { useState } from 'react'
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import Confetti from './components/confetti'
import DailyGift from './components/dailygift'
import Header from './components/header'
import MatchRewards from './components/matchrewards'
import MusicCardList from './components/music'
import Stars from './components/stars'
import TabMenu from './components/tabmenu'

// Set to true when a match has just finished
const isMatchDone = true

const Loserstars = () => {
    const images = [
        { id: 1, image: { uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/piano/assets/losestar.png' }, size: 70 },
        { id: 2, image: { uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/piano/assets/losestar.png' }, size: 120 },
        { id: 3, image: { uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/piano/assets/losestar.png' }, size:70 },
    ]
  return (
    <View style={{ justifyContent:"center", alignItems:"center", marginTop: -12, flexDirection:"row", gap: 12 }}>
      {images.map((e) => (
        <Image key={e.id} source={e.image} style={{ width: e.size, height: e.size }} />
      ))}
    </View>
  )
}

export default function results() {
  const [isfinished, setisfinished] = useState(false)
  const [confettiActive, setConfettiActive] = useState(isMatchDone)
  return (
    <View>
      {
        isfinished ? 
           (
            <ImageBackground
              source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/piano/assets/bgcover.png' }}
              style={{ flex: 1, width: '100%', height: '100%' }}
              resizeMode='cover'
            >
              {/* Scrollable content */}
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                bounces={true}
              >
                {/* Header */}
                {/* <View style={{ paddingHorizontal: 14 }}>
                  <Header />
                </View>
         */}
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
                      source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/piano/assets/banner.png' }}
                      style={styles.bannerImage}
                      resizeMode="contain"
                    />
                    <Text style={styles.bannerText}>Best Score</Text>
                  </View>
                </View>
        
                {/* Match rewards — visible when match is done, fades out after 7s */}
                
        
              </ScrollView>
        
              
        
              {/* Confetti — stops exactly when matchrewards finishes fading */}
              <Confetti isActive={confettiActive} />
            </ImageBackground>
          ) : 
          (
            <ImageBackground
              source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/piano/assets/bgcover.png' }}
              style={{ flex: 1, width: '100%', height: '100%' }}
              resizeMode='cover'
            >
              {/* Scrollable content */}
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                bounces={true}
              >
                {/* Header */}
                {/* <View style={{ paddingHorizontal: 14 }}>
                  <Header />
                </View> */}
        
                {/* Music discs - horizontal scroll */}
                <MusicCardList />
{/*         
                <Text style={{
                  fontSize: 28,
                  fontWeight: "900",
                  color: "white",
                  letterSpacing: 2,
                  textAlign:"center"
                }}>You Lose</Text> */}


                {/* Stars section — gift floats on top absolutely */}
                <View style={{ position: 'relative' }}>
                  <Loserstars />
                  <DailyGift />
                </View>
               
                {/* Score section */}
                <View style={styles.scoreSection}>
                  <Text style={styles.scoreNumber}>-4,250</Text>
                  <View style={styles.bannerWrapper}>
                    <Image
                      source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/piano/assets/banner.png' }}
                      style={styles.bannerImage}
                      resizeMode="contain"
                    />
                    <Text style={styles.bannerText}>You Lose</Text>
                  </View>
                </View>
        
                {/* Match rewards — visible when match is done, fades out after 7s */}
                
        
              </ScrollView>
        
             
        
              
            </ImageBackground>
          )
      }
    </View>
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
            marginTop: 2,
            paddingHorizontal: 16,
            top: -24
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
            top: -23
          },
          bannerImage: {
            width: 1900,
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
            top:50
          },
        })