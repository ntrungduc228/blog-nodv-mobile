import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import React, {useMemo} from 'react';
import {Text, View} from 'react-native';

import {FollowItem} from './FollowScreen';
import {ScreenLayoutBack} from './components';
import {getFollowing} from '../api/userApi';
import {useInfiniteQuery} from 'react-query';
import {useSelector} from 'react-redux';

export const FollowingScreen = () => {
  const profileId = useSelector(state => state.profile.data?.id);
  const storeKey = ['following', profileId];
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isSuccess,

    refetch,
  } = useInfiniteQuery(
    storeKey,
    ({pageParam}) =>
      getFollowing(profileId, {
        page: pageParam,
        size: 10,
      }),
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
    <ScreenLayoutBack>
      <ScreenLayoutBack.Header title={'Following'} />
      <ScreenLayoutBack.Body>
        <FlatList
          className=""
          data={users}
          keyExtractor={item => item.id}
          renderItem={({item}) => <FollowItem item={item} />}
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
              {users.length <= 0 && isSuccess && (
                <View className="flex-1 items-center justify-center mt-10">
                  <Text className="text-gray-500">No followers</Text>
                </View>
              )}
            </>
          }
        />
      </ScreenLayoutBack.Body>
    </ScreenLayoutBack>
  );
};
