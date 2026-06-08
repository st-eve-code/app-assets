import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ImageBackground, Image } from 'expo-image'
import * as ScreenOrientation from 'expo-screen-orientation'
import { router } from 'expo-router'

export default function Settings() {

  // Lock to landscape when screen opens
  useEffect(() => {
    async function lockOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      )
    }

    lockOrientation()

    return () => {
      ScreenOrientation.unlockAsync()
    }
  }, [])

  return (
    <ImageBackground
      source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/8ball/assets/gameplay.png' }}
      style={styles.background}
      contentFit="cover"
    >
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/8ball/assets/coverboard2.png' }}
          contentFit="fill"
          style={{ width: '100%', height: '100%' }}
        />
        <View style={styles.overlay}>
        {/* insert the polcies from here */}
          {/* Stakes buttons */}
          <View style={{flexDirection:"column", alignItems:"center", justifyContent:"center", gap:30}}>
            <TouchableOpacity style={{width:480, height:60}} onPress={()=> router.push("/8ball/aboutgame")}>
              <Image
                source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/8ball/assets/settingsbar.png' }}
                contentFit="fill"
                style={{ width: '100%', height: '100%' }}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{width:480, height:60}} onPress={()=> router.push("/8ball/policy")}>
              <Image
                source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/8ball/assets/settingsbar.png' }}
                contentFit="fill"
                style={{ width: '100%', height: '100%' }}
              />
            </TouchableOpacity>
          </View>

          {/* Action buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={{width:65, height:65}} onPress={()=> router.push("/8ball/home")}>
              <Image
                source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/8ball/assets/ball1.png' }}
                contentFit="fill"
                style={{ width: '100%', height: '100%' }}
              />
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 700,
    height: 350,
    paddingLeft: 23,
    alignItems: 'center',
    justifyContent: 'center',
    
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 90,
    left: 120,
  },
  stakeButton: {
    width: 110,
    height: 60,
    marginBottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent', // invisible by default
  },
  stakeButtonSelected: {
    borderColor: 'white', // white border when selected
  },
  stakeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    zIndex: 1,
    position: 'absolute',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    marginTop: 62,
    backgroundColor:"#ffd1A"
  },
  returnButton: {
    width: 160,
    height: 60,
    backgroundColor: '#B3A7B71A',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  playButton: {
    width: 160,
    height: 60,
  },
})