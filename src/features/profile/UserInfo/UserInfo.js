import {Avatar, Button, Text} from 'react-native-paper';
import {Image, View} from 'react-native';

import {StyleSheet} from 'react-native';
import {routesScreen} from '../../../navigations';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

export const UserInfo = () => {
  const user = useSelector(state => state.user?.data.info);
  // const profile = useSelector(state => state.profile?.data);
  const navigation = useNavigation();

  return (
    <View className="px-4 py-2">
      <View className="flex flex-row items-center">
        <View>
          <Image
            source={{
              uri: user?.avatar,
            }}
            className="h-[60] w-[60] rounded-full"
          />
        </View>
        <View className="ml-4 flex-1">
          <Text className="text-black font-bold text-lg">{user?.username}</Text>
          <View className="flex-row text-black font-semibold text-base">
            <Text className="text-black font-semibold text-[15px] mr-5">
              1 followers
            </Text>
            <Text className="text-black font-semibold text-[15px]">
              1 following
            </Text>
          </View>
        </View>
      </View>
      <View className="mt-5">
        <Button
          style={{borderColor: '#000'}}
          className="rounded-full mx-10"
          mode="outlined"
          onPress={() => navigation.navigate(routesScreen.ProfileEdit)}
          textColor="#0f172a">
          Edit your profile
        </Button>
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
