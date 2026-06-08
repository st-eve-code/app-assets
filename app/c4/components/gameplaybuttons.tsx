import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, StyleSheet, Switch } from 'react-native'
import { Image } from 'expo-image'
import { router } from 'expo-router'

export default function Gameplaybuttons() {
    const [backModal, setBackModal] = useState(false)
    const [hintModal, setHintModal] = useState(false)
    const [menuModal, setMenuModal] = useState(false)
    const [musicOn, setMusicOn] = useState(true)

    return (
        <View style={styles.container}>

            {/* ── BUTTONS ── */}
            <TouchableOpacity onPress={() => setBackModal(true)} style={styles.squareBtn}>
                <Image source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/back.png' }} style={styles.squareIcon} contentFit="contain" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setHintModal(true)} style={styles.wideBtn}>
                <Image source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/hint.png' }} style={styles.wideIcon} contentFit="contain" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setMenuModal(true)} style={styles.squareBtn}>
                <Image source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/c4/assets/menu.png' }} style={styles.squareIcon} contentFit="contain" />
            </TouchableOpacity>

            {/* ── BACK MODAL ── */}
            <Modal visible={backModal} transparent animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Leave Game?</Text>
                        <Text style={styles.modalMessage}>
                            Are you sure you want to leave the game?
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalBtn, styles.noBtn]}
                                onPress={() => setBackModal(false)}
                            >
                                <Text style={styles.modalBtnText}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalBtn, styles.yesBtn]}
                                onPress={() => {
                                    setBackModal(false)
                                // this route has to be validated based on the game play session
                                    router.push('/c4/home')
                                }}
                            >
                                <Text style={styles.modalBtnText}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* ── HINT MODAL ── */}
            <Modal visible={hintModal} transparent animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Use a Hint?</Text>
                        <Text style={styles.modalMessage}>
                            Hints cost 25fr. Do you want to continue?
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalBtn, styles.noBtn]}
                                onPress={() => setHintModal(false)}
                            >
                                <Text style={styles.modalBtnText}>No</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalBtn, styles.yesBtn]}
                                onPress={() => {
                                    setHintModal(false)
                                    // add hint logic here
                                }}
                            >
                                <Text style={styles.modalBtnText}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* ── MENU MODAL ── */}
            <Modal visible={menuModal} transparent animationType="slide">
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Menu</Text>

                        {/* Music toggle */}
                        <View style={styles.settingRow}>
                            <Text style={styles.settingLabel}>🎵  Music</Text>
                            <Switch
                                value={musicOn}
                                onValueChange={(val) => setMusicOn(val)}
                                trackColor={{ false: '#555', true: '#8C3DF1' }}
                                thumbColor={musicOn ? '#fff' : '#ccc'}
                            />
                        </View>
                        <Text style={styles.settingHint}>
                            {musicOn ? 'Music is on' : 'Music is off'}
                        </Text>

                        <TouchableOpacity
                            style={[styles.modalBtn, styles.noBtn, { marginTop: 24, alignSelf: 'center', width:80 }]}
                            onPress={() => setMenuModal(false)}
                        >
                            <Text style={styles.modalBtnText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:"center",
        gap: 50,
    },

    // Buttons
    squareBtn: {
        width: 60,
        height: 60,
    },
    wideBtn: {
        width: 100,
        height: 60,
    },
    squareIcon: {
        width: '100%',
        height: '100%',
    },
    wideIcon: {
        width: '100%',
        height: '100%',
    },

    // Modal shared
    overlay: {
        flex: 1,
        backgroundColor: '#000000aa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#1a1a2e',
        borderRadius: 20,
        padding: 28,
        width: 300,
        borderWidth: 1,
        borderColor: '#8C3DF1',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 15,
        color: '#ccc',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 22,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    modalBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
    },
    noBtn: {
        backgroundColor: 'transparent',
        borderColor: '#ffffff50',
    },
    yesBtn: {
        backgroundColor: '#8C3DF1',
        borderColor: '#8C3DF1',
    },
    modalBtnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    // Menu settings
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff10',
        padding: 14,
        borderRadius: 12,
        marginTop: 10,
    },
    settingLabel: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    settingHint: {
        color: '#aaa',
        fontSize: 13,
        textAlign: 'center',
        marginTop: 8,
    },
})