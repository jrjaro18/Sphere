import { View, Text, FlatList, Dimensions, TouchableOpacity } from 'react-native'
import constants from 'expo-constants'
import React, { useState, useEffect, useRef } from 'react'
import Video from '../components/Video'
import LottieView from 'lottie-react-native';
import FeedEnd from '../components/FeedEnd';
import FeedStart from '../components/FeedStart';
import FeedEnd2 from '../components/FeedEnd2';

const Home = () => {
    const height = Dimensions.get('window').height * 0.94
    const [visibleIndex, setVisibleIndex] = useState(null);

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        // Get the index of the first visible item
        const visibleIndex = viewableItems.length > 0 ? viewableItems[0].item.id : null;
        setVisibleIndex(visibleIndex);
    }).current;

    // const Header = () => {
    //     if (visibleIndex == -1 || visibleIndex == -2) {
    //         return null
    //     } else {
    //         return (

    //             <View className="absolute top-10 w-full z-50">
    //                 <View className="flex justify-center items-center flex-row gap-x-6">
    //                     <TouchableOpacity>
    //                         <Text className="text-white text-xl font-normal opacity-60">Following</Text>
    //                     </TouchableOpacity>
    //                     <TouchableOpacity>
    //                     <Text className="text-white opacity-60 text-xl font-normal">Trending</Text>
    //                     </TouchableOpacity>
    //                 </View>
    //             </View>
    //         )
    //     }
    // }


    return (
        <>
            <FlatList
                data={tempVal}
                renderItem={({ item }) => {
                    if (item.url === 'welcome') {
                        return <FeedStart height={height} />
                    } else if (item.url === 'unknown') {
                        return <FeedEnd2 height={height} />;
                    } else {
                        return (
                            <View
                                style={{
                                    width: '100%',
                                    height: height + 1,
                                    marginBottom: Dimensions.get('window').height * 0.061,
                                }}
                            >
                                <Video item={item} visibleIndex={visibleIndex} />
                            </View>
                        );
                    }
                }}

                keyExtractor={(item) => item.id}
                pagingEnabled
                snapToAlignment="start"
                decelerationRate={0.65}
                showsVerticalScrollIndicator={false}
                className="bg-black"
                windowSize={5}
                initialNumToRender={5}
                maxToRenderPerBatch={5}
                removeClippedSubviews={true}
                onViewableItemsChanged={onViewableItemsChanged}
            />
        </>
    )
}

export default Home

const tempVal = [
    // {
    //     id: 1,
    //     url: "quest"
    // },
    // {
    //     id: 2,
    //     url: "pain"
    // },
    {
        id: -1,
        url: "welcome"
    },
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
    {
        id: 10,
        url: "https://videos.pond5.com/1960s-members-black-panther-party-footage-084721588_main_xxl.mp4",
        title: "1960s: Members of the Black Panther Party in Footage 🎥🐈‍⬛",
        no_of_likes: 2000000,
        no_of_comments: 10000,
        no_of_views: 10000000,
        isLiked: true,
        user: {
            username: "jrjaro18",
            userimage: "userimage",
            isFollowing: false
        }
    },
    {
        id: -2,
        url: "unknown",
    }
]