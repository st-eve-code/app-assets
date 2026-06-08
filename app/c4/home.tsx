import { router } from 'expo-router';
import React from 'react';
import { ImageBackground, ScrollView, View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import GameButton from './components/Gamebutton';

export default function home() {
  return (
    <ImageBackground
    source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/bg.png' }}
    contentFit='cover'
    style={{
        flex: 1
    }}>
      <ScrollView 
        contentContainerStyle={{
          flexGrow: 1,
          alignItems:"center",
          justifyContent:"center",
          paddingTop:55,
          paddingBottom: 40
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{alignItems:"center",justifyContent:"center"}}>
            <Image
              source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/loadingtext.png' }}
              style={{ width: 280, height: 80, marginBottom:10 }}
              contentFit="contain"
            />
            <Image
              source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/board.png' }}
              style={{ width: 320, height: 280, marginBottom: 10 }}
              contentFit="contain"
            />
            <View style={{gap:15}}>
              <GameButton text="Play Online"     onPress={() => router.push('/c4/stakes')} />
              <GameButton text="Game Tutorial"     onPress={() => router.push('/c4/gametutorial')} />
              <GameButton text="Settings"     onPress={() => router.push('/c4/settings')} />
              <GameButton text="Exit Game"     onPress={() => router.back()} />
            </View>
        </View>
      </ScrollView>
    </ImageBackground>
  )
}
