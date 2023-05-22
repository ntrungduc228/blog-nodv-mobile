import {View, Text} from 'react-native';
import React from 'react';
import {FormOTP, FormVerifyForgotPassword} from '../features/auth';

export const OTPScreen = () => {
  return (
    <View className="p-5 h-full bg-white justify-center">
      <Text className="font-bold text-black text-xl text-center">
        Enter the OTP received on your email
      </Text>
      {/* <FormOTP /> */}
      <FormVerifyForgotPassword />
    </View>
  );
};
