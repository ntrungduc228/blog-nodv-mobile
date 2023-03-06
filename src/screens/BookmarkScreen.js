import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import {PostLoading, useGetBookmark} from '../features/post';

import Post from '../features/home/Post';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScreenLayout} from './components';
import {View} from 'react-native';

function BookmarkScreen() {
  const {data = {}, isLoading, refetch} = useGetBookmark();
  const {posts = []} = data;
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
        />
      </SafeAreaView>
    </ScreenLayout>
  );
}

export default BookmarkScreen;
