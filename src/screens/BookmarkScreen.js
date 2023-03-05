import {FlatList, RefreshControl} from 'react-native-gesture-handler';

import {ScreenLayout} from './components';
import {Text} from 'react-native-paper';
import {useGetBookmark} from '../features/post';

function BookmarkScreen() {
  const {data = {}, isLoading, refetch} = useGetBookmark();
  const {posts = []} = data;
  return (
    <ScreenLayout title="Bookmark">
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({item}) => <Text>{item.title}</Text>}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      />
      {isLoading && <Text>Loading...</Text>}
    </ScreenLayout>
  );
}

export default BookmarkScreen;
