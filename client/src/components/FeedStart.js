import { View, Text, ImageBackground } from 'react-native'
import { Dimensions } from 'react-native'
import React from 'react'
import { ResizeMode, Video } from 'expo-av'
import { BlurView } from 'expo-blur'
import { ArrowDown } from 'lucide-react-native'

const FeedStart = ({ height }) => {
    return (
        <View
            style={{
                width: '100%',
                height: height + 1,
                marginBottom: Dimensions.get('window').height * 0.06,
            }}
        >
            <Video
                source={require('../../assets/video-bg-1.mp4')}
                isLooping
                shouldPlay
                resizeMode={ResizeMode.COVER}
                style={{ width: '100%', height: '100%', opacity: 1 }}
            />
            <BlurView
                intensity={100}
                tint="systemChromeMaterialDark"
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                }}
            >
                <Text className="absolute bottom-24 left-2 text-white text-[50px] opacity-80 font-extralight leading-[58px] w-80 tracking-wider">
                    Everything starts with a Sphere!
                </Text>
            </BlurView>
            <View
             className="absolute bottom-1 right-1 p-1 bg-transparent rounded-3xl opacity-10"
            >
                <ArrowDown size={20} color={"white"}/>
            </View>
        </View>
    )
}

export default FeedStart