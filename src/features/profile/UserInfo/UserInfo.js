import {Button, Text} from 'react-native-paper';
import {Image, View} from 'react-native';

import {ButtonFollow} from './ButtonFollow';
import {FollowUserButton} from '../../user';
import {routesScreen} from '../../../navigations';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

export const UserInfo = () => {
  const profile = useSelector(state => state.profile?.data);
  const navigation = useNavigation();

  return (
    <View className="px-4 py-2">
      <View className="flex flex-row items-center">
        <View>
          <Image
            source={{
              uri:
                profile?.avatar ||
                'https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg',
            }}
            className="h-[60] w-[60] rounded-full"
          />
        </View>
        <View className="ml-4 flex-1">
          <Text className="text-black font-bold text-lg">
            {profile?.username}
          </Text>
          <View className="flex-row text-black font-semibold text-base mt-1">
            <View className="">
              <Text
                className="font-bold text-gray-700 text-base"
                onPress={() => navigation.navigate(routesScreen.Followers)}>
                {profile?.followerId?.length} followers
              </Text>
            </View>
            <View className="">
              <Text
                className="ml-[16] font-bold text-gray-700 text-base"
                onPress={() => navigation.navigate(routesScreen.Following)}>
                {profile?.followingId?.length} following
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="mt-6">
        {profile?.isOwnProfile ? (
          <Button
            className="rounded-full mx-0 text-white bg-black"
            mode="outlined"
            onPress={() => navigation.navigate(routesScreen.ProfileEdit)}
            textColor="#fff">
            Edit your profile
          </Button>
        ) : (
          <FollowUserButton
            className="w-full"
            fullWith
            followerId={profile?.id}>
            <ButtonFollow />
          </FollowUserButton>
        )}
      </View>
    </View>
  );
};
