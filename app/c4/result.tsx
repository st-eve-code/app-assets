import { Image, ImageBackground } from 'expo-image'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import PlayerCard from './components/playerCard'

export default function result() {
    const [result,setresult] = useState('win') // win or lose
  return (
    <ImageBackground
            source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/bg.png' }}
            contentFit={'cover'}
            style={{
                flex: 1,
                backgroundColor:"#000",
            }}>
      <ScrollView 
        contentContainerStyle={{
          flexGrow: 1,
          gap:20,
          paddingVertical:120,
          paddingHorizontal:20,
          paddingBottom: 40,
          alignItems:"center",
        }}
        showsVerticalScrollIndicator={false}
      >
        {result == 'win' && (
            <View>
                <Image
                source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/winner.png' }} 
                style={{ marginBottom:0, width:278, height:94}}
                contentFit='fill'
                />      
                <Text style={{fontSize:18, color:"white", textAlign:"center", top:15,
                    alignItems:"center",justifyContent:"center", marginBottom:30}}>
                    We Have A Winner
                </Text>
                <PlayerCard 
                playername={"Mary Solviet"} 
                width={170} height={140} 
                font={22} seedheight={30} 
                seedwidth={30}/>
                <TouchableOpacity onPress={()=>router.push("/c4/home")}
                    style={{backgroundColor:"#8BD3",alignSelf:"center",alignItems:"center", borderRadius:18,borderWidth:2, borderColor:"white",
                        width:145,height:40, marginTop:40, 
                        justifyContent:"center", gap:10}}
                >
                    <Text style={{fontSize:18, color:"white", textAlign:"center",
                        alignItems:"center",justifyContent:"center"}}>
                        Play Again
                    </Text>
                </TouchableOpacity>
            </View>
        ) }
        {result == 'lose' && (
            <View>
                <Image
                source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/looser.png' }} 
                style={{ marginBottom:0, width:278, height:94}}
                contentFit='fill'
                />      
                <Text style={{fontSize:18, color:"white", textAlign:"center", top:15,
                    alignItems:"center",justifyContent:"center", marginBottom:30}}>
                    Sorry Try Again !
                </Text>
                <PlayerCard 
                playername={"Mary Solviet"} 
                width={170} height={140} 
                font={22} seedheight={30} 
                seedwidth={30}/>
                <TouchableOpacity onPress={()=>router.push("/c4/home")}
                    style={{backgroundColor:"#8BD3",alignSelf:"center",alignItems:"center", borderRadius:18,borderWidth:2, borderColor:"white",
                        width:145,height:40, marginTop:40, 
                        justifyContent:"center", gap:10}}
                >
                    <Text style={{fontSize:18, color:"white", textAlign:"center",
                        alignItems:"center",justifyContent:"center"}}>
                        Play Again
                    </Text>
                </TouchableOpacity>
            </View>
        )}
      </ScrollView>
    </ImageBackground>
  )
}