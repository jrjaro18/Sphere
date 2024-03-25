import { View, Text, ImageBackground } from 'react-native'
import { Dimensions } from 'react-native'
import React from 'react'

const FeedEnd2 = ({height}) => {
  return (
    <ImageBackground
    source={require('../../assets/image-bg-1.gif')}
    style={{
        width: '100%',
        height: height + 1,
        marginBottom: Dimensions.get('window').height * 0.06,
    }}
    className="bg-black p-2"
>

    <Text className="absolute bottom-36 left-2 text-white text-[50px] opacity-80 font-extralight leading-[58px] w-80 tracking-wider">
        Everything will End with a Sphere!
    </Text>
</ImageBackground>
  )
}

export default FeedEnd2