// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Button } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const BottomTab = createMaterialBottomTabNavigator();

function BottomTabNavigator() {

  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name="home" component={HomeScreen} options={{
        tabBarLabel: '',
        tabBarIcon: ({ color }) => (
          <FontAwesome name="home" color={color} size={26} />
        ),
      }} />
      <BottomTab.Screen name="Explore" component={ExploreScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="search" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen name="Bookmark" component={BookmarkScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bookmark" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen name="Profile" component={ProfileScreen}>

      </BottomTab.Screen>


    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
