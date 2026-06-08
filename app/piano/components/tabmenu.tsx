import { router } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Image } from 'expo-image'

export default function TabMenu() {
  return (
    <View style={styles.container}>
      {/* Learn - left */}
      <TouchableOpacity style={styles.sideBtn} onPress={()=>router.push("/piano/learn")} activeOpacity={0.7}>
        <Image
          source={{ uri: 'https://raw.githubusercontent.com/st-eve-code/app-assets/main/app/piano/assets/learn.png' }}
          style={styles.sideIcon}
          contentFit="contain"
        />
      </TouchableOpacity>

      {/* Play - center, larger */}
      <TouchableOpacity style={styles.centerBtn} onPress={()=>router.push("/piano/stakes")} activeOpacity={0.7}>
        <Image
          source={{ uri: 'https://raw.githubusercontent.com/st-eve-code/app-assets/main/app/piano/assets/play.png' }}
          style={styles.centerIcon}
          contentFit="contain"
        />
      </TouchableOpacity>

      {/* Settings - right */}
      <TouchableOpacity style={styles.sideBtn} onPress={()=>router.push("/piano/settings")} activeOpacity={0.7}>
        <Image
          source={{ uri: 'https://raw.githubusercontent.com/st-eve-code/app-assets/main/app/piano/assets/home.png' }}
          style={styles.sideIcon}
          contentFit="contain"
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 28,
    paddingHorizontal: 30,
    gap: 36,
  },
  // Side buttons — equal flex so center stays truly centered
  sideBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  sideIcon: {
    width: 62,
    height: 62,
  },
  // Center play button — bigger, visually dominant
  centerBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  centerIcon: {
    width: 86,
    height: 86,
  },
})
