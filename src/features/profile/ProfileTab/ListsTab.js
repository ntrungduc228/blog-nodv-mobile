import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {FlatList, RefreshControl, SafeAreaView, Text, View} from 'react-native';
import Post from '../../home/Post';
import {PostLoading, useGetBookmark} from '../../post';

export const ListsTab = () => {
  const {data = {}, isLoading, refetch} = useGetBookmark();
  const {posts = []} = data;

  const postList = () => {
    return posts?.map(post => {
      return <Post key={post.id} post={post} />;
    });
  };

  // refetch() when screen is focused

  useFocusEffect(
    useCallback(() => {
      refetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <SafeAreaView className="bg-white h-full">
      {/* <BookmarkList isLoading={isLoading} posts={posts} refetch={refetch} /> */}
      {isLoading && (
        <View className="p-6">
          <PostLoading />
          <PostLoading />
          <PostLoading />
          <PostLoading />
        </View>
      )}
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Post post={item} />}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        ListEmptyComponent={
          <View className="mt-20 justify-center">
            <Text className="text-black text-lg text-center break-words mx-10">
              You don't have any posts.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};
