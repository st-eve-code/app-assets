import { Image, ImageBackground } from 'expo-image'
import { router } from 'expo-router'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Billboard from './components/billboard'

export default function gameinfo() {
  return (
    <ImageBackground
        source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/bg.png' }}
        contentFit={'cover'}
        style={{
            flex: 1,
        }}>
      <ScrollView 
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical:70,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{alignItems:"center",justifyContent:"center"}}>
          <Image
          source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/gameinfotext.png' }}
          style={{width:210, height:54}}
          contentFit="contain"
          />
          <Billboard message="
            Connect 4 Dots is a strategy game where players 
            take turns dropping pieces to form a line of four 
            in any direction before their opponent does. 
            Winning requires planning ahead, blocking enemy moves, 
            and creating smart combinations across the board. 
            Each match helps improve your focus, timing, 
            and decision-making while keeping every round exciting.
          " />
        </View>
        <TouchableOpacity onPress={()=>router.push("/c4/settings")}
        style={{backgroundColor:"#8BD3",alignSelf:"center",alignItems:"center", borderRadius:18,borderWidth:2, borderColor:"white",
                width:145,height:60, marginTop:20}}>
            <Text style={{fontSize:18, color:"white", textAlign:"center", top:15,
                alignItems:"center",justifyContent:"center"}}>
                Return Back
            </Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  )
}