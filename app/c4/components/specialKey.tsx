import { router } from 'expo-router'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native'

export default function SpecialKey({ text, route }: any) {
  return (
    <TouchableOpacity onPress={() => router.push(route)} style={styles.button}>
      <Image
        source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/gamekeys.png' }}
        style={styles.fillObject}
        resizeMode="stretch"
      />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 330,
    height: 70,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 5,
    overflow: 'hidden',
  },
  text: {
    position: 'absolute', top:18,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    fontWeight: 'bold',
    zIndex: 1,
    fontSize: 24
  },
  fillObject: {
    position: 'relative',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
})