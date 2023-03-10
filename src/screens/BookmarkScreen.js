import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import {PostLoading, useGetBookmark} from '../features/post';
import {Text, View} from 'react-native';

import Post from '../features/home/Post';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScreenLayout} from './components';
import {useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';

function BookmarkScreen() {
  const {data = {}, isLoading, refetch} = useGetBookmark();
  const {posts = []} = data;

  // refetch() when screen is focused

  useFocusEffect(
    useCallback(() => {
      refetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <ScreenLayout title="Bookmark">
      <SafeAreaView>
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
    </ScreenLayout>
  );
}

export default BookmarkScreen;
