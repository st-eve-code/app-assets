import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 40;

interface MusicItem {
  id: number;
  title: string;
  artist: string;
  year: string;
  gradientColors: [string, string, string];
}

const MUSIC_LIST: MusicItem[] = [
  { id: 1, title: "Under The Rain",  artist: "Rihanna",        year: "2000", gradientColors: ["#d06cff", "#8c20d4", "#52007d"] },
  { id: 2, title: "Blinding Lights", artist: "The Weeknd",     year: "2019", gradientColors: ["#ff6c6c", "#d42020", "#7d0000"] },
  { id: 3, title: "Levitating",      artist: "Dua Lipa",       year: "2020", gradientColors: ["#6ce0ff", "#208cd4", "#003d7d"] },
  { id: 4, title: "Stay",            artist: "Justin Bieber",  year: "2021", gradientColors: ["#6cffa0", "#20d45e", "#007d30"] },
  { id: 5, title: "As It Was",       artist: "Harry Styles",   year: "2022", gradientColors: ["#ffd06c", "#d4a020", "#7d5400"] },
];

// Single spinning disc card
function MusicCard({ item }: { item: MusicItem }) {
  const [playing, setPlaying] = useState(false);

  // Use a large target value so the loop never hits a boundary issue
  const rotation = useRef(new Animated.Value(0)).current;
  const shimmerX = useRef(new Animated.Value(0)).current;
  const animRef  = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    startSpin();
    startShimmer();
    return () => animRef.current?.stop();
  }, []);

  function startSpin() {
    // Reset to 0 each time so interpolation stays clean
    rotation.setValue(0);
    animRef.current = Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      { resetBeforeIteration: true }
    );
    animRef.current.start();
  }

  function startShimmer() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerX, {
          toValue: CARD_WIDTH,
          duration: 2500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerX, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={[styles.card, { width: CARD_WIDTH }]}>
      <LinearGradient
        colors={item.gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Shimmer */}
        <Animated.View
          style={[
            styles.shimmer,
            { transform: [{ translateX: shimmerX }, { rotate: "-20deg" }] },
          ]}
        />

        {/* Spinning disc */}
        <View style={styles.cdWrap}>
          <Animated.View style={[styles.disc, { transform: [{ rotate: spin }] }]}>
            <Image
              source={{ uri: 'https://raw.githubusercontent.com/st-eve-code/app-assets/main/app/piano/assets/disc.png' }}
              style={styles.discImage}
              contentFit="contain"
            />
          </Animated.View>
        </View>

        {/* Text info + play button */}
        <View style={styles.content}>
          <Text numberOfLines={1} style={styles.title}>
            {item.artist} - {item.title}
          </Text>
          <Text style={styles.year}>{item.year}</Text>

          {/* Play / Pause button */}
          <TouchableOpacity
            style={styles.playBtn}
            activeOpacity={0.8}
            onPress={() => setPlaying(p => !p)}
          >
            <Text style={styles.playIcon}>{playing ? "⏸" : "▶"}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

// Exported component — horizontal scrollable list
export default function MusicCardList() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      decelerationRate="fast"
      snapToInterval={CARD_WIDTH + 16}
      snapToAlignment="start"
    >
      {MUSIC_LIST.map(item => (
        <MusicCard key={item.id} item={item} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 16,
  },
  card: {
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.25)",
    height: 120,
  },
  gradient: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  cdWrap: {
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  disc: {
    width: 100,
    height: 100,
  },
  discImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 16,
    gap: 4,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
  },
  year: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 13,
    fontWeight: "600",
  },
  // Play button — sits below the text inside content area
  playBtn: {
    marginTop: 6,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  playIcon: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 16,
  },
  shimmer: {
    position: "absolute",
    width: 80,
    height: 250,
    backgroundColor: "rgba(255,255,255,0.15)",
    top: -50,
    left: 0,
  },
});
