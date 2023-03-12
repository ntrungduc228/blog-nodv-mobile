import {ProfileTab, UserInfo} from '../features/profile';
import {TouchableOpacity, View} from 'react-native';

import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {routesScreen} from '../navigations';
import {useSelector} from 'react-redux';
import {getUserProfile} from '../api/userApi';
import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import {setProfile} from '../redux/slices/profileSlice';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useEffect, useCallback, useState} from 'react';

function ProfileScreen({navigation, route}) {
  const [email, setEmail] = useState(route.params?.email ?? user?.email);
  // let email = route.params?.email || user?.email;
  const user = useSelector(state => state.user.data.info);
  const profile = useSelector(state => state?.profile?.data);
  const ownProfile =
    useSelector(state => state.user.data.info)?.id === profile?.id;

  const isFocused = useIsFocused();
  console.log('route', route.params, email, user?.email, isFocused);

  useEffect(() => {
    const eventTab = navigation.addListener('tabPress', e => {
      navigation.setParams({email: user?.email});
    });

    return eventTab;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  useEffect(() => {
    if (isFocused && !route.params?.email) {
      setEmail(user?.email);
    } else if (isFocused && route.params?.email) {
      setEmail(route.params.email);
    }

    return () => {
      if (!isFocused) {
        navigation.setParams({email: ''});
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused, user]);

  useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  const dispatch = useDispatch();

  useQuery(['profile', email], () => getUserProfile(email), {
    enabled: !!email,
    onSuccess: data => {
      dispatch(setProfile({...data, isOwnProfile: user?.id === data?.id}));
    },
  });

  return (
    <View className="h-full bg-white pt-[20] flex-1">
      {profile?.isOwnProfile && (
        <TouchableOpacity
          className="flex-row justify-end pr-5"
          onPress={() => navigation.navigate(routesScreen.Settings)}>
          <IconFontAwesome5 name="cog" size={22} regular />
        </TouchableOpacity>
      )}

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
