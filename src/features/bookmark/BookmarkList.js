import {FlatList, RefreshControl, SafeAreaView, Text, View} from 'react-native';
import {Post, PostLoading} from '../post';

export const BookmarkList = ({isLoading, refetch, posts}) => {
  return (
    // <View >
    <SafeAreaView className="bg-white">
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
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500">No posts</Text>
          </View>
        }
      />
    </SafeAreaView>
    // </View>
  );
};
