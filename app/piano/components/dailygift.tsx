import React, { useEffect, useRef } from "react";
import {
    Animated,
    Easing,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Image } from 'expo-image';

export default function DailyGift() {
  const bounce = useRef(new Animated.Value(0)).current;
  const glow   = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Bounce up and down
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, {
          toValue: -14,
          duration: 600,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(bounce, {
          toValue: 0,
          duration: 600,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.delay(300),
      ])
    ).start();

    // Gentle glow scale pulse
    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(glow, {
          toValue: 0,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Slight left-right wobble
    Animated.loop(
      Animated.sequence([
        Animated.timing(rotate, {
          toValue: 1,
          duration: 400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: -1,
          duration: 400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(rotate, {
          toValue: 0,
          duration: 400,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.delay(1000),
      ])
    ).start();
  }, []);

  const scale = glow.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.12],
  });

  const spin = rotate.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-12deg", "0deg", "12deg"],
  });

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => {/* handle gift claim */}}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.wrapper,
          {
            transform: [
              { translateY: bounce },
              { scale },
              { rotate: spin },
            ],
          },
        ]}
      >
        <Image
          source={{ uri: 'https://raw.githubusercontent.com/st-eve-code/app-assets/main/app/piano/assets/gift.png' }}
          style={styles.image}
          contentFit="contain"
        />
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 16,
    top: -65,
    zIndex: 10,
  },
  wrapper: {
    width: 70,
    height: 70,
  },
  image: {
    width: 70,
    height: 70,
  },
});
