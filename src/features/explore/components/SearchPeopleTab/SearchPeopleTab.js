import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import React, {useMemo} from 'react';
import {Text, View} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {UserItem} from '../../../user';
import {searchUser} from '../../../../api/userApi';
import {useInfiniteQuery} from 'react-query';
import {useSearchScreen} from '../../../../screens';

export const SearchPeopleTab = () => {
  const {searchValue} = useSearchScreen();
  const storeKey = ['users', searchValue];
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isSuccess,
    isFetching,
    refetch,
  } = useInfiniteQuery(
    storeKey,
    ({pageParam}) => searchUser(searchValue, pageParam, 5),
    {
      getNextPageParam: lastPage => {
        const {last, number} = lastPage;
        return last ? undefined : number + 1;
      },
      staleTime: 1000 * 60 * 60,
    },
  );
  const users = useMemo(() => {
    const allUsers = [];
    data?.pages.forEach(page => {
      return page.content.forEach(post =>
        allUsers.push({...post, page: page.number}),
      );
    });
    return allUsers;
  }, [data]);

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
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        ListEmptyComponent={
          <>
            {users.length <= 0 && (
              <View className="flex-1 items-center justify-center mt-10">
                <Text className="text-gray-500">
                  No users found for {searchValue}
                </Text>
              </View>
            )}
          </>
        }
      />
    </SafeAreaView>
  );
};
