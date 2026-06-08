import React, { useRef } from 'react';
import {
  Animated,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

// ─────────────────────────────────────────────────────────────
//  PROPS
// ─────────────────────────────────────────────────────────────
interface GameButtonProps {
  /** Text displayed inside the button */
  text: string;
  /** Called when the button is pressed */
  onPress: () => void;
  /** Optional override styles for the button container */
  style?: ViewStyle;
  /** Optional override styles for the button text */
  textStyle?: TextStyle;
  /** Disable the button */
  disabled?: boolean;
}

// ─────────────────────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────────────────────
export default function GameButton({
  text,
  onPress,
  style,
  textStyle,
  disabled = false,
}: GameButtonProps) {
  // Animated value drives the pressed background colour (0 = transparent, 1 = faint blue)
  const pressAnim = useRef(new Animated.Value(0)).current;

  /** Animate in to pressed state */
  function handlePressIn() {
    Animated.timing(pressAnim, {
      toValue: 1,
      duration: 120,
      useNativeDriver: false, // backgroundColor cannot use native driver
    }).start();
  }

  /** Animate back to default transparent state */
  function handlePressOut() {
    Animated.timing(pressAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }

  // Interpolate between transparent and a faint blue on press
  const animatedBg = pressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 0, 0, 0)', 'rgba(70, 130, 255, 0.18)'],
  });

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled}
    >
      <Animated.View
        style={[
          styles.button,
          { backgroundColor: animatedBg },
          disabled && styles.disabled,
          style,
        ]}
      >
        <Text style={[styles.label, textStyle]}>{text}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

// ─────────────────────────────────────────────────────────────
//  STYLES
// ─────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  button: {
    // Size
    width: 280,
    height: 56,
    borderRadius: 16,

    // Default state — fully transparent background
    backgroundColor: 'transparent',

    // Subtle border matching the button image
    borderWidth: 1.5,
    borderColor: 'rgba(140, 140, 255, 0.35)',

    // Centre the label and the button itself
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',

    // White box shadow
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8, // Android — elevation uses shadowColor on API 28+
  },

  label: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'Fredoka One', // swap to your project font if needed
    letterSpacing: 0.5,
  },

  disabled: {
    opacity: 0.4,
  },
});