import {
  PostDetailScreen,
  PostEditorScreen,
  CommentScreen,
  SettingsScreen,
  ProfileEditScreen,
  NotFoundScreen,
} from '../screens';

import BottomTabNavigator from './BottomTabNavigator';
import NotificationScreen from '../screens/NotificationScreen';
import {createStackNavigator} from '@react-navigation/stack';
import routesScreen from './routesScreen';

const MainStack = createStackNavigator();

function MainStackNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={routesScreen.BottomTab}
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{headerShown: false}}
      />
      <MainStack.Screen
        options={{
          headerShown: false,
        }}
        name={routesScreen.PostEditor}
        component={PostEditorScreen}
      />
      <MainStack.Screen
        options={{headerShown: false}}
        name={routesScreen.PostDetail}
        component={PostDetailScreen}
      />
      <MainStack.Screen
        options={{headerShown: false}}
        name="NotFound"
        component={NotFoundScreen}
      />
      <MainStack.Screen
        name={routesScreen.Settings}
        component={SettingsScreen}
      />
      <MainStack.Screen
        options={{headerShown: false}}
        name={routesScreen.ProfileEdit}
        component={ProfileEditScreen}
      />

      <MainStack.Screen name={routesScreen.Comment} component={CommentScreen} />
    </MainStack.Navigator>
  );
}

export default MainStackNavigator;
