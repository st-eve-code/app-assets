import { ImageBackground, Image } from 'expo-image'
import { router, Href } from 'expo-router'
import * as ScreenOrientation from 'expo-screen-orientation'
import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

export default function PoolHome() {
  const buttons: { id: number; name: string; icon: { uri: string }; route: Href }[] = [
    { id: 1, name: 'Play', icon: { uri: 'https://raw.githubusercontent.com/st-eve-code/app-assets/main/app/8ball/assets/play.png' }, route: './stakes' },
    { id: 2, name: 'Learn', icon: { uri: 'https://raw.githubusercontent.com/st-eve-code/app-assets/main/app/8ball/assets/learn.png' }, route: './tutorials' },
    { id: 3, name: 'Settings', icon: { uri: 'https://raw.githubusercontent.com/st-eve-code/app-assets/main/app/8ball/assets/settings.png' }, route: './settings' },
  ]
  


  // Lock to landscape when screen opens
  useEffect(() => {
    async function lockOrientation() {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      )
    }

    lockOrientation()

    // Unlock when user leaves this screen
    return () => {
      ScreenOrientation.unlockAsync()
    }
  }, [])

  return (
    <ImageBackground
      source={{ uri: 'https://raw.githubusercontent.com/st-eve-code/app-assets/main/app/8ball/assets/gameplay.png' }}
      style={styles.background}
      contentFit="cover"
    >
      {/* FIX 4: Single row container wraps all buttons, not recreated per button */}
      <View style={styles.buttonRow}>
        {buttons.map((button) => (
          // FIX 3: key prop on outermost element
          <TouchableOpacity
            key={button.id}
            style={styles.button}
            // FIX 1: actually call the function with the argument
            onPress={() => router.push(button.route)}
          >
            {/* FIX 2: use button.icon directly — it's already a resolved asset */}
            <Image
              source={button.icon}
              style={styles.buttonImage}
              contentFit="fill"
            />
          </TouchableOpacity>
        ))}
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    // FIX 5: removed useless transform: rotate(360deg)
    justifyContent: 'center',
    alignItems: 'center',
  },
  // FIX 4: single row container defined in StyleSheet
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
  },
  button: {
    width: 160,
    height: 110,
    borderRadius: 15,
    overflow: 'hidden', // ensures borderRadius clips the image
  },
  buttonImage: {
    width: '100%',
    height: '100%',
  },
})