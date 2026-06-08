import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

export default function Btn({route, text, color}: any) {
  return (
    <TouchableOpacity onPress={()=>{
        router.push(route)
    }}
    style={{
        width:230, height:60, borderRadius:10, backgroundColor:color, justifyContent:'center', alignSelf:'center',marginBottom:2, marginTop:2
    }}
    >
        <Text style={{color:"white",fontSize:18, fontWeight:"600", textAlign:"center"}}>
            {text}
        </Text>
    </TouchableOpacity>
  )
}