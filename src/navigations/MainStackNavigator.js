import {
  CommentScreen,
  FollowScreen,
  NotFoundScreen,
  PostDetailScreen,
  PostEditorScreen,
  ProfileEditScreen,
  SearchScreen,
  SettingsScreen,
  TopicScreen,
} from '../screens';

import BottomTabNavigator from './BottomTabNavigator';
import {FollowersScreen} from '../screens/FollowersScreen';
import {FollowingScreen} from '../screens/FollowingScreen';
import NotificationScreen from '../screens/NotificationScreen';
import Topic from '../features/home/Topic';
import People from '../features/home/People';
import TopicYouFollow from '../features/home/TopicYouFollow';
import {createStackNavigator} from '@react-navigation/stack';
import routesScreen from './routesScreen';

const MainStack = createStackNavigator();

function MainStackNavigator() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={routesScreen.BottomTab}
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />

      <MainStack.Screen
        name="Notifications"
        component={NotificationScreen}
        options={{title: 'Notifications'}}
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
        name={routesScreen.NotFound}
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
      <MainStack.Screen
        options={{headerShown: false}}
        name={routesScreen.Search}
        component={SearchScreen}
      />
      <MainStack.Screen
        options={{headerShown: false}}
        name={routesScreen.PostsTopic}
        component={TopicScreen}
      />
      <MainStack.Screen
        options={{headerShown: false}}
        name={routesScreen.Follow}
        component={FollowScreen}
      />
      <MainStack.Screen
        options={{headerShown: false}}
        name={routesScreen.Followers}
        component={FollowersScreen}
      />
      <MainStack.Screen
        options={{headerShown: false}}
        name={routesScreen.Following}
        component={FollowingScreen}
      />
      <MainStack.Screen
        options={{headerShown: false}}
        name={routesScreen.FollowGeneral}
        component={Topic}
      />
      <MainStack.Screen
        options={{headerShown: false}}
        name="Topic you follow"
        component={TopicYouFollow}
      />
      <MainStack.Screen
        options={{headerShown: false}}
        name="Customize your interests"
        component={Topic}
      />
      <MainStack.Screen
        options={{headerShown: false}}
        name="People you follow"
        component={People}
      />
      <MainStack.Screen name={routesScreen.Comment} component={CommentScreen} />
    </MainStack.Navigator>
  );
}

export default MainStackNavigator;
