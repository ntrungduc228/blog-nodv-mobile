import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useGetBookmark, PostLoading} from '../../post';
import Post from '../../home/Post';

export const ListsTab = () => {
  const {data = {}, isLoading, refetch} = useGetBookmark();
  const {posts = []} = data;

  const postList = () => {
    return posts?.map(post => {
      return <Post key={post.id} post={post} />;
    });
  };

  return (
    <ScrollView>
      <View className="flex-1 bg-white">
        {isLoading && (
          <View className="p-6">
            <PostLoading />
            <PostLoading />
            <PostLoading />
            <PostLoading />
          </View>
        )}

        {posts?.length ? (
          <View className="p-2">{postList()}</View>
        ) : (
          <View className="mt-20 justify-center">
            <Text className="text-black text-lg text-center break-words mx-10">
              You don't have any posts.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
