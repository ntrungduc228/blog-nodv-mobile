import {Button, Text} from 'react-native-paper';
import {Image, View, StyleSheet} from 'react-native';
import {useState} from 'react';
import {routesScreen} from '../../../navigations';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {ButtonFollow} from './ButtonFollow';
import {FollowUserButton} from '../../user';
import {ModalTrigger} from '../../../components/ModalTrigger';
import {FollowerModal, FollowingModal} from '../ProfileTab/components';

export const UserInfo = () => {
  const [openModalFollower, setOpenModalFollower] = useState(false);
  const [openModalFollowing, setOpenModalFollowing] = useState(false);

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
              <ModalTrigger
                button={
                  <Text className="text-red font-semibold text-[15px] text-[#4caf50]">
                    {profile?.followerId?.length} followers
                  </Text>
                }
                visible={openModalFollower}
                setVisible={value => setOpenModalFollower(value)}>
                <FollowerModal />
              </ModalTrigger>
            </View>
            <View className="">
              <ModalTrigger
                button={
                  <Text className="ml-[30] text-black font-semibold text-[15px] text-[#4caf50]">
                    {profile?.followingId?.length} following
                  </Text>
                }
                visible={openModalFollowing}
                setVisible={value => setOpenModalFollowing(value)}>
                <FollowingModal />
              </ModalTrigger>
            </View>
          </View>
        </View>
      </View>
      <View className="mt-10">
        {profile?.isOwnProfile ? (
          <Button
            style={{borderColor: '#000'}}
            className="rounded-full mx-10"
            mode="outlined"
            onPress={() => navigation.navigate(routesScreen.ProfileEdit)}
            textColor="#0f172a">
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

const Styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});
