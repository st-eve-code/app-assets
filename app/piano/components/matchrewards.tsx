import { Image } from 'expo-image'
import React, { useEffect, useRef, useState } from 'react'
import { Animated, Text, View } from 'react-native'

type MatchRewardsProps = {
  isMatchDone: boolean
  onDone: () => void  // called when fade-out fully completes
}

export default function MatchRewards({ isMatchDone, onDone }: MatchRewardsProps) {
  const opacity = useRef(new Animated.Value(0)).current
  const [visible, setVisible] = useState(false)

  const data = [
    { id: 1, score: "X150", image: { uri: 'https://raw.githubusercontent.com/st-eve-code/app-assets/main/app/piano/assets/heart.png' } },
    { id: 2, score: "X200", image: { uri: 'https://raw.githubusercontent.com/st-eve-code/app-assets/main/app/piano/assets/music.png' } },
    { id: 3, score: "X10",  image: { uri: 'https://raw.githubusercontent.com/st-eve-code/app-assets/main/app/piano/assets/diamond.png' } },
  ]

  useEffect(() => {
    if (!isMatchDone) return

    opacity.setValue(0)
    setVisible(true)

    // Smooth fade in
    Animated.timing(opacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      // Hold visible for 7 seconds
      setTimeout(() => {
        // Smooth fade out
        Animated.timing(opacity, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }).start(() => {
          // Fully gone — collapse space then notify parent
          setVisible(false)
          onDone()
        })
      }, 7000)
    })
  }, [isMatchDone])

  if (!visible) return null

  return (
    <Animated.View style={{ opacity }}>
      <Text style={{ fontSize: 18, fontWeight: "400", color: "white", textAlign: "center" }}>
        Awards
      </Text>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
        marginBottom: 12,
        gap: 25,
        paddingHorizontal: 16,
      }}>
        {data.map((item) => (
          <View
            key={item.id}
            style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 12 }}
          >
            <Image source={item.image} style={{ width: 30, height: 30, left: -6 }} contentFit="contain" />
            <Text style={{ fontSize: 16, fontWeight: "400", color: "white" }}>
              {item.score}
            </Text>
          </View>
        ))}
      </View>
    </Animated.View>
  )
}
