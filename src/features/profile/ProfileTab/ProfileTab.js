import {StyleSheet, Text, View} from 'react-native';

import {AboutTab} from './AboutTab';
import {ListsTab} from './ListsTab';
import React from 'react';
import {StoryTab} from './StoryTab';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSelector} from 'react-redux';

const Tab = createMaterialTopTabNavigator();

export const ProfileTab = () => {
  const profile = useSelector(state => state?.profile?.data);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: Styles.tabBarLabel,
        tabBarItemStyle: Styles.tabBarItemStyle,
        tabBarStyle: Styles.tabBarStyle,
        tabBarPressColor: '#d7cbcb',
        tabBarIndicatorStyle: Styles.tabBarIndicatorStyle,
        // tabBarGap: 0,
      }}>
      <Tab.Screen
        name="StoryTab"
        component={StoryTab}
        options={{
          title: 'Stories',
        }}
      />
      {profile?.isOwnProfile && (
        <Tab.Screen
          name="ListsTab"
          component={ListsTab}
          options={{
            title: 'Lists',
          }}
        />
      )}
      <Tab.Screen
        name="AboutTab"
        component={AboutTab}
        options={{
          title: 'About',
        }}
      />
    </Tab.Navigator>
  );
};

const Styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 14,
    textTransform: 'none',
  },
  tabBarItemStyle: {width: 80},
  tabBarStyle: {backgroundColor: '#fff'},
  tabBarIndicatorStyle: {
    backgroundColor: '#767373',
    width: 50,
    marginLeft: 16,
  },
});
