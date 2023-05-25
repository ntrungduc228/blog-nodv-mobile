import {View, Text, Image, ScrollView} from 'react-native';
import React from 'react';
import logo from '../assets/imgs/logo.png';
import {FormLogin} from '../features/auth';

export const LoginScreen = () => {
  return (
    <View className="p-5 h-full bg-white">
      <ScrollView className="p-5" contentContainerStyle={{flexGrow: 1}}>
        <View className="my-[60px] h-[100px] flex-row justify-center">
          <Image
            className=" h-[100px] w-[220px]"
            source={logo}
            resizeMode="contain"
          />
        </View>
        <View className="">
          <FormLogin />
        </View>
      </ScrollView>
    </View>
  );
};
