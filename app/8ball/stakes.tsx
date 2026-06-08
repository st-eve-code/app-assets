import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ImageBackground, Image } from 'expo-image'
import * as ScreenOrientation from 'expo-screen-orientation'
import { router } from 'expo-router'

export default function Stakes() {
  const stakes = ["500", "1000", "3000", "5000"]

  const [selected, setSelected] = useState<string | null>(null)

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
          source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/8ball/assets/coverboard.png' }}
          contentFit="fill"
          style={{ width: '100%', height: '100%' }}
        />
        <View style={styles.overlay}>

          {/* Stakes buttons */}
          <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", gap:10}}>
            {/* FIX 1: correct .map() syntax — (stake, index) not (stakes, index) */}
            {stakes.map((stake, index) => (
              // FIX 2: key prop added
              <TouchableOpacity
                key={index}
                style={[
                  styles.stakeButton,
                  // FIX 3: white border applied when this stake is selected
                  selected === stake && styles.stakeButtonSelected,
                ]}
                // FIX 4: onPress sets the selected stake
                onPress={() => setSelected(stake)}
              >
                <Image
                  source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/8ball/assets/btn.png' }}
                  style={{ width: '100%', height: '100%', position: 'absolute' }}
                  contentFit="cover"
                />
                {/* FIX 5: display the actual stake value instead of hardcoded "1000" */}
                <Text style={styles.stakeText}>{stake}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Action buttons */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.returnButton} onPress={()=> router.push("/8ball/home")}>
              <Text style={styles.returnText}>Return</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.playButton} onPress={()=> router.push("/8ball/searching")}>
              <Image
                source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/8ball/assets/playbtn.png' }}
                style={{ width: '100%', height: '100%' }}
                contentFit="fill"
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
    overflow: 'hidden',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 110,
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
    marginTop: 12,
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