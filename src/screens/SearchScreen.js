import {
  SearchPeopleTab,
  SearchStoriesTab,
  SearchTopicsTab,
} from '../features/explore/components';
import {StyleSheet, View} from 'react-native';
import {createContext, useContext, useState} from 'react';

import {Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput} from 'react-native-gesture-handler';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();
const SearchScreenContext = createContext({
  searchValue: '',
  setSearchValue: () => {},
});

export const useSearchScreen = () => {
  return useContext(SearchScreenContext);
};

export const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState('');
  return (
    <SearchScreenContext.Provider
      value={{
        searchValue,
        setSearchValue,
      }}>
      <View className="bg-white">
        <View className="flex-row items-center mt-4 py-4 border-b border-gray-200">
          <View className="flex-row flex-1 items-center h-9 ml-6 rounded-lg bg-gray-100 px-3">
            <MaterialCommunityIcons name="magnify" size={24} color="gray" />
            <TextInput
              autoFocus
              className="flex-1 ml-1"
              placeholder="Search on NODV"
              value={searchValue}
              onChange={e => setSearchValue(e.nativeEvent.text)}
            />
          </View>
          <Button
            mode="text"
            textColor="green"
            onPress={() => navigation.goBack()}>
            Cancel
          </Button>
        </View>
        <SearchTab />
      </View>
    </SearchScreenContext.Provider>
  );
};

const SearchTab = () => {
  return (
    <View className="h-full w-full">
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
          name="StoriesTab"
          component={SearchStoriesTab}
          options={{
            title: 'Stories',
          }}
        />
        <Tab.Screen
          name="PeopleTab"
          component={SearchPeopleTab}
          options={{
            title: 'People',
          }}
        />
        <Tab.Screen
          name="TopicsTab"
          component={SearchTopicsTab}
          options={{
            title: 'Topics',
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const Styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 13,
    textTransform: 'none',
  },
  tabBarItemStyle: {width: 80},
  tabBarStyle: {
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    shadowColor: 'transparent',
    elevation: 0,
  },
  tabBarIndicatorStyle: {
    backgroundColor: '#767373',
    width: 50,
    height: 1,
    marginLeft: 19,
  },
});
