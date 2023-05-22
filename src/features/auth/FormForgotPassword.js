import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';

export const FormForgotPassword = () => {
  return (
    <View>
      <Text className="font-bold text-black text-xl text-center">
        Enter your email to receive the OTP
      </Text>
      <View className="my-5">
        <View className=" border items-center flex-row px-2 rounded-md border-slate-300">
          <TextInput className="flex-1 ml-1 " placeholder="Enter Email" />
        </View>
      </View>
      <View className="mt-2">
        <Button mode="contained" className="h-[50px] justify-center">
          Enter
        </Button>
      </View>
    </View>
  );
};
