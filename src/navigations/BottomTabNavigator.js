// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import BookmarkScreen from '../screens/BookmarkScreen';
import ExploreScreen from '../screens/ExploreScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import routesScreen from './routesScreen';
import {Button} from 'react-native-paper';
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
        name={routesScreen.Home}
        component={HomeScreen}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: 'magnify',
        }}
        name={routesScreen.Explore}
        component={ExploreScreen}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: 'bookmark-multiple-outline',
        }}
        name={routesScreen.Bookmark}
        component={BookmarkScreen}
      />
      <BottomTab.Screen
        options={{
          tabBarIcon: 'account-circle-outline',
        }}
        name={routesScreen.Profile}
        component={ProfileScreen}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
