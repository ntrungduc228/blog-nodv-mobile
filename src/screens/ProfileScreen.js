import {Text, View, ScrollView, TouchableOpacity} from 'react-native';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {UserInfo, ProfileTab} from '../features/profile';
import {routesScreen} from '../navigations';
import {useSelector} from 'react-redux';

function ProfileScreen({navigation}) {
  const profile = useSelector(state => state?.profile?.data);
  const ownProfile =
    useSelector(state => state.user.data.info)?.id === profile?.id;

  return (
    <View className="h-full bg-white pt-[20] flex-1">
      <TouchableOpacity
        className="flex-row justify-end pr-5"
        onPress={() => navigation.navigate(routesScreen.Settings)}>
        <IconFontAwesome5 name="cog" size={22} regular />
      </TouchableOpacity>
      <View>
        <UserInfo />
      </View>
      <View className="mt-2 flex-1">
        <ProfileTab />
      </View>
    </View>
  );
}

export default ProfileScreen;
