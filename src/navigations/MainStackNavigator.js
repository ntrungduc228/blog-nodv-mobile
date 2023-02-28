import {PostDetailScreen, PostEditorScreen} from '../screens';

import BottomTabNavigator from './BottomTabNavigator';
import NotificationScreen from '../screens/NotificationScreen';
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
      <MainStack.Screen
        options={{
          headerShown: false,
        }}
        name="PostEditor"
        component={PostEditorScreen}
      />
      <MainStack.Screen
        options={{headerShown: false}}
        name="PostDetail"
        component={PostDetailScreen}
      />

      {/* <MainStack.Screen name="Home" component={HomeScreen} /> */}
      {/* <MainStack.Screen name="Explore" component={ExploreScreen} /> */}
      {/* <MainStack.Screen name="Bookmark" component={BookmarkScreen} /> */}
    </MainStack.Navigator>
  );
}

export default MainStackNavigator;
