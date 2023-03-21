import {PostListFetch} from '../features/post';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScreenLayout} from './components';
import {Text} from 'react-native';
import {getBookmark} from '../api/bookmarkApi';

function BookmarkScreen() {
  return (
    <ScreenLayout>
      <ScreenLayout.Header>
        <Text className="text-2xl font-bold">Bookmark</Text>
      </ScreenLayout.Header>
      <ScreenLayout.Body>
        <SafeAreaView>
          <PostListFetch
            queryKey="bookmarks"
            queryFn={getBookmark}
            isDeleteOnBookmark
            refreshOnFocus
          />
        </SafeAreaView>
      </ScreenLayout.Body>
    </ScreenLayout>
  );
}

export default BookmarkScreen;
