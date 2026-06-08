import { Image } from 'expo-image';
import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';

const REEL_IMAGES = [
    { uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/mario.png' },
    { uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/monkey.png' },
];

const ITEM_HEIGHT = 200;
const REEL_COUNT = REEL_IMAGES.length;

type SearchingPlayerProps = {
    stop?: boolean // when true, reel slows down and lands on last image
}

export default function SearchingPlayer({ stop = false }: SearchingPlayerProps) {
    const scrollY = useRef(new Animated.Value(0)).current;
    const animation = useRef<Animated.CompositeAnimation | null>(null);

    useEffect(() => {
        // Start the looping spin
        animation.current = Animated.loop(
            Animated.sequence([
                Animated.timing(scrollY, {
                    toValue: -(ITEM_HEIGHT * REEL_COUNT),
                    duration: 800,
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(scrollY, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                }),
            ])
        );
        animation.current.start();

        return () => animation.current?.stop(); // cleanup on unmount
    }, []);

    useEffect(() => {
        if (stop) {
            // Stop the loop
            animation.current?.stop();

            // Slow down and land on the last image (player5.png at index 4)
            const landingPosition = -(ITEM_HEIGHT * (REEL_COUNT - 1));
            Animated.timing(scrollY, {
                toValue: landingPosition,
                duration: 1200,
                easing: Easing.out(Easing.cubic), // decelerates naturally
                useNativeDriver: true,
            }).start();
        }
    }, [stop]);

    return (
        // Removed any transform here — only the inner reel moves
        <View style={styles.frame}>
            <View style={styles.window}>
                <Animated.View style={{ transform: [{ translateY: scrollY }] }}>
                    {[...REEL_IMAGES, ...REEL_IMAGES].map((src, index) => (
                        <Image
                            key={index}
                            source={src}
                            style={styles.avatar}
                            contentFit="cover"
                        />
                    ))}
                </Animated.View>
            </View>

            <View style={styles.nameTag}>
                <Text style={styles.nameText}>Unknown Player</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    frame: {
        width: 220,
        borderRadius: 18,
        overflow: 'hidden',
        backgroundColor: '#0a1a6e',
        alignSelf:"center",
        borderWidth: 2,
        borderColor: '#1a2a8e',
        // No transform here — this was causing the whole frame to spin
    },
    window: {
        height: ITEM_HEIGHT,
        overflow: 'hidden',
    },
    avatar: {
        width: 200,
        height: ITEM_HEIGHT,
    },
    nameTag: {
        backgroundColor: 'white',
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1a0080',
    },
})