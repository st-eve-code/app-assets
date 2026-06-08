import { router } from 'expo-router'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Image, ImageBackground } from 'expo-image'
import Billboard from './components/billboard'

export default function policies() {
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
          paddingVertical:98,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{alignItems:"center",justifyContent:"center"}}>
          <Image
          source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/ptext.png' }}
          style={{ width: 180, height: 60 }}
          contentFit="contain"
          />
          <Billboard message="
            By playing Connect 4 Dots, 
            you agree to use the game fairly 
            and avoid any actions that may disrupt gameplay or exploit 
            the system. Progress, rewards, and settings may be saved 
            to improve your experience, and suspicious activity may lead 
            to limited access. Updates can be applied at any time 
            to improve performance, balance gameplay, 
            and keep the game enjoyable for everyone.
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