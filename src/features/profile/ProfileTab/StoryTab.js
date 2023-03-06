import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {getOwnedPosts, getPostsByUserId} from '../../../api/postApi';
import {useQuery} from 'react-query';
import {useSelector} from 'react-redux';
import {PostLoading} from '../../post';
import Post from '../../home/Post';

export const StoryTab = () => {
  const profile = useSelector(state => state?.profile?.data);
  const storeKey = ['profileHome', profile?.id];

  const {
    data: posts,
    isSuccess,
    isLoading,
  } = useQuery(
    storeKey,
    () =>
      profile.isOwnProfile ? getOwnedPosts() : getPostsByUserId(profile.id),
    {
      enabled: !!profile?.id,
    },
  );

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
              {profile?.isOwnProfile
                ? "You don't have any public posts."
                : 'No posts found'}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};
