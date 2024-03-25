import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Constants from 'expo-constants';
import { Platform, View, TouchableOpacity, Dimensions } from 'react-native';
import { CircleUserRound, Home as HomeIcon, Search as SearchIcon, UsersRound, CirclePlus } from 'lucide-react-native'

import Home from './src/screens/Home';
import Search from './src/screens/Search';
import Space from './src/screens/Space';
import Profile from './src/screens/Profile';
import Add from './src/screens/Add';

const Tab = createBottomTabNavigator();
const statusBarHeight = Constants.statusBarHeight;
export default function App() {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: statusBarHeight,
        backgroundColor: 'rgb(0 0 0)',
      }}
    >
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              elevation: 0,
              backgroundColor: 'rgb(0 0 0)',
              // borderRadius: 10,
              borderColor: 'transparent',
              height: Dimensions.get('window').height * 0.06,
            },
          }}
        >
          <Tab.Screen name="Home"
            component={Home}
            options={{
              headerShown: false,
              tabBarLabel: 'Home',
              tabBarIcon: ({ focused }) => {
                return (
                  focused ? <HomeIcon strokeWidth={2} color={"white"} size={28} /> : <HomeIcon strokeWidth={1.5} color={"lightgray"} />
                )
              },
            }}  
          />
          <Tab.Screen
            name="Search"
            component={Search}
            options={{
              headerShown: false,
              tabBarLabel: 'Search',
              tabBarIcon: ({ focused }) => {
                return (
                  focused ? <SearchIcon strokeWidth={2.5} color={"white"} size={28} /> : <SearchIcon strokeWidth={1.5} color={"lightgray"} />
                )
              },
            }}
          />
          <Tab.Screen
            name="Add"
            component={Add}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => {
                return (
                  focused ? <CirclePlus strokeWidth={1.5} color={"white"} size={44} /> : <CirclePlus strokeWidth={1} size={44} color={"white"} />
                )
              },
              unmountOnBlur: true,
            }}
          />
          <Tab.Screen
            name="Space"
            component={Space}
            options={{
              headerShown: false,
              tabBarLabel: 'Space',
              tabBarIcon: ({ focused }) => {
                return (
                  focused ? <UsersRound strokeWidth={2} color={"white"} size={28} /> : <UsersRound strokeWidth={1.5} color={"lightgray"} />
                )
              },

            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            // initialParams
            initialParams={{ isEditable: true }}
            options={{
              headerShown: false,
              tabBarLabel: 'You',
              tabBarIcon: ({ focused }) => {
                return (
                  focused ? <CircleUserRound strokeWidth={1.75} color={"white"} size={30} /> : <CircleUserRound strokeWidth={1.5} color={"lightgray"} />
                )
              },

            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}