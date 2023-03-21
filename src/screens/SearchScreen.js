import {
  SearchPeopleTab,
  SearchStoriesTab,
  SearchTopicsTab,
} from '../features/explore/components';
import {createContext, useContext, useMemo, useState} from 'react';

import {Button} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Tab} from '../components';
import {TextInput} from 'react-native-gesture-handler';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

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
  const tabItems = useMemo(
    () => [
      {
        key: 'stories',
        title: 'Stories',
        component: SearchStoriesTab,
      },

      {
        key: 'people',
        title: 'People',
        component: SearchPeopleTab,
      },
      {
        key: 'topics',
        title: 'Topics',
        component: SearchTopicsTab,
      },
    ],
    [],
  );

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
              className="flex-1 ml-1 h-9 -mb-1"
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
        <Tab tabItems={tabItems} />
      </View>
    </SearchScreenContext.Provider>
  );
};
