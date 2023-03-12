import {ProfileTab, UserInfo} from '../profile';
import {TouchableOpacity, View} from 'react-native';

import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {routesScreen} from '../../navigations';
import {useSelector} from 'react-redux';
import {getUserProfile} from '../../api/userApi';
import {useQuery} from 'react-query';
import {useDispatch} from 'react-redux';
import {setProfile} from '../../redux/slices/profileSlice';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useEffect, useCallback, useState} from 'react';

export const ProfileUser = ({navigation, route, user}) => {
  const profile = useSelector(state => state?.profile?.data);
  const [email, setEmail] = useState(route?.params?.email ?? user?.email);

  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (!isFocused) {
        navigation.setParams({email: ''});
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

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
};
