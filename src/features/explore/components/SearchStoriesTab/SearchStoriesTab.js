import {PostListFetch} from '../../../post';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {getPosts} from '../../../../api/postApi';
import {useSearchScreen} from '../../../../screens';

export const SearchStoriesTab = () => {
  const {searchValue} = useSearchScreen();
  return (
    <SafeAreaView className="bg-white h-full pb-48">
      <PostListFetch
        disableFetch={!searchValue}
        queryKey="searchStories"
        filter={{
          title: searchValue,
        }}
        queryFn={getPosts}
      />
    </SafeAreaView>
  );
};
