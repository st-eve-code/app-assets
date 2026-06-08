import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

export default function _layout() {
  return (
    <>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <Stack 
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: "",
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerShadowVisible: false,
        }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen name="stakes" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="gametutorial"/>
        <Stack.Screen name="gameplay" />
        <Stack.Screen name="gameinfo" />
        <Stack.Screen name="policies" />
        <Stack.Screen name="result" />
        <Stack.Screen name="searching" />

      </Stack>
    </>
  )
}