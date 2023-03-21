import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Text, View} from 'react-native';

import {Avatar} from 'react-native-paper';
import {FollowUserButton} from '../features/user/components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {PostLoading} from '../features/post';
import {ScreenLayout} from './components';
import {Topic} from '../features/topic';
import {getPostsTrending} from '../api/postApi';
import {getRandomTopics} from '../api/topicApi';
import {getUsersNotFollow} from '../api/userApi';
import {intlFormatDistance} from '../utils/intlFormatDistance';
import {routesScreen} from '../navigations';
import {useMemo} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';

function ExploreScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <ScreenLayout title="Explore">
        <ScreenLayout.Header>
          <ScreenLayout.Title>Explore</ScreenLayout.Title>
        </ScreenLayout.Header>
        <View className="border-b border-gray-200">
          <View className="mt-2">
            <TouchableOpacity
              onPress={() => navigation.navigate(routesScreen.Search)}>
              <View className="flex-row mr-2 items-center h-9 mx-6 rounded-lg bg-gray-100 px-3">
                <MaterialCommunityIcons name="magnify" size={24} color="gray" />
                <Text className="ml-2">Search on NODV</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TopicSlider />
        </View>
        <Trending />
        <WhoToFollow />
      </ScreenLayout>
    </ScrollView>
  );
}

export default ExploreScreen;

const TopicSlider = () => {
  const {data = []} = useQuery('ExploreScreen/Topics', getRandomTopics);
  return (
    <View className="my-8 flex-row">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.map((topic, index) => (
          <View
            key={topic.id}
            className="mr-1"
            style={{
              marginLeft: index === 0 ? 24 : 0,
            }}>
            <Topic topic={topic} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const Trending = () => {
  const {data, isLoading} = useQuery('ExploreScreen/Trending', () =>
    getPostsTrending(6),
  );
  return (
    <View className="px-6 border-b border-gray-200">
      <View className="h-14 justify-center">
        <Text className="text-black text-base">Trending on NODV</Text>
      </View>
      <View className="mt-4">
        {data?.map((post, index) => (
          <View key={index} className="mb-10">
            <PostItem index={index} post={post} />
          </View>
        ))}
      </View>
      {isLoading && (
        <View>
          <PostLoading />
          <PostLoading />
          <PostLoading />
        </View>
      )}
    </View>
  );
};

const WhoToFollow = () => {
  const {data} = useQuery('whoToFollow', () => getUsersNotFollow(5), {});
  return (
    <View className="">
      <View className="h-14 justify-center px-6">
        <Text className="text-black text-base">Who to follow</Text>
      </View>
      <ScrollView
        horizontal
        className="mt-4"
        showsHorizontalScrollIndicator={false}>
        {data?.map((user, index) => (
          <View
            key={user.id}
            className="mx-2"
            style={{
              marginLeft: index === 0 ? 24 : 0,
            }}>
            <User user={user} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const User = ({user}) => {
  const navigation = useNavigation();
  const navigationToProfile = () => {
    navigation.navigate(routesScreen.Profile, {
      userId: user?.id,
      email: user?.email,
    });
  };
  return (
    <View className="items-center rounded-lg bg-gray-50 p-4 w-40">
      <TouchableOpacity onPress={navigationToProfile}>
        <Avatar.Image
          size={100}
          source={{
            uri:
              user?.avatar ||
              'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={navigationToProfile}>
        <Text numberOfLines={1} className="text-black my-3 text-lg">
          {user?.username}
        </Text>
      </TouchableOpacity>
      <Text className="text-gray-500 text-sm truncate flex-1 mb-2">
        {user?.bio || 'No bio'}
      </Text>
      <FollowUserButton className="w-full" fullWith followerId={user?.id} />
    </View>
  );
};

function PostItem({index, post}) {
  const timeDisplay = useMemo(() => {
    return intlFormatDistance(new Date(post.createdDate), new Date());
  }, [post.createdDate]);

  const navigation = useNavigation();

  return (
    <View className="flex-row">
      <View className="mr-6">
        <Text className="text-4xl font-bold text-gray-300 flex-row">
          0{index + 1}
        </Text>
      </View>
      <View className="flex-1">
        <View className="flex-row gap-x-2">
          {post.user?.avatar ? (
            <Avatar.Image
              size={20}
              source={{
                uri: post?.user?.avatar,
              }}
            />
          ) : (
            <Avatar.Text
              label={post?.user?.username?.charAt(0).toUpperCase()}
              size={20}
            />
          )}
          <Text>{post?.user?.username}</Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(routesScreen.PostDetail, {id: post.id})
          }>
          <View className="my-1">
            <Text className="text-base text-black font-bold">{post.title}</Text>
          </View>
        </TouchableOpacity>
        <View>
          <Text>
            {timeDisplay} . {post.timeRead} min read
          </Text>
        </View>
      </View>
    </View>
  );
}
