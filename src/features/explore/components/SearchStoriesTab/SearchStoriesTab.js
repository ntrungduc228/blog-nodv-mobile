import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import {SafeAreaView, Text, View} from 'react-native';

import Post from '../../../home/Post';
import {PostLoading} from '../../../post';
import React from 'react';
import {getPosts} from '../../../../api/postApi';
import {useQuery} from 'react-query';
import {useSearchScreen} from '../../../../screens';

export const SearchStoriesTab = () => {
  const {searchValue} = useSearchScreen();
  const {
    data: posts,
    isLoading,
    refetch,
  } = useQuery(
    ['searchStories', searchValue],
    () => getPosts({page: 0, limit: 10, title: searchValue}),
    {
      enabled: searchValue.length > 0,
      staleTime: 1000 * 60 * 60,
    },
  );
  return (
    <SafeAreaView className="bg-white h-full pb-48">
      {isLoading && (
        <View className="p-6">
          <PostLoading />
          <PostLoading />
          <PostLoading />
          <PostLoading />
        </View>
      )}
      {posts?.length === 0 && (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500">No post found</Text>
        </View>
      )}
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Post post={item} />}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      />
    </SafeAreaView>
  );
};
