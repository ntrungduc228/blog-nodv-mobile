import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {Text, View} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {FollowUserButton} from '../features/user/components';
import Post from '../features/home/Post';
import {PostLoading} from '../features/post';
import {getPosts} from '../api/postApi';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';

export const TopicScreen = ({route}) => {
  const {topic} = route.params;
  const {data, isLoading, refetch} = useQuery(['TopicScreen', topic.id], () =>
    getPosts({
      limit: 5,
      topic: topic.slug,
    }),
  );
  const navigate = useNavigation();

  return (
    <View>
      <View className="min-h-[56px] flex-row items-center px-4">
        <TouchableOpacity
          onPress={() => {
            navigate.goBack();
          }}>
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View className="min-h-[56px] flex-row items-center px-4">
        <Text className="font-bold text-2xl">{topic.name}</Text>
      </View>
      <View className="h-14 flex-row items px-4 items-center border-b border-gray-200">
        <FollowUserButton primary />
        <Text className="ml-3 text-gray-800">100 followers</Text>
        <View className="mx-2">
          <Entypo name="dot-single" size={24} color="gray" />
        </View>
        <Text className="text-gray-800">100k stories</Text>
      </View>
      <View className="mt-4">
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) => <Post post={item} />}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
          ListEmptyComponent={
            <>
              {!isLoading && (
                <View className="flex-1 items-center justify-center mt-10">
                  <Text className="text-gray-500">No posts</Text>
                </View>
              )}
            </>
          }
        />
        {isLoading && (
          <View className="px-6">
            <PostLoading />
            <PostLoading />
            <PostLoading />
            <PostLoading />
            <PostLoading />
          </View>
        )}
      </View>
    </View>
  );
};
