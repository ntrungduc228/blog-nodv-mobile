// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import BookmarkScreen from '../screens/BookmarkScreen';
import ExploreScreen from '../screens/ExploreScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Button } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const BottomTab = createMaterialBottomTabNavigator();

function BottomTabNavigator() {

  return (
    <BottomTab.Navigator>

      <BottomTab.Screen
        options={{
          tabBarIcon: 'home',
        }}
        name="Home"
        component={HomeScreen}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: 'magnify',
        }}
        name="Explore"
        component={ExploreScreen}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: 'bookmark-multiple-outline',
        }}
        name="Bookmark"
        component={BookmarkScreen}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: 'account-circle-outline',
        }}
        name="Profile"
        component={ProfileScreen}
      />

    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
