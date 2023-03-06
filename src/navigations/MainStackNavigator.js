import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import ExploreScreen from '../screens/ExploreScreen';
import BottomTabNavigator from './BottomTabNavigator';
import NotificationScreen from '../screens/NotificationScreen';
import CommentScreen from '../screens/CommentScreen';
import {PostEditorScreen} from '../screens';

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
      <MainStack.Screen name="Comments" component={CommentScreen} />
      <MainStack.Screen name="PostEditor" component={PostEditorScreen} />
      {/* <MainStack.Screen name="Home" component={HomeScreen} /> */}
      {/* <MainStack.Screen name="Explore" component={ExploreScreen} /> */}
      {/* <MainStack.Screen name="Bookmark" component={BookmarkScreen} /> */}
    </MainStack.Navigator>
  );
}

export default MainStackNavigator;
