import {View, Text, Image, ScrollView} from 'react-native';
import logo from '../assets/imgs/logo.png';
import {FormSignUp} from '../features/auth';

import React from 'react';

export const SignUpScreen = () => {
  return (
    <View className=" h-full bg-white">
      <ScrollView className="p-5" contentContainerStyle={{flexGrow: 1}}>
        <View className="mt-[60px] mb-[50px] h-[100px] flex-row justify-center">
          <Image
            className=" h-[100px] w-[220px]"
            source={logo}
            resizeMode="contain"
          />
        </View>
        <View>
          <FormSignUp />
        </View>
      </ScrollView>
    </View>
  );
};
