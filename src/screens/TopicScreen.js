import {Text, View} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {FollowUserButton} from '../features/user/components';
import {PostListFetch} from '../features/post';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getPosts} from '../api/postApi';
import {getTopicDetail} from '../api/topicApi';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';

export const TopicScreen = ({route}) => {
  const {topic} = route.params;

  const navigate = useNavigation();

  const {data: topicDetail} = useQuery(['topic', topic.slug], () =>
    getTopicDetail(topic.slug),
  );

  return (
    <View className="bg-white">
      <View className="min-h-[56px] flex-row items-center px-4 bg-white">
        <TouchableOpacity
          onPress={() => {
            navigate.goBack();
          }}>
          <AntDesign name="arrowleft" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View className="min-h-[56px] flex-row items-center px-4 bg-white">
        <Text className="font-bold text-2xl">{topicDetail?.name}</Text>
      </View>
      <View className="h-14 flex-row items px-4 items-center border-b bg-white border-gray-200">
        <FollowUserButton primary />
        <Text className="ml-3 text-gray-800">
          {topicDetail?.followerCounts} followers
        </Text>
        <View className="mx-2">
          <Entypo name="dot-single" size={24} color="gray" />
        </View>
        <Text className="text-gray-800">{topicDetail?.postCounts} stories</Text>
      </View>
      <View className="pt-4 bg-white">
        <PostListFetch
          queryKey="topic-detail"
          filter={{topic: topic.slug}}
          queryFn={getPosts}
        />
      </View>
    </View>
  );
};
