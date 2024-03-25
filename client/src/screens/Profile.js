import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, Image, Animated, Dimensions, ActivityIndicator, TouchableOpacity, Touchable, Modal, Pressable } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { BlurView } from 'expo-blur';
import { Ellipsis } from 'lucide-react-native';

const Profile = ({ route, isEditable }) => {

  const scrollY = useRef(new Animated.Value(0)).current;
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const [thumbnails, setThumbnails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showImage, setShowImage] = useState(false);

  const checkEditable = route.params.isEditable ? route.params.isEditable : isEditable;

  console.log("screen loaded"); 

  useEffect(() => {
    setIsLoading(true);
    console.log("UseEffect running")
    const fetchThumbnails = async () => {
      try {
        const thumbnailPromises = shorts.map(async (short) => {
          const { uri } = await VideoThumbnails.getThumbnailAsync(short.url, {
            time: 0,
            quality: 1,
          });
          return { uri };
        });
        const thumbnails = await Promise.all(thumbnailPromises);
        setThumbnails(thumbnails);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchThumbnails();
  }, []);

  const processNumbers = (num) => {
    if (num >= 1000000) {
      return [(num / 1000000).toFixed(1), 'M'];
    } else if (num >= 1000) {
      return [(num / 1000).toFixed(1), 'K'];
    } else {
      return [num, ""];
    }
  }

  return (
    <View className="flex-1 bg-stone-950">
      {/* options */}
      <TouchableOpacity activeOpacity={0.5} className="absolute top-1 right-1 z-30 p-1 bg-black rounded-full opacity-20"
        onPress={() => console.log("Options pressed")}
      >
        <Ellipsis size={22} strokeWidth={1.5} color={"white"} />
      </TouchableOpacity>
      {/* Photo Modal */}
      <Modal
        visible={showImage}
        transparent={true}
        animationType="fade"
        //  speed up the modal animation
        hardwareAccelerated
      >
        <Pressable
          onPress={() => setShowImage(false)}
          className="flex-1"

        >
          <BlurView
            intensity={100}
            tint="systemUltraThinMaterial"
            style={{
              position: 'absolute',
              zIndex: 10,
              height: windowHeight,
              width: windowWidth,
            }}
          >
            <View
              className="flex-1 justify-center items-center"
            >
              <Image
                source={require('../../assets/th-3.jpg')}
                style={{
                  height: windowHeight * 0.3,
                  width: windowHeight * 0.3,
                  borderRadius: 10,
                }}
              />
            </View>
          </BlurView>
        </Pressable>
      </Modal>
      {/* ScrollView */}
      <ScrollView
        style={{ zIndex: 30, }} // Adjust this value to give space for scrolling
        scrollEventThrottle={0}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: false })}
        className="pt-[35vh] absolute w-full h-[75vh] bottom-0"
        snapToInterval={windowHeight * 0.35}
        decelerationRate={'fast'}
      >

        <View style={{
          minHeight: windowHeight * 1.1,
        }}>
          {/* Info Tabs */}
          <View className="flex flex-row justify-center items-center gap-x-10 my-1">
            <TouchableOpacity className="flex items-center justify-center">
              <Text className="text-white text-lg font-semibold">
                65.4M
              </Text>
              <Text className="text-gray-200 text-base tracking-wide font-light">
                Followers
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex items-center justify-center border-x-[1px] border-neutral-800 px-8">
              <Text className="text-white text-lg font-semibold">
                45
              </Text>
              <Text className="text-gray-200 text-base tracking-wide font-light">
                Following
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex items-center justify-center">
              <Text className="text-white text-lg font-semibold">
                1.43B
              </Text>
              <Text className="text-gray-200 text-base tracking-wide font-light">
                Likes
              </Text>
            </TouchableOpacity>
          </View>

          {/* Bio */}
          <View className="p-2 mt-1">
            <Text className="text-neutral-300 text-sm py-[2px] px-1 bg-stone-800 w-9 text-center rounded-md">
              Bio
            </Text>
            <Text className="text-white px-1 mt-1 tracking-wide text-justify  leading-[22px]">
              Yo! Tom Holland here. I'm an actor and a dancer. I love to play cricket and football! 🕷️ Also known as your friendly neighbourhood spiderman!
            </Text>
          </View>

          {/* Edit Profile */}
          {
            checkEditable ? (
              <TouchableOpacity className="flex items-center justify-center bg-stone-800 py-2 mx-2 rounded-md mt-1">
                <Text className="text-white text-lg font-semibold">
                  Edit Profile
                </Text>
              </TouchableOpacity>
            ) : (
              null
            )
          }

          {/* Videos */}
          <View className="p-2 mt-2">
            <Text className="text-neutral-300 text-sm py-[3px] px-1 bg-stone-800 w-16 text-center rounded-md">
              Videos
            </Text>
            {
              isLoading ? (
                <View
                  className="w-full mx-auto mt-2"
                >
                  <ActivityIndicator size="large" color="lightgray" />
                </View>
              ) : (
                <View className="flex flex-row flex-wrap mb-[352px] mt-2 ml-1">
                  {thumbnails.map((thumbnail, index) => (
                    <TouchableOpacity key={index} className="w-[33.3%] relative border-r-2 border-b-2">
                      <Image
                        source={{ uri: thumbnail.uri }}
                        style={{
                          height: windowHeight * 0.28,
                          width: '100%',
                        }}
                      />
                      <View className="absolute bottom-0 right-1">
                        <Text className="font-bold text-xs opacity-70 text-white">
                          {shorts[index] ? parseInt(processNumbers(shorts[index].no_of_views)[0]) + processNumbers(shorts[index].no_of_views)[1] : null}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )
            }
          </View>
        </View>
      </ScrollView >

      {/* Banner Image */}
      <Animated.View
        style={{
          height: windowHeight * 0.5, // Adjust this value for the initial height of the image
          width: '100%',
          position: 'absolute',
          zIndex: 20,
          top: 0,
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, windowHeight * 0.3],
                outputRange: [0, -windowHeight * 0.3],
                extrapolate: 'clamp',
              }),
            },
            {
              scaleX: scrollY.interpolate({
                inputRange: [0, windowHeight * 0.3],
                outputRange: [1, 1.1],
                extrapolate: 'clamp',
              }),
            }
          ],
        }}>
        <Image
          style={{
            flex: 1,
            width: '100%',
            zIndex: 10,
          }}
          className="rounded-b-2xl"
          source={require('../../assets/th-3.jpg')}
          resizeMode="cover"
          blurRadius={25}
        />
      </Animated.View>

      {/* Profile Image */}
      <TouchableOpacity
        className="z-50"
        onPressIn={() => {
          console.log("Image pressed");
          setShowImage(true);
        }}
      >
        <Animated.Image
          className="rounded-full"
          source={require('../../assets/th-3.jpg')}
          resizeMode="cover"
          style={{
            height: windowWidth * 0.2,
            width: windowWidth * 0.2,
            position: 'absolute',
            top: windowHeight * 0.45,
            left: windowWidth * 0.4,
            zIndex: 50,
            transform: [
              {
                translateX: scrollY.interpolate({
                  inputRange: [0, windowHeight * 0.3],
                  outputRange: [0, -windowWidth * 0.4 + 15],
                  extrapolate: 'clamp',
                }),
              },
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, windowHeight * 0.3],
                  outputRange: [0, -windowWidth * 0.65],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
        />
      </TouchableOpacity>

      {/* Name */}
      <Animated.Text
        style={{
          width: '100%',
          position: 'absolute',
          zIndex: 30,
          top: windowHeight * 0.5,
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [windowHeight * 0.02, windowHeight * 0.3],
                outputRange: [-windowHeight * 0.1, -windowHeight * 0.335],
                extrapolate: 'clamp',
              }),
            },
            {
              translateX: scrollY.interpolate({
                inputRange: [windowHeight * 0.15, windowHeight * 0.3],
                outputRange: [windowWidth * 1.2, -windowWidth * 0.03],
                extrapolate: 'clamp',
              }),
            },

          ],
        }}
        className="text-white text-base font-light text-right tracking-wide"
      >
        @your_friendly_neighbourhood_spidey
      </Animated.Text>

      {/* Username */}
      <Animated.Text
        style={{
          width: '100%',
          position: 'absolute',
          zIndex: 30,
          top: windowHeight * 0.5,
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [windowHeight * 0.02, windowHeight * 0.3],
                outputRange: [-windowHeight * 0.1, -windowHeight * 0.295],
                extrapolate: 'clamp',
              }),
            },
            {
              translateX: scrollY.interpolate({
                inputRange: [windowHeight * 0.15, windowHeight * 0.3],
                outputRange: [windowWidth * 1.2, -windowWidth * 0.03],
                extrapolate: 'clamp',
              }),
            },

          ],
        }}
        className="text-white text-base font-light text-right tracking-wide"
      >
        Tom Holland
      </Animated.Text>

      {/* Name */}
      <Animated.Text
        style={{
          width: '100%',
          position: 'absolute',
          zIndex: 30,
          top: windowHeight * 0.5,
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [windowHeight * 0.01, windowHeight * 0.3],
                outputRange: [windowHeight * 0.05, -windowHeight * 0.3],
                extrapolate: 'clamp',
              }),
            },
          ],
          opacity: scrollY.interpolate({
            inputRange: [0, windowHeight * 0.25],
            outputRange: [1, 0],
            extrapolate: 'clamp',
          }),
        }}
        className="text-white text-2xl mt-1 font-light text-center"
      >
        Tom Holland
      </Animated.Text>
    </View >

  );
};

export default Profile;

const shorts = [
  {
    id: 1,
    url: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/vertical-videos/2.mp4",
    title: "Time Lapse Video of a City #shorts 🌇🌆🌃",
    no_of_likes: 2000000,
    no_of_comments: 10000,
    no_of_views: 10000000,
    isLiked: true,
    user: {
      username: "jrjaro18",
      userimage: "user_image",
      isFollowing: false
    }
  },
  {
    id: 3,
    url: "https://player.vimeo.com/progressive_redirect/playback/757911876/rendition/540p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=484117547f0aeab734e86a9ab5c4721c8d6d2e30b67bbc5c13765bde1ceeaba2",
    title: "#GRWM: My Everyday Makeup Routine",
    no_of_likes: 2000000,
    no_of_comments: 10000,
    no_of_views: 10000000,
    isLiked: true,
    user: {
      username: "jrjaro18",
      userimage: "user_image",
      isFollowing: false
    }
  },
  {
    id: 5,
    url: "https://player.vimeo.com/progressive_redirect/playback/511524889/rendition/540p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=4d52ef800b08365411c12d7f7e42220f7f14073080942d27ccd58245019b3089",
    title: "Bitcoin: The End of Money as We Know It",
    no_of_likes: 200000,
    no_of_comments: 1000,
    no_of_views: 1000000,
    isLiked: false,
    user: {
      username: "jrjaro18",
      userimage: "userimage",
      isFollowing: true
    }
  },
  {
    id: 6,
    url: "https://player.vimeo.com/progressive_redirect/playback/539033394/rendition/720p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=18a9908d40f7521bb74b23982fa8315fdddc29ced0753e5c1e451473ed8df402",
    title: "Stock Market Crash 2022: What You Need to Know! What to do next!? #market #stock #marketcrash",
    no_of_likes: 20000,
    no_of_comments: 3000,
    no_of_views: 100000,
    isLiked: false,
    user: {
      username: "jrjaro18",
      userimage: "userimage",
      isFollowing: false
    }
  },
  {
    id: 7,
    url: "https://player.vimeo.com/progressive_redirect/playback/489273797/rendition/540p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=e7b4b77e019a702d9ab94d12d4dcb685570fd167fcb28919898d8487717ecb85",
    title: "The Future of Gaming: What to Expect in 2022",
    no_of_likes: 2000000,
    no_of_comments: 10000,
    no_of_views: 10000000,
    isLiked: false,
    user: {
      username: "jrjaro18",
      userimage: "userimage",
      isFollowing: false
    }
  },
  {
    id: 8,
    url: "https://player.vimeo.com/progressive_redirect/playback/389786356/rendition/540p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=70663dc5f66db4da3acb0792e69f3132722a5c9279010b4b16f8cfc9433d5bd3",
    title: "Let's Do Some Excercise! #FitnessGoals 2022 🏋️‍♂️🏋️‍♀️",
    no_of_likes: 200000,
    no_of_comments: 1000,
    no_of_views: 1000000,
    isLiked: false,
    user: {
      username: "jrjaro18",
      userimage: "userimage",
      isFollowing: true
    }
  },
  {
    id: 9,
    url: "https://player.vimeo.com/progressive_redirect/playback/402571180/rendition/540p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=7872b018fcf0de5c6e4fb3657c1f3314b9fb3cc2c3acac353f37e9d5cdbec433",
    title: "Blossom: The Story of a Flower 🌸! ",
    no_of_likes: 20000,
    no_of_comments: 3000,
    no_of_views: 100000,
    isLiked: true,
    user: {
      username: "jrjaro18",
      userimage: "userimage",
      isFollowing: false
    }
  },
]