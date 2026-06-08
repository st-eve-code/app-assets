import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

export default function Games() {
  return (
    <View style={{flexDirection:"column", gap:20, backgroundColor:"black", alignItems:"center", flex:1, paddingVertical:230}} >
      <TouchableOpacity onPress={()=> router.push("/8ball")}
      style={{width:230,height:120, borderRadius:20,backgroundColor:"#bbb", alignItems:"center", paddingVertical:42}}>
        <Text style={{color:"white", fontSize:24}}>8ball pool</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> router.push("/c4")}
      style={{width:230,height:120, borderRadius:20,backgroundColor:"#bdb", alignItems:"center", paddingVertical:42}}>
        <Text style={{color:"white", fontSize:24}}>connect4 dots</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> router.push("/piano")}
      style={{width:230,height:120, borderRadius:20,backgroundColor:"#bdc", alignItems:"center", paddingVertical:42}}>
        <Text style={{color:"white", fontSize:24}}>piano tiles</Text>
      </TouchableOpacity>
    </View>
  )
}