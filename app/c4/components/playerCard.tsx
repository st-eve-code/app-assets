import React from 'react'
import { Image, Text, View } from 'react-native'

type PlayerCardProps = {
  playername: string
  width: number
  height: number
  font: number
  seedheight: number
  seedwidth: number
  seeds?: number
  hearts?: number
  playerNumber?: number // 1 or 2 to determine seed color
}

export default function PlayerCard({
  playername, 
  width, 
  height, 
  font, 
  seedheight, 
  seedwidth,
  seeds = 0,
  hearts = 3,
  playerNumber = 1
}: PlayerCardProps) {
  // Use red.png for player 1, orange.png for player 2
  const seedImage = playerNumber === 1 
    ? { uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/red.png' }
    : { uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/orange.png' }

  return (
    <View style={{gap:18, alignItems:"center"}}>
        <View style={{width:width, height:height, borderRadius:10}}>
            <Image source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/user.png' }} style={{ marginBottom:10, width:"100%", height:"100%"}} resizeMode='stretch'/>
        </View>
        <Text style={{color:"white", fontSize:font, fontWeight:"500"}}>{playername}</Text>
        <View style={{flexDirection:"row", alignItems:"center", gap:15}}>
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", gap:5}}>
                <Image source={seedImage} style={{ marginBottom:0, width:seedwidth, height:seedheight}} resizeMode='stretch'/>
                <Text style={{color:"white", fontSize:font}}>{seeds}</Text>
            </View>
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", gap:5}}>
                <Image source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/heart.png' }} style={{ marginBottom:0, width:seedwidth, height:seedheight}} resizeMode='stretch'/>
                <Text style={{color:"white", fontSize:font, fontWeight:"500"}}>{hearts}</Text>
            </View>
        </View>
    </View>
  )
}
