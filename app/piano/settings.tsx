import React from 'react'
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useRouter } from 'expo-router'

export default function SettingsScreen() {
  const router = useRouter()

  return (
    <ImageBackground
      source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/piano/assets/bgcover.png' }}
      style={styles.container}
      resizeMode="cover"
    >
      {/* ================= COIN OVERLAYS ================= */}

      <Image
        source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/piano/assets/coin.png' }}
        style={styles.coinTopLeft}
      />

      <Image
        source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/piano/assets/coin.png' }}
        style={styles.coinTopRight}
      />

      <Image
        source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/piano/assets/coin.png' }}
        style={styles.coinBottomLeft}
      />

      <Image
        source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/piano/assets/coin.png' }}
        style={styles.coinBottomRight}
      />

      {/* ================= MAIN CONTENT ================= */}

      <View style={styles.content}>
        {/* TITLE */}

        <Text style={styles.title}>
          Settings
        </Text>

        {/* ================= BUTTONS ================= */}

        <View style={styles.buttonContainer}>
          {/* ================= PRIVACY BUTTON ================= */}

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.buttonOuter}
            onPress={() => router.push('/piano/policy')}
          >
            <ImageBackground
              source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/piano/assets/bgcover.png' }}
              style={styles.buttonInner}
              imageStyle={styles.buttonBgImage}
              resizeMode="cover"
            >
              {/* Overlay */}

              <View style={styles.buttonOverlay} />

              {/* Content */}

              <View style={styles.buttonContent}>
                <Text style={styles.buttonTitle}>
                  Privacy & Terms
                </Text>

                <Text style={styles.buttonSubtitle}>
                  User policies and terms of use
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          {/* ================= GAME INFO BUTTON ================= */}

          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.buttonOuter}
            onPress={() => router.push('/piano/gameinfo')}
          >
            <ImageBackground
              source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/piano/assets/bgcover.png' }}
              style={styles.buttonInner}
              imageStyle={styles.buttonBgImage}
              resizeMode="cover"
            >
              {/* Overlay */}

              <View style={styles.buttonOverlay} />

              {/* Content */}

              <View style={styles.buttonContent}>
                <Text style={styles.buttonTitle}>
                  Game Info
                </Text>

                <Text style={styles.buttonSubtitle}>
                  Learn more about the game
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        {/* ================= BACK BUTTON ================= */}

        <TouchableOpacity
          activeOpacity={0.88}
          style={styles.backButtonOuter}
          onPress={() => router.back()}
        >
          <View style={styles.backButtonInner}>
            <Text style={styles.backButtonText}>
              Back
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  // ================= CONTAINER =================

  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  // ================= TITLE =================

  title: {
    color: '#F4EEFF',
    fontSize: 36,
    fontWeight: '900',

    letterSpacing: 1,

    marginBottom: 45,

    textShadowColor: 'rgba(147,112,219,0.5)',
    textShadowOffset: {
      width: 0,
      height: 0,
    },
    textShadowRadius: 18,
  },

  // ================= BUTTON CONTAINER =================

  buttonContainer: {
    width: '100%',
    gap: 24,
  },

  // ================= BUTTON =================

  buttonOuter: {
    borderRadius: 30,
    overflow: 'hidden',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.28,
    shadowRadius: 18,

    elevation: 10,
  },

  buttonInner: {
    height: 155,
    justifyContent: 'center',
  },

  buttonBgImage: {
    borderRadius: 30,
  },

  buttonOverlay: {
    ...StyleSheet.absoluteFillObject,

    backgroundColor: 'rgba(0,0,0,0.35)',
  },

  buttonContent: {
    zIndex: 2,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonTitle: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',

    letterSpacing: 0.7,

    textShadowColor: 'rgba(0,0,0,0.45)',
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 10,
  },

  buttonSubtitle: {
    marginTop: 10,

    color: 'rgba(255,255,255,0.85)',
    fontSize: 15,
    fontWeight: '600',

    textAlign: 'center',

    letterSpacing: 0.3,
  },

  // ================= BACK BUTTON =================

  backButtonOuter: {
    marginTop: 48,

    borderRadius: 26,
    padding: 2.5,

    backgroundColor: 'rgba(186,155,255,0.26)',

    shadowColor: '#8F5CFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.22,
    shadowRadius: 16,

    elevation: 10,
  },

  backButtonInner: {
    minWidth: 190,

    paddingVertical: 17,
    paddingHorizontal: 30,

    borderRadius: 24,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#4D367F',
  },

  backButtonText: {
    color: '#F4EEFF',
    fontSize: 17,
    fontWeight: '800',

    letterSpacing: 0.6,
  },

  // ================= COIN OVERLAYS =================

  coinTopLeft: {
    position: 'absolute',

    width: 120,
    height: 120,

    top: 70,
    left: -30,

    opacity: 0.08,

    transform: [{ rotate: '-20deg' }],
  },

  coinTopRight: {
    position: 'absolute',

    width: 90,
    height: 90,

    top: 150,
    right: -15,

    opacity: 0.07,

    transform: [{ rotate: '18deg' }],
  },

  coinBottomLeft: {
    position: 'absolute',

    width: 100,
    height: 100,

    bottom: 170,
    left: -20,

    opacity: 0.07,

    transform: [{ rotate: '20deg' }],
  },

  coinBottomRight: {
    position: 'absolute',

    width: 140,
    height: 140,

    bottom: 40,
    right: -40,

    opacity: 0.08,

    transform: [{ rotate: '-15deg' }],
  },
})