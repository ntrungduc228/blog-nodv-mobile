import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import {Text, View} from 'react-native';

import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {UserItem} from '../../../user';
import {searchUser} from '../../../../api/userApi';
import {useQuery} from 'react-query';
import {useSearchScreen} from '../../../../screens';

export const SearchPeopleTab = () => {
  const {searchValue} = useSearchScreen();
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery(['searchPeople', searchValue], () => searchUser(searchValue), {
    enabled: searchValue.length > 0,
    staleTime: 1000 * 60 * 60,
  });

  return (
    <SafeAreaView className="bg-white h-full pb-48">
      <FlatList
        className="px-6 pt-6"
        data={users}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View className="mb-4">
            <UserItem user={item} />
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        ListEmptyComponent={
          <>
            {!isLoading && (
              <View className="flex-1 items-center justify-center mt-10">
                <Text className="text-gray-500">No posts</Text>
              </View>
            )}
          </>
        }
      />
    </SafeAreaView>
  );
};
