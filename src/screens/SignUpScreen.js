import {View, Text, Image, ScrollView} from 'react-native';
import logo from '../assets/imgs/logo.png';
import {FormSignUp} from '../features/auth';

import React from 'react';

export const SignUpScreen = () => {
  return (
    <ScrollView className="" contentContainerStyle={{flexGrow: 1}}>
      <View className="p-5 h-screen bg-white">
        <View className="mt-[60px] mb-[50px] h-[100px] flex-row justify-center">
          <Image
            className=" h-[100px] w-[220px]"
            source={logo}
            resizeMode="contain"
          />
        </View>
        <FormSignUp />
      </View>
    </ScrollView>
  );
};
