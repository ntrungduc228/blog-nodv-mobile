import {View, Text, Image} from 'react-native';
import React from 'react';
import logo from '../assets/imgs/logo.png';
import {FormLogin} from '../features/auth';

export const LoginScreen = () => {
  return (
    <View className="p-5 h-full bg-white">
      <View className="my-[80px] h-[100px] flex-row justify-center">
        <Image
          className=" h-[100px] w-[220px]"
          source={logo}
          resizeMode="contain"
        />
      </View>
      <View className="">
        <FormLogin />
      </View>
    </View>
  );
};
