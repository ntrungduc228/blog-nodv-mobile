import {View, Text, FlatList, RefreshControl, SafeAreaView} from 'react-native';
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
    refetch,
  } = useQuery(
    storeKey,
    () =>
      profile?.isOwnProfile ? getOwnedPosts() : getPostsByUserId(profile?.id),
    {
      enabled: !!profile,
    },
  );

  return (
    <SafeAreaView className="bg-white h-full">
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
