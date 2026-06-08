import { Image, ImageBackground } from 'expo-image'
import { router } from 'expo-router'
import React from 'react'
import { ScrollView, Text, TouchableOpacity } from 'react-native'
import Searchbar from './components/Searchbar'

export default function Searching() {
  return (
    <ImageBackground
            source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/bg.png' }}
            contentFit={'cover'}
            style={{
                flex: 1,
                backgroundColor:"#000"
            }}>
      <ScrollView 
        contentContainerStyle={{
          flexGrow: 1,
          gap:20,
          paddingVertical:100,
          paddingHorizontal:20,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
          <Image
            source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/crown.png' }} 
            style={{ marginBottom:0, width:78, height:60, alignSelf:"center"}}
            contentFit="contain"
            />
            <Image
            source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/player.png' }} 
            style={{ marginBottom:20, width:278, height:218, alignSelf:"center"}}
            contentFit="contain"
            />

            <Searchbar/>

            <TouchableOpacity onPress={()=>router.push("/c4/home")}
              style={{backgroundColor:"#8BD3",alignSelf:"center",alignItems:"center", borderRadius:18,borderWidth:2, borderColor:"white",
                    width:145,height:60, marginTop:10, 
                    justifyContent:"center", gap:10}}
            >
                <Text style={{fontSize:18, color:"white", textAlign:"center",
                    alignItems:"center",justifyContent:"center"}}>
                    Cancel Search
                </Text>
            </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  )
}