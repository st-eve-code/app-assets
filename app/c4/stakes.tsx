import { Image, ImageBackground } from 'expo-image'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Stakebtn from './components/stakebtn'

export default function Stakes() {
  const [selectedStake, setSelectedStake] = useState<string | null>(null)

  return (
    <ImageBackground
      source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/bg.png' }}
      contentFit="cover"
      style={{
        flex: 1,
        backgroundColor: '#000',
      }}
    >
      <ScrollView 
        contentContainerStyle={{
          flexGrow: 1,
          gap: 20,
          paddingVertical: 60,
          paddingHorizontal: 20,
          paddingBottom: 40,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ alignItems: 'center', gap: 10 }}>
          <Image
            source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/staketext.png' }}
            style={{ width: 200, height: 80 }}
            contentFit="contain"
          />

          <Text style={{ fontSize: 20, textAlign: 'center', color: '#fff' }}>
            Select a stake from the different options below
          </Text>

          <Stakebtn onSelectStake={(stake) => setSelectedStake(stake)} />

          <TouchableOpacity
            onPress={() => router.push('/c4/searching')}
            disabled={!selectedStake}
            style={{
              backgroundColor: '#8C3DF1',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 18,
              borderWidth: 2,
              borderColor: 'white',
              width: 280,
              height: 60,
              marginTop: 20,
              opacity: selectedStake ? 1 : 0.4,
              shadowColor: '#ffffff',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: selectedStake ? 0.8 : 0,
              shadowRadius: 10,
              elevation: 10,
            }}
          >
            <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>
              Continue
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push('/c4/settings')}
            style={{
              backgroundColor: '#7D1BF4',
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 18,
              borderWidth: 2,
              borderColor: 'white',
              width: 280,
              height: 60,
              marginTop: 10,
            }}
          >
            <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>
              Return Back
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  )
}