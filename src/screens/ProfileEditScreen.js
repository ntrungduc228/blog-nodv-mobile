import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Button} from 'react-native-paper';
import {ProfileForm} from '../features/profile';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../redux/slices/userSlice';
import {useMutation} from 'react-query';
import {updateUserProfile} from '../api/userApi';
import {Spinner} from '../components';
import useToast from '../hooks/useToast';
import {setProfile} from '../redux/slices/profileSlice';

export const ProfileEditScreen = ({navigation}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const user = useSelector(state => state.user.data.info);
  const dispatch = useDispatch();
  const {showToast} = useToast();

  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: data => {
      dispatch(setUser(data));
      dispatch(setProfile({...data, isOwnProfile: true}));

      // toast.success('Update profile successfully');
      showToast('success', 'Profile updated successfully');
      console.log('update profile successfully');
      // setIsSubmitted(false);
      setIsMutating(false);
    },
    onError: () => {
      setIsMutating(false);
    },
  });

  const handleOnSubmit = data => {
    setIsMutating(true);
    updateProfileMutation.mutate(data);
  };

  return (
    <View className="bg-white h-full">
      <ProfileEditHeader
        navigation={navigation}
        setIsSubmitted={setIsSubmitted}
      />
      {isMutating ? (
        <Spinner />
      ) : (
        <ProfileForm
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
          initialValue={user}
          onSubmit={data => {
            console.log('updateProfileMutation.mutate(data)}');
            handleOnSubmit(data);
          }}
        />
      )}
    </View>
  );
};

const ProfileEditHeader = ({navigation, setIsSubmitted}) => {
  return (
    <View className="bg-white h-[60] flex-row items-center justify-between">
      <View className="flex-row items-center">
        <TouchableOpacity className="mx-5" onPress={() => navigation.goBack()}>
          <IconFontAwesome5 name="arrow-left" size={20} regular />
        </TouchableOpacity>
        <Text className="font-medium text-xl text-black">Edit Profile</Text>
      </View>
      <Button
        mode="text"
        textColor="#4caf50"
        onPress={() => setIsSubmitted(true)}>
        Save
      </Button>
    </View>
  );
};
