import React from 'react'
import { ScrollView, Text, View } from 'react-native'

export default function gameTutorial() {
  return (
    <ScrollView 
      contentContainerStyle={{
        flexGrow: 1,
        paddingVertical: 40,
        paddingHorizontal: 20,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Text>gameTutorial</Text>
      </View>
    </ScrollView>
  )
}