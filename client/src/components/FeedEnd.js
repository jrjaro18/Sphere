import { View, Text } from 'react-native'
import { Dimensions } from 'react-native'
import LottieView from 'lottie-react-native'
import React from 'react'

const FeedEnd = ({height}) => {
    return (
        <View
            style={{
                width: '100%',
                height: height + 1,
                marginBottom: Dimensions.get('window').height * 0.06,
            }}
            className="bg-stone-950 pt-40"
        >
            <LottieView
                source={require('../../assets/empty.json')}
                autoPlay
                loop
                style={{ width: '100%', height: '60%', marginBottom: '0%' }}
                className=""
            />
            <Text className="text-white text-3xl font-extralight text-center">
                You're all caught up!
            </Text>
        </View>
    )
}

export default FeedEnd