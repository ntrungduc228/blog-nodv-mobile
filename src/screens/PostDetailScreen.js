import {
  BookmarkIcon,
  BookmarkPlusIcon,
  ClapIcon,
  ClapOutlineIcon,
} from '../components/icons';
import {
  CommentButton,
  LikePost,
  PostDetailLoading,
  PostMenu,
  PostToolbar,
} from '../features/post/components';
import {PostProvider, usePost} from '../features/post/context/PostContext';
import {SafeAreaView, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useEffect, useMemo, useState} from 'react';
import {useGetPost, useGetRecommendPostsByPostId} from '../features/post/hooks';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {Avatar} from 'react-native-paper';
import {FollowUserButton} from '../features/user/components';
import {IconWrapper} from '../components';
import {RichEditor} from 'react-native-pell-rich-editor';
import {Topic} from '../features/topic/components';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from 'react-query';
import {useSelector} from 'react-redux';

export const PostDetailScreen = ({route}) => {
  const {postId} = route.params;
  const {data = {}, isLoading, isSuccess} = useGetPost(postId);
  const [post, setPost] = useState(data);

  useEffect(() => {
    setPost(data);
  }, [data]);

  return (
    <PostProvider post={post} onUpdatePost={newPost => setPost(newPost)}>
      <View className="bg-white h-full">
        <Header isLoading={isLoading} />
        {isLoading ? (
          <View className="pt-[68px] px-4 bg-white h-screen">
            <PostDetailLoading />
          </View>
        ) : (
          isSuccess && (
            <>
              <MainContent />
              <RecommendPostList postId={postId} />
            </>
          )
        )}
      </View>
    </PostProvider>
  );
};

function Header({isLoading}) {
  const navigation = useNavigation();
  const {post, updateBookmark} = usePost();
  return (
    <View className="h-14 flex-row items-center justify-between px-4 border-slate-200 absolute top-0 bg-white w-full z-10">
      <TouchableOpacity>
        <AntDesign
          name="arrowleft"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
      </TouchableOpacity>
      {!isLoading && (
        <View className="flex-row items-center  h-full">
          <IconWrapper className="mr-6" size={24} onPress={updateBookmark}>
            {post.isBookmarked ? (
              <BookmarkIcon className="text-black" />
            ) : (
              <BookmarkPlusIcon className="text-gray-500" />
            )}
          </IconWrapper>
          <PostMenu />
        </View>
      )}
    </View>
  );
}

function MainContent() {
  const {post} = usePost();
  const queryClient = useQueryClient();
  const socket = useSelector(state => state.socket.data);
  const {
    content,
    user: author,
    createdDate,
    timeRead,
    topics,
    id,
    userLikeIds = [],
    isAuthor,
  } = post;
  const createdDateFormatted = useMemo(() => {
    if (!createdDate) {
      return null;
    }
    return format(new Date(createdDate), 'MMM, d');
  }, [createdDate]);

  useEffect(() => {
    const topic = `/topic/posts/${id}/like`;
    if (socket) {
      socket.subscribe(topic, handleReceiveLikePostSocket, {id: topic});
    }
    return () => {
      if (socket) {
        socket.unsubscribe(topic);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, socket]);

  const handleReceiveLikePostSocket = payload => {
    const {userLikeIds: newUserLikeIds} = JSON.parse(payload.body);
    queryClient.setQueryData(['post', id], prev => ({
      ...prev,
      userLikeIds: newUserLikeIds,
    }));
  };

  return (
    <SafeAreaView className="flex-1 pt-14">
      <ScrollView>
        <View className="flex-row items-center mt-4 px-4">
          {author?.avatar ? (
            <Avatar.Image
              size={48}
              source={{
                uri: author.avatar,
              }}
            />
          ) : (
            <Avatar.Text
              size={48}
              label={author?.username?.charAt(0).toUpperCase()}
            />
          )}
          <View className="ml-4 w-full flex-1">
            <View className="flex-row gap-2 items-center">
              <Text className="font-bold overflow-hidden flex-1">
                {author?.username}
              </Text>
              <View>
                {isAuthor ? (
                  <View className={`h-5 rounded-full px-2 bg-yellow-500`}>
                    <Text className="text-xs text-white mt-0.5">Owner</Text>
                  </View>
                ) : (
                  <FollowUserButton followerId={author?.id}>
                    {({handleFollow, followed}) => {
                      return (
                        <TouchableOpacity onPress={handleFollow}>
                          <View
                            className={`h-5 rounded-full px-2  ${
                              followed ? ' bg-slate-500' : 'bg-emerald-600'
                            }`}>
                            <Text className="text-xs text-white mt-0.5">
                              {followed ? 'Following' : 'Follow'}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  </FollowUserButton>
                )}
              </View>
            </View>
            <Text className="text-sm text-slate-500">
              {createdDateFormatted} . {timeRead} min read
            </Text>
          </View>
        </View>
        <RichEditor
          disabled
          className="flex-1 mx-1"
          initialContentHTML={content}
        />
        <View className="w-[95%] h-[1px] bg-slate-200 mx-auto my-2" />
        <View className="flex-row items-center pb-4 px-2">
          {topics?.map(topic => {
            return (
              <View className="p-1" key={topic.id}>
                <Topic topic={topic} key={topic.id} />
              </View>
            );
          })}
        </View>
        <View className="h-14" />
      </ScrollView>
      <PostToolbar>
        <LikePost postId={id} userLikeIds={userLikeIds || []}>
          {({liked, handleLike}) => {
            return (
              <PostToolbar.Item
                icon={
                  <IconWrapper onPress={handleLike}>
                    {liked ? <ClapIcon /> : <ClapOutlineIcon />}
                  </IconWrapper>
                }>
                {userLikeIds ? userLikeIds.length : 0}
              </PostToolbar.Item>
            );
          }}
        </LikePost>
        <PostToolbar.Divider />
        <PostToolbar.Item>
          <CommentButton post={post} />
        </PostToolbar.Item>
      </PostToolbar>
    </SafeAreaView>
  );
}

function RecommendPostList({postId}) {
  const {data = [], isLoading} = useGetRecommendPostsByPostId(postId);
  return (
    <>
      {data.length > 0 && (
        <View className="bg-white">
          <View className="px-4 py-2">
            <Text className="text-xl font-bold">Recommended</Text>
          </View>
        </View>
      )}
    </>
  );
}
