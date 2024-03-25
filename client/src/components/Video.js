import { View, Text, TouchableOpacity, Image, Animated, Pressable } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Video as VideoExpo, ResizeMode } from 'expo-av';
import * as VideoThumbnails from 'expo-video-thumbnails';
import VideoSideBar from './VideoSideBar';
import { Skeleton } from 'moti/skeleton';

const Video = ({ item, visibleIndex }) => {
  const video = useRef(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [status, setStatus] = useState({});
  const [posterSource, setPosterSource] = useState(null);

  useEffect(() => {
    const loadPoster = async () => {
      try {
        const { uri } = await VideoThumbnails.getThumbnailAsync(item.url, {
          time: 0, // Get the thumbnail at the beginning of the video
        });
        setPosterSource({ uri });
      } catch (error) {
        console.error('Error getting thumbnail:', error);
      }
    };

    loadPoster();
  }, [item.url]);

  return (
    <TouchableOpacity
    activeOpacity={0.9}
      className="h-full bg-stone-900"
      onPress={() => {
        if (video.current) {
          if (status.isPlaying) {
            video.current.pauseAsync();
          } else {
            video.current.playAsync();
          }
        }
      }}
    >
      {!posterSource && (
        <View style={{ position: 'absolute', height: '100%', width: '100%', zIndex: 40 }}>
          <Skeleton
            from={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            height={'100%'}
            width={'100%'}
            duration={1000}
            colorMode={'dark'}
            radius={0}
          >

          </Skeleton>
        </View>
      )}

      <VideoExpo
        ref={video}
        style={{ width: '100%', height: '100%' }}
        source={{ uri: item.url }}
        useNativeControls={false}
        resizeMode={ResizeMode.COVER}
        isLooping
        onPlaybackStatusUpdate={setStatus}
        onLoad={() => {
          console.log('Video loaded');
          setVideoLoaded(true);
        }}
        shouldPlay={visibleIndex === item.id}
        usePoster={true}
        posterSource={posterSource}
        posterStyle={{
          resizeMode: 'cover',
        }}
      />

      {
        videoLoaded && posterSource && (
          <>
            <View style={{ position: 'absolute', right: 1, bottom: 12, zIndex: 30 }}>
              <VideoSideBar no_of_likes={item.no_of_likes} no_of_comments={item.no_of_comments} isLiked={item.isLiked} user={item.user} />
            </View>

            <View style={{ position: 'absolute', bottom: 5, left: 3, padding: 4, zIndex: 20, width: "88%", }}>
              <View className="flex gap-y-2">
                <View className="flex flex-row gap-x-1 items-center">
                  <Text
                    className="text-white font-medium text-sm tracking-wider"
                  >
                    @{item.user.username}
                  </Text>
                  <Text
                    className="text-stone-300 font-normal text-xs"
                  >
                    • 4h ago
                  </Text>
                </View>
                <Text
                  className="text-white font-light tracking-wide text-sm leading-6"
                >
                  {item.title}
                </Text>
              </View>
            </View>
          </>
        )
      }
    </TouchableOpacity>
  );
};

export default Video;

