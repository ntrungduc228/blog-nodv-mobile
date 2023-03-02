import {Avatar, Chip} from 'react-native-paper';
import {
  LikePostButton,
  PostDetailLoading,
  PostMenu,
  PostToolbar,
  useGetPost,
} from '../features/post';
import {SafeAreaView, Text, View} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {FollowUserButton} from '../features/user/components/FollowUserButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {RichEditor} from 'react-native-pell-rich-editor';
import {Topic} from '../features/topic/components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {format} from 'date-fns';
import {useEffect} from 'react';
import {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

export const PostDetailScreen = ({route}) => {
  const {id} = route.params;

  const navigation = useNavigation();
  const {data = {}, isLoading, isSuccess} = useGetPost(id);

  return (
    <View className="bg-white h-full">
      <View className="h-14 flex-row items-center justify-between border-b px-4 border-slate-200 absolute top-0 bg-white w-full z-10">
        <TouchableOpacity>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        {!isLoading && (
          <View className="flex-row gap-2">
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="bookmark-plus-outline"
                size={24}
                color="black"
                onPress={() => {}}
              />
            </TouchableOpacity>
            <PostMenu postId={id} />
          </View>
        )}
      </View>
      {isLoading ? (
        <View className="pt-[68px] px-2 bg-white h-screen">
          <PostDetailLoading />
        </View>
      ) : (
        isSuccess && <MainContent data={data} />
      )}
    </View>
  );
};

function MainContent({data}) {
  const socket = useSelector(state => state.socket.data);
  const handleReceiveLikePostSocket = payload => {
    // console.log(payload);
    const {userLikeIds} = JSON.parse(payload.body);
    // updateLocalPost({userLikeIds: userLikeIds});
    console.log('userLikeIds', userLikeIds);
  };

  const {
    content,
    user: author,
    createdDate,
    timeRead,
    topics,
    id,
    userLikeIds = [],
  } = data;
  const userId = useSelector(state => state.user.data.info.id);
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
        console.log('unsubscribing');
        socket.unsubscribe(topic);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, socket]);

  return (
    <SafeAreaView className="flex-1 pt-14">
      <View className="flex-row items-center mt-4 px-2">
        <Avatar.Image
          size={48}
          source={{
            uri: author.avatar,
          }}
        />
        <View className="ml-4">
          <View className="flex-row gap-2">
            <Text className="text-lg mr-2">{author.username}</Text>
          </View>
          <Text className="text-sm text-slate-500">
            {createdDateFormatted} . {timeRead} min read
          </Text>
        </View>
        <View className="ml-4">
          {userId === author.id ? (
            <Chip className="rounded-full bg-slate-300">
              <Text className="text-slate-600">Owner</Text>
            </Chip>
          ) : (
            <FollowUserButton followerId={author.id} />
          )}
        </View>
      </View>

      <RichEditor disabled className="flex-1" initialContentHTML={content} />

      <View className="w-[95%] h-[1px] bg-slate-300 mx-auto my-2" />
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
        <PostToolbar.Item
          icon={<FontAwesome name="comment-o" size={18} color="gray" />}>
          100
        </PostToolbar.Item>
      </PostToolbar>
    </SafeAreaView>
  );
}
