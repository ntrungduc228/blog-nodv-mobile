// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {
  BookmarkListIcon,
  BookmarkListOutlineIcon,
  HomeIcon,
  HomeIconOutline,
  MagnifyingGlassIcon,
  MagnifyingGlassOutlineIcon,
} from '../components/icons';

import {Avatar} from 'react-native-paper';
import BookmarkScreen from '../screens/BookmarkScreen';
import ExploreScreen from '../screens/ExploreScreen';
import {HomeScreen} from '../screens/HomeScreen';
import {IconWrapper} from '../components';
import {PostCreateTrigger} from '../features/post';
import ProfileScreen from '../screens/ProfileScreen';
import {View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import routesScreen from './routesScreen';
import {useSelector} from 'react-redux';

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  const userAvatar = useSelector(state => state?.user?.data?.info?.avatar);

  return (
    <>
      <BottomTab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: 56,
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: '#000',
        }}>
        <BottomTab.Screen
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({color, focused}) => (
              <IconSwitch
                focused={focused}
                activeIcon={<HomeIcon color={color} />}
                inActiveIcon={<HomeIconOutline color={color} />}
              />
            ),
          }}
          name={routesScreen.Home}
          component={HomeScreen}
        />
        <BottomTab.Screen
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({color, focused}) => (
              <IconSwitch
                focused={focused}
                activeIcon={<MagnifyingGlassIcon color={color} />}
                inActiveIcon={<MagnifyingGlassOutlineIcon color={color} />}
              />
            ),
          }}
          name={routesScreen.Explore}
          component={ExploreScreen}
        />
        <BottomTab.Screen
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({color, focused}) => (
              <IconSwitch
                focused={focused}
                activeIcon={<BookmarkListIcon color={color} />}
                inActiveIcon={<BookmarkListOutlineIcon color={color} />}
              />
            ),
          }}
          name={routesScreen.Bookmark}
          component={BookmarkScreen}
        />
        <BottomTab.Screen
          options={{
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({focused, color}) => (
              <View
                style={{
                  borderRadius: 50,
                  borderWidth: focused ? 1 : 0,
                  borderColor: color,
                }}>
                <IconWrapper>
                  {userAvatar ? (
                    <Avatar.Image
                      size={24}
                      source={{
                        uri: userAvatar,
                      }}
                    />
                  ) : (
                    <Avatar.Icon size={24} icon="account" />
                  )}
                </IconWrapper>
              </View>
            ),
          }}
          name={routesScreen.Profile}
          component={ProfileScreen}
        />
      </BottomTab.Navigator>
      <PostCreateTrigger />
    </>
  );
}

const IconSwitch = ({focused, activeIcon, inActiveIcon}) => {
  return (
    <IconWrapper size={24}>{focused ? activeIcon : inActiveIcon}</IconWrapper>
  );
};

export default BottomTabNavigator;
