import { View, Text, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { Skeleton } from 'moti/skeleton';
import LottieView from 'lottie-react-native';

const Search = () => {
  const height = Dimensions.get('window').height - (Dimensions.get('window').height) * 0.06
  return (
    <ScrollView
      scrollEnabled
      showsVerticalScrollIndicator
      style={{
        marginBottom: (Dimensions.get('window').height) * 0.06
      }}
    >
      <View
        style={{
          width: "100%",
          height: height,
          backgroundColor: 'yellow',
        }}
      >
      </View>
      <View
        style={{
          width: '100%',
          height: height,
          backgroundColor: 'red',
        }}
      >
        <LottieView
          source={require('../../assets/loading4.json')}
          autoPlay
          speed={0.5}
          
          backgroundColor={'transparent'}
          style={{
            width: "10%",
            height: "10%",
            marginBottom: "0%",
            backgroundColor: 'transparent',
            
          }}
          
        />
      </View>
      <View
        style={{
          width: "100%",
          height: height,
          backgroundColor: 'blue',
        }}
      >
      </View>
      <View
        style={{
          width: '100%',
          height: height,
          backgroundColor: 'green',
        }}
      >
      </View>
      <Skeleton
        from={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        duration={1000}
        style={{
          position: 'absolute',
          width: '100%',
          height: 400,
          zIndex: 2,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      />
    </ScrollView>
  )
}

export default Search