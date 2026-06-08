import { View, Text } from 'react-native'
import { Image } from 'expo-image'
import React from 'react'

export default function Header() {
    const data = [
        {
            id:1, score: 300, image: { uri: 'https://raw.githubusercontent.com/st-eve-code/app-assets/main/app/piano/assets/music.png' }
        },
        {
            id:2, score: 200, image: { uri: 'https://raw.githubusercontent.com/st-eve-code/app-assets/main/app/piano/assets/heart.png' }
        }
        ,
        {
            id:3, score: 800, image: { uri: 'https://raw.githubusercontent.com/st-eve-code/app-assets/main/app/piano/assets/diamond.png' }
        }
    ]
  return (
    <View style={{flexDirection:"row", alignItems:"center",justifyContent:"space-between", marginTop:12, gap: 15, marginBottom: 12}}>
      {data.map((item) => (
        <View key={item.id} style={{backgroundColor:"#FFFFFF1A", width:100, borderRadius:40, height:40,flexDirection:"row", alignItems:"center",justifyContent:"center", gap:12 }}>
            <Image source={item.image} style={{width:30, height:30, left: -6}} contentFit="contain" />
            <Text style={{fontSize:18, fontWeight:"400", color:"white"}}>{item.score}</Text>
        </View>
      ))
      }
    </View>
  )
}