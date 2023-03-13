import {View, TouchableOpacity, Text, ScrollView, Image} from 'react-native';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux';
import {useQuery} from 'react-query';
import {getAllUsersFollowing, getAllUsersFollower} from '../api/userApi';
import {Spinner} from '../components';
import {FollowUserButton} from '../features/user';
import {routesScreen} from '../navigations';

export const FollowScreen = ({navigation, route}) => {
  const type = route.params?.type;
  const profileId = useSelector(state => state.profile.data?.id);
  const {data, isLoading} = useGetAllUserFollows(type, profileId);

  return (
    <View className="bg-white h-full">
      <FollowHeader
        navigation={navigation}
        title={type === 'followers' ? 'Followers' : 'Following'}
      />
      {isLoading ? (
        <Spinner />
      ) : (
        <FollowBody data={data} navigation={navigation} />
      )}
    </View>
  );
};

const useGetAllUserFollows = (type, profileId) => {
  const storeKey = type === 'followers' ? 'usersFollower' : 'usersFollowing';
  const queryFn =
    type === 'followers'
      ? () => getAllUsersFollower(profileId)
      : () => getAllUsersFollowing(profileId);

  return useQuery(storeKey, queryFn, {});
};

const FollowHeader = ({navigation, title}) => {
  return (
    <View className="bg-white h-[60] flex-row items-center justify-between">
      <View className="flex-row items-center">
        <TouchableOpacity className="mx-5" onPress={() => navigation.goBack()}>
          <IconFontAwesome5 name="arrow-left" size={20} regular />
        </TouchableOpacity>
        <Text className="font-medium text-xl text-black">{title}</Text>
      </View>
    </View>
  );
};

const FollowBody = ({data, navigation}) => {
  return (
    <ScrollView>
      <View>
        {data?.length &&
          data?.map((item, index) => (
            <FollowItem
              item={item}
              key={item?.id ?? index}
              navigation={navigation}
            />
          ))}
      </View>
    </ScrollView>
  );
};

const FollowItem = ({item, navigation}) => {
  return (
    <View className="flex-row justify-between p-4 items-center border-y border-slate-300">
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(routesScreen.Profile, {
            email: item?.email,
          })
        }>
        <View className="flex-row bg-gray-0">
          <View className="mr-3">
            <Image
              source={{
                uri:
                  item?.avatar ??
                  'https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg',
              }}
              className="h-[60] w-[60] rounded-full"
            />
          </View>
          <View className="w-[53%] bg-white">
            <Text className="text-black font-bold break-words">
              {item?.username}
            </Text>
            <Text className="break-words mt-1">{item?.bio}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View className="">
        <FollowUserButton className="w-full" fullWith followerId={item?.id} />
      </View>
    </View>
  );
};
