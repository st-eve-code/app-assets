import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

type StakebtnProps = {
  onSelectStake: (stake: string) => void
}

export default function Stakebtn({ onSelectStake }: StakebtnProps) {
    const stakes = ["500", "1000", "3000", "5000"];

    const [selected, setSelected] = useState<string | null>(null);

    const handleSelection = (item: string) => {
        setSelected(item);
        onSelectStake(item);
        console.log(item);
    }

    return (
        <View>
            {stakes.map((item, index) => {
                const isSelected = selected === item;

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleSelection(item)}
                        style={{
                            backgroundColor: "#A03EF3",
                            alignSelf: "center",
                            alignItems: "center",
                            borderRadius: 18,
                            borderWidth: 2,
                            borderColor: isSelected ? "#53B7E9" : "white",
                            width: 280,
                            height: 60,
                            marginTop: 10,
                            // Added: white shadow when selected
                            shadowColor: '#ffffff',
                            shadowOffset: { width: 0, height: 0 },
                            shadowOpacity: isSelected ? 0.8 : 0,
                            shadowRadius: 10,
                            elevation: isSelected ? 10 : 0,
                        }}>
                        <Text style={{
                            fontSize: 18,
                            color: "white",
                            textAlign: "center",
                            top: 15,
                            fontWeight: isSelected ? "bold" : "normal",
                        }}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}