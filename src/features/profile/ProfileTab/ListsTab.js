import {PostListFetch} from '../../post';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {getBookmark} from '../../../api/bookmarkApi';

export const ListsTab = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <PostListFetch
        queryKey="bookmarks"
        queryFn={getBookmark}
        isDeleteOnBookmark
        refreshOnFocus
      />
    </SafeAreaView>
  );
};
