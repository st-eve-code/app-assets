import { router } from 'expo-router'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Image, ImageBackground } from 'expo-image'
import SpecialKey from './components/specialKey'
export default function Settings() {
  return (
     <ImageBackground
        source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/bg.png' }}
        contentFit='cover'
        style={{
            flex: 1,
            backgroundColor:"#000"
        }}>
      <ScrollView 
        contentContainerStyle={{
          flexGrow: 1,
          gap:20,
          paddingVertical:120,
          paddingHorizontal:20,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{alignItems:"center", gap:10}}>
              <Image source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/settext.png' }} style={{ marginBottom:10,width:166, height:50}} contentFit="contain" />
              <Text style={{fontSize:20,textAlign:"center", color:"#fff", justifyContent:"center", alignItems:"center"}}>
                  Feel free to tweak the setting the way you want
              </Text> 
                     
              <SpecialKey text={"Privacy & Policies "} route={'/c4/policies'}/>
            <SpecialKey text={"Game Information "} route={'/c4/gameinfo'}/>
            <TouchableOpacity onPress={()=>router.push("/c4/home")}
              style={{backgroundColor:"#8BD3",alignSelf:"center",alignItems:"center", borderRadius:18,borderWidth:2, borderColor:"white",
                      width:320,height:60, marginTop:20}}>
                  <Text style={{fontSize:18, color:"white", textAlign:"center", top:15,
                      alignItems:"center",justifyContent:"center"}}>
                      Return Back
                  </Text>
              </TouchableOpacity>
        </View>
      </ScrollView>
      </ImageBackground>
  )
}