import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function musicvolumeslider() {
  return (
    <TouchableOpacity
    style={{width:322,height:60, marginTop:20,
    borderRadius:20, borderWidth:2, flexDirection:"row",alignItems:"center", justifyContent:"center",gap:15,paddingHorizontal:5,
    borderColor:"white", backgroundColor:"#8BD3FF"}}>
    <Image
      source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/music.png' }}
      style={{width:50, height:50, justifyContent:"center"}}
      resizeMode="stretch"
    />
    <Text style={{color:"white", fontSize:18, fontWeight: "600"}}>
      Music
    </Text>
    
    <View style={{width:170, height:20, backgroundColor:"white", borderRadius:15}}>
      <View style={{width:80, height:20, backgroundColor:"#9F4CFD", borderRadius:15}}>

      </View>
    </View>
    </TouchableOpacity>
  )
}