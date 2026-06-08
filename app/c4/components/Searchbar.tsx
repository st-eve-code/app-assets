import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Animated } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'


export default function Searchbar() {
 const progress = useRef(new Animated.Value(0)).current;
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        // Listen to the animated value to update percentage text
        const listener = progress.addListener(({ value }) => {
            setPercentage(Math.round(value * 100));
        });

        Animated.timing(progress, {
            toValue: 1,
            duration: 40000, // 4 seconds to reach 100% — adjust as needed
            useNativeDriver: false,
        }).start(({ finished }) => {
            if (finished) {
                router.push('/c4/gameplay');
            }
        });

        return () => progress.removeListener(listener);
    }, []);

    const width = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={{ width: '100%', paddingHorizontal: 20, gap: 20 }}>
            {/* Text + percentage */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap:30 }}>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600', textAlign:"center" }}>
                    Searching Players
                </Text>
                <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
                    {percentage}%
                </Text>
            </View>

            {/* Progress bar */}
            <View style={{
                width: '100%',
                height: 6,
                borderRadius: 10,
                backgroundColor: '#ffffff20',
                overflow: 'hidden',
            }}>
                <Animated.View style={{ width, height: '100%' }}>
                    <LinearGradient
                        colors={['#FF0000', '#9B30FF', '#4A90D9', 'transparent']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{ flex: 1, borderRadius: 10 }}
                    />
                </Animated.View>
            </View>
        </View>
    )
}