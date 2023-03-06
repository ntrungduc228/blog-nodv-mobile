import {View, Text, Image} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';
import {useForm} from 'react-hook-form';
import storage from '@react-native-firebase/storage';

const options = {
  title: 'Select Image',
  type: 'library',
  options: {
    selectionLimit: 0,
    mediaType: 'photo',
    includeBase64: false,
  },
};

export const ProfileForm = ({
  initialValue,
  onSubmit,
  isSubmitted,
  setIsSubmitted,
}) => {
  const [uriAvatar, setUriAvatar] = useState(initialValue.avatar || '');
  const [userInfo, setUserInfo] = useState(initialValue);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  if (errors) {
    // console.log('errr ', errors);
  }

  useEffect(() => {
    if (isSubmitted) {
      submitForm();
    }
  }, [isSubmitted, submitForm, setIsSubmitted]);

  const submitForm = useCallback(async () => {
    if (uriAvatar !== initialValue.avatar) {
      const url = await uploadImage(uriAvatar);
      setUserInfo(prev => ({...prev, avatar: url}));
    }
    console.log('handle submit');
    setIsSubmitted(false);
    onSubmit(userInfo);
  }, [
    // handleSubmit,
    setUserInfo,
    uriAvatar,
    onSubmit,
    setIsSubmitted,
    initialValue,
    userInfo,
  ]);

  const handleUploadImage = useCallback(async () => {
    const res = await ImagePicker.launchImageLibrary(options);
    if (res.didCancel) {
      return;
    }

    setUriAvatar(res.assets[0].uri);

    // const url = await uploadImage(res.assets[0].uri);
    // console.log('url ', url);

    console.log('my res', res);
  }, []);

  const uploadImage = async imageUri => {
    if (!imageUri) {
      return null;
    }
    try {
      const reference = storage().ref(
        'images/' + new Date().getTime() + '.jpg',
      );
      const response = await fetch(imageUri);
      const blob = await response.blob();

      await reference.put(blob);
      const url = await reference.getDownloadURL();
      console.log(url);
      return url;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <AvatarUpload
        handleUploadImage={handleUploadImage}
        uriAvatar={uriAvatar}
      />
      <View className="flex-col mx-4 mt-2">
        <TextInput
          className="bg-white border-b-1 h-[70]"
          mode="flat"
          label="Name"
          value={userInfo.username}
          activeUnderlineColor="#000"
          {...register('username', {
            required: 'user name is required filed',
            maxLength: 60,
          })}
          onChangeText={e => setUserInfo(prev => ({...prev, username: e}))}
        />
        {/* <Text>{errors.username}</Text> */}
        <TextInput
          className="bg-white border-b-1 h-[70] mt-5"
          mode="flat"
          label="Bio"
          value={userInfo.bio}
          activeUnderlineColor="#000"
          onChangeText={e => setUserInfo(prev => ({...prev, bio: e}))}
        />
      </View>
    </View>
  );
};

const AvatarUpload = ({handleUploadImage, uriAvatar}) => {
  return (
    <View className="bg-white flex-row m-4 items-center">
      <Image
        source={{
          uri: uriAvatar,
        }}
        className="h-[60px] w-[60px] rounded-full"
      />
      <Button
        mode="text"
        textColor="#4caf50"
        className="ml-3"
        onPress={handleUploadImage}>
        Choose an image
      </Button>
    </View>
  );
};
