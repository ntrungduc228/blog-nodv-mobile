import BookmarkScreen from '../screens/BookmarkScreen';
import BottomTabNavigator from './BottomTabNavigator';
import ExploreScreen from '../screens/ExploreScreen';
import HomeScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NofiticationScreen';
import {createStackNavigator} from '@react-navigation/stack';

const MainStack = createStackNavigator();

function MainStackNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="BottomTab"
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <MainStack.Screen name="Notifications" component={NotificationScreen} />

      {/* <MainStack.Screen name="Home" component={HomeScreen} /> */}
      {/* <MainStack.Screen name="Explore" component={ExploreScreen} /> */}
      {/* <MainStack.Screen name="Bookmark" component={BookmarkScreen} /> */}
    </MainStack.Navigator>
  );
}

export default MainStackNavigator;
