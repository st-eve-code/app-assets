import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Image, ImageBackground } from 'expo-image'
import Connect4Loader from './components/loading'

export default function index() {
  return (
    <ImageBackground
    source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/bg.png' }}
    contentFit='cover'
    style={styles.background}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/loadingtext.png' }}
          style={{ width: 280, height: 80, marginBottom: 20, top:-20 }}
          contentFit="contain"
        />
        <Connect4Loader />
      </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
})