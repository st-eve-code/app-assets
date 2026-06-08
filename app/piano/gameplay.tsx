import { View, Text } from 'react-native'
import React from 'react'
import Btn from './components/btn'
import { ImageBackground } from 'react-native'

export default function gameplay() {
  return (
    <ImageBackground
             source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/piano/assets/bgcover.png' }}
             style={{ flex: 1, width: '100%', height: '100%', paddingVertical:12 }}
             resizeMode='cover'
        >
      <Btn route = "/piano/home" text="Cancel" />
    </ImageBackground>
  )
}