import { Image } from 'expo-image'
import React from 'react'
import { View } from 'react-native'

export default function Stars() {
    const images = [
        { id: 1, image: { uri: 'https://raw.githubusercontent.com/st-eve-code/app-assets/main/app/piano/assets/smallstar.png' }, size: 70 },
        { id: 2, image: { uri: 'https://raw.githubusercontent.com/st-eve-code/app-assets/main/app/piano/assets/bigstar.png' }, size: 120 },
        { id: 3, image: { uri: 'https://raw.githubusercontent.com/st-eve-code/app-assets/main/app/piano/assets/smallstar.png' }, size:70 },
    ]
  return (
    <View style={{ justifyContent:"center", alignItems:"center", marginTop: -14, flexDirection:"row", gap: 12 }}>
      {images.map((e) => (
        <Image key={e.id} source={e.image} style={{ width: e.size, height: e.size }} contentFit="contain" />
      ))}
    </View>
  )
}