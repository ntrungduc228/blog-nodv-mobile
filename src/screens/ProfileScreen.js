import {ProfileTab, UserInfo} from '../features/profile';
import {TouchableOpacity, View} from 'react-native';

import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {routesScreen} from '../navigations';
import {useSelector} from 'react-redux';
import {getUserProfile} from '../api/userApi';
import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import {setProfile} from '../redux/slices/profileSlice';

function ProfileScreen({navigation, route}) {
  const {email} = route.params;
  const profile = useSelector(state => state?.profile?.data);
  const ownProfile =
    useSelector(state => state.user.data.info)?.id === profile?.id;

  const dispatch = useDispatch();

  useQuery(['profile', email], () => getUserProfile(email), {
    onSuccess: data => {
      dispatch(setProfile({...data, isOwnProfile: ownProfile}));
    },
  });

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
