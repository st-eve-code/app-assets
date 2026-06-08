import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Billboard({message}:any) {
  return (
    <View style={{width:320,height:420, borderRadius:20, paddingVertical:10, paddingHorizontal:5, marginTop:20,
    borderWidth:2,borderColor:"white", backgroundColor:"#E4E2E266"}}>
      <Text style={{textAlign:"center", fontSize:21, fontWeight:"400", letterSpacing:0.3, color:"#000000"}}>{message}</Text>
    </View>
    
  )
}