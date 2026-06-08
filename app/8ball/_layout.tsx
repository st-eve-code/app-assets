import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'react-native'

export default function _layout() {
  return (
    <>
         <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
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
           <Stack.Screen name='loading' />
           <Stack.Screen name='play' />
           <Stack.Screen name='tutorials' />
           <Stack.Screen name='settings' />
           <Stack.Screen name='stakes' />
           <Stack.Screen name='searching' />
           <Stack.Screen name='components' />
           <Stack.Screen name='policy' />
           <Stack.Screen name='aboutgame' />

         </Stack>
       </>
  )
}