import { View, Text, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import Stakebtn from './components/stakesbtn'
import Btn from './components/btn'


export default function stakes() {
    const [selectedStake, setSelectedStake] = useState<string | null>(null)
  
  return (
     <ImageBackground
             source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/piano/assets/bgcover.png' }}
             style={{ flex: 1, width: '100%', height: '100%', alignItems:"center", justifyContent:"center", gap:30 }}
             resizeMode='cover'
           >
            <Image source={{ uri: 'https://cdn.jsdelivr.net/gh/st-eve-code/app-assets@main/app/piano/assets/stakebanner.png' }} style={{marginTop: 12, width:280, height:100}} resizeMode='stretch'/>
        <Stakebtn onSelectStake={(stake) => setSelectedStake(stake)} />
        <Btn route = "/piano/searching" text="Play Now" color="#EC4949" />
        <Btn route = "/piano/home" text="Go Back" color="#00000066" />

    </ImageBackground>
  )
}