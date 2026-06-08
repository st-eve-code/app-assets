import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { ImageBackground } from 'expo-image'
import Slots from './components/slots'


export default function play() {
  return (
    <ImageBackground
         source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/8ball/assets/cover.png' }}
         style={styles.background}
         contentFit="cover"
       >
        <Slots />
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    // FIX 5: removed useless transform: rotate(360deg)
    justifyContent: 'center',
    alignItems: 'center',
  },
})