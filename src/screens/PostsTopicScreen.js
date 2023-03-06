import {
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {Text, View} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Post from '../features/home/Post';
import {PostLoading} from '../features/post';
import {getPosts} from '../api/postApi';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';

export const PostsTopicScreen = ({route}) => {
  const {topic} = route.params;
  const {data, isLoading, refetch} = useQuery(
    ['PostsTopicScreen', topic.id],
    () =>
      getPosts({
        limit: 5,
        topic: topic.slug,
      }),
  );
  const navigate = useNavigation();

  return (
    <View>
      <View className="min-h-[56px] mt-10 flex-row items-center px-6 justify-between">
        <Text className="text-2xl text-black">
          Posts related to{' '}
          <Text className="text-green-700 font-bold">{topic.name}</Text>
        </Text>

        <TouchableOpacity
          onPress={() => {
            navigate.goBack();
          }}>
          <AntDesign name="close" size={24} color="#000" />
        </TouchableOpacity>
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
