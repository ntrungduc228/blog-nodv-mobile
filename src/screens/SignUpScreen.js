import {View, Text, Image} from 'react-native';
import logo from '../assets/imgs/logo.png';
import {FormSignUp} from '../features/auth';

import React from 'react';

export const SignUpScreen = () => {
  return (
    <View className="p-5 h-full bg-white">
      <View className="mt-[80px] mb-[50px] h-[100px] flex-row justify-center">
        <Image
          className=" h-[100px] w-[220px]"
          source={logo}
          resizeMode="contain"
        />
      </View>
      <View>
        <FormSignUp />
      </View>
    </View>
  );
};
