import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Ellipsis, Forward, Heart, MessageCircleMore, Plus } from 'lucide-react-native';

const VideoSideBar = ({ no_of_likes, no_of_comments, isLiked, user }) => {
  const processNumbers = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    } else {
      return num;
    }
  }
  return (
    <View className="flex flex-column gap-5 mr-[3px]">
      <View
        className="flex justify-center items-center"
        style={{
          paddingBottom: user.isFollowing ? 0 : 3,
        }}
      >
        <View className="relative"
          style={{
            paddingBottom: user.isFollowing ? 10 : 0,
          }}

        >
          <TouchableOpacity>
            <Image
              source={require('../../assets/th.jpeg')}
              style={{
                width: 40,
                height: 40,
                borderRadius: 30,
                borderWidth: 2,
                borderColor: 'whitesmoke',
              }}
            />
          </TouchableOpacity>
          {
            user.isFollowing && (
              <TouchableOpacity className="absolute bg-red-500 opacity-90 rounded-full p-1 right-[26%] bottom-0">
                <Plus size={12} strokeWidth={3.5} color={"white"} />
              </TouchableOpacity>
            )
          }
        </View>
      </View>
      <TouchableOpacity
        className="flex justify-center items-center"
      >
        {
          isLiked ? <Heart size={35} strokeWidth={1.65} fill={"#fe3d53"} /> : <Heart size={30} strokeWidth={1.65} color={"white"} />
        }
        <Text
          className="text-white text-xs font-medium mt-1"
        >
          {processNumbers(no_of_likes)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex justify-center items-center"
      >
        <MessageCircleMore size={35} strokeWidth={1.65} color={"white"} />
        <Text
          className="text-white text-xs font-medium mt-1"
        >
          {processNumbers(no_of_comments)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex justify-center items-center"
      >
        <Forward size={32} strokeWidth={1.65} color={"white"} />
        <Text
          className="text-white text-xs font-medium text-center"
        >
          Share
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="flex justify-center items-center"
      >
        <Ellipsis size={25} strokeWidth={1.65} color={"white"} />
      </TouchableOpacity>
    </View>
  )
}

export default VideoSideBar