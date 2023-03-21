import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import {Text, View} from 'react-native';
import {useCallback, useMemo} from 'react';
import {useInfiniteQuery, useQueryClient} from 'react-query';

import {Post} from '../Post';
import {PostLoading} from '../PostLoading';
import {PostProvider} from '../../context/PostContext';
import {Spinner} from '../../../../components';
import {useFocusEffect} from '@react-navigation/native';

export const PostListFetch = ({
  filter = {},
  queryKey = 'posts',
  queryFn,
  isDeleteOnBookmark = false,
  isDeleteOnPublish = false,
  refreshOnFocus = false,
  disableFetch = false,
}) => {
  const accurateFilter = useMemo(() => {
    return Object.keys(filter).reduce((acc, key) => {
      if (filter[key] !== null) {
        acc[key] = filter[key];
      }
      return acc;
    }, {});
  }, [filter]);

  const storeKey = [queryKey, accurateFilter];

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    refetch,
    isSuccess,
  } = useInfiniteQuery(
    storeKey,
    ({pageParam}) => queryFn({...accurateFilter, page: pageParam}),
    {
      getNextPageParam: lastPage => {
        const {last, number} = lastPage;
        return last ? undefined : number + 1;
      },
      enabled: !disableFetch,
    },
  );

  const posts = useMemo(() => {
    const allPosts = [];
    data?.pages.forEach(page => {
      return page.content.forEach(post =>
        allPosts.push({...post, page: page.number}),
      );
    });
    return allPosts;
  }, [data]);

  const queryClient = useQueryClient();

  const updateLocalPost = updatedPost => {
    queryClient.setQueryData(storeKey, oldData => {
      const {pages} = oldData;
      const newPages = pages.map(page => {
        if (page.number !== updatedPost.page) {
          return page;
        }
        return {
          ...page,
          content: page.content.map(post => {
            if (post.id !== updatedPost.id) {
              return post;
            }
            return updatedPost;
          }),
        };
      });
      return {
        ...oldData,
        pages: newPages,
      };
    });
  };

  const deleteLocalPost = postDelete => {
    queryClient.setQueryData(storeKey, oldData => {
      const {pages} = oldData;
      const newPages = pages.map(page => {
        if (page.number !== postDelete.page) {
          return page;
        }
        return {
          ...page,
          content: page.content.filter(post => post.id !== postDelete.id),
        };
      });
      return {
        ...oldData,
        pages: newPages,
      };
    });
  };

  useFocusEffect(
    useCallback(() => {
      if (refreshOnFocus) {
        refetch();
      }
    }, [refreshOnFocus, refetch]),
  );

  return (
    <View className="bg-white">
      {isLoading && (
        <View className="px-6 bg-white">
          <PostLoading />
          <PostLoading />
          <PostLoading />
        </View>
      )}
      {isSuccess && posts.length === 0 && (
        <View className="h-full items-center pt-4">
          <Text className="text-gray-800">No posts</Text>
        </View>
      )}

      <FlatList
        style={{backgroundColor: '#fff'}}
        stickyHeaderHiddenOnScroll={true}
        onEndReached={
          hasNextPage ? () => fetchNextPage() : () => console.log('end')
        }
        onEndReachedThreshold={1}
        data={posts}
        renderItem={({item}) => (
          <PostProvider
            post={item}
            onUpdatePost={updateLocalPost}
            onDeletePost={deleteLocalPost}
            onUpdateBookmark={isDeleteOnBookmark ? deleteLocalPost : null}
            onUpdatePublish={isDeleteOnPublish ? deleteLocalPost : null}>
            <Post />
          </PostProvider>
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        keyExtractor={item => item.id}
        ListFooterComponent={
          isFetching && !isLoading ? (
            <View className="bg-white p-5 pb-32">
              <Spinner />
            </View>
          ) : null
        }
      />
    </View>
  );
};
