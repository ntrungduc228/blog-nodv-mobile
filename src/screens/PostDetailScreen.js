import {
  BookmarkButton,
  LikePostButton,
  PostDetailLoading,
  PostMenu,
  PostToolbar,
  CommentButton,
} from '../features/post/components';
import {SafeAreaView, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useEffect, useMemo} from 'react';
import {useGetPost, useGetRecommendPostsByPostId} from '../features/post/hooks';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {Avatar} from 'react-native-paper';
import {FollowUserButton} from '../features/user/components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RichEditor} from 'react-native-pell-rich-editor';
import {Topic} from '../features/topic/components';
import {format} from 'date-fns';
import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from 'react-query';
import {useSelector} from 'react-redux';

export const PostDetailScreen = ({route}) => {
  const {id} = route.params;
  const navigation = useNavigation();
  const {data = {}, isLoading, isSuccess} = useGetPost(id);
  const {user: author} = data;
  const userId = useSelector(state => state.user.data.info.id);
  const isAuthor = useMemo(() => author?.id === userId, [author, userId]);
  return (
    <View className="bg-white h-full">
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
          <View className="flex-row gap-2 items-center h-full">
            <BookmarkButton postId={id} />
            {isAuthor && <PostMenu postId={id} />}
          </View>
        )}
      </View>
      {isLoading ? (
        <View className="pt-[68px] px-2 bg-white h-screen">
          <PostDetailLoading />
        </View>
      ) : (
        isSuccess && (
          <>
            <MainContent data={data} isAuthor={isAuthor} />
            <RecommendPostList postId={id} />
          </>
        )
      )}
    </View>
  );
};

function MainContent({data, isAuthor}) {
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
  } = data;
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
        <View className="flex-row items-center mt-4 px-2">
          <Avatar.Image
            size={48}
            source={{
              uri: author.avatar,
            }}
          />
          <View className="ml-4">
            <View className="flex-row gap-2 items-center">
              <Text className="text-xl font-bold">{author.username}</Text>
              <View>
                {isAuthor ? (
                  <View className={`h-5 rounded-full px-2 bg-yellow-500`}>
                    <Text className="text-xs text-white mt-0.5">Owner</Text>
                  </View>
                ) : (
                  <FollowUserButton followerId={author.id}>
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
        <RichEditor disabled className="flex-1" initialContentHTML={content} />
        <View className="w-[95%] h-[1px] bg-slate-200 mx-auto my-2" />
        <View className="flex-row items-center pb-4 px-2">
          {topics.map(topic => {
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
        <LikePostButton postId={id} userLikeIds={userLikeIds || []}>
          {({liked, handleLike}) => {
            return (
              <PostToolbar.Item
                onPress={handleLike}
                icon={
                  <MaterialCommunityIcons
                    name="hand-clap"
                    size={20}
                    color={liked ? 'green' : 'gray'}
                  />
                }>
                {userLikeIds ? userLikeIds.length : 0}
              </PostToolbar.Item>
            );
          }}
        </LikePostButton>
        <PostToolbar.Divider />
        <CommentButton post={data} />
        {/* <PostToolbar.Item
          icon={<FontAwesome name="comment-o" size={18} color="gray" />}
        /> */}
      </PostToolbar>
      {/* <CommentButton /> */}
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
