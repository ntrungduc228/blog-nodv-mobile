// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import routesScreen from './routesScreen';

const BottomTab = createMaterialBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen name={routesScreen.Home} component={HomeScreen} />
      <BottomTab.Screen name={routesScreen.Explore} component={ExploreScreen} />
      <BottomTab.Screen
        name={routesScreen.Bookmark}
        component={BookmarkScreen}
      />
      <BottomTab.Screen name={routesScreen.Profile} component={ProfileScreen} />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
