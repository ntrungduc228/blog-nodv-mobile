import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import ExploreScreen from '../screens/ExploreScreen';
import BottomTabNavigator from './BottomTabNavigator';
import NotificationScreen from '../screens/NofiticationScreen';

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
