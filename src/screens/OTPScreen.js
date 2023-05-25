import {View, Text} from 'react-native';
import React from 'react';
import {FormOTP, FormVerifyForgotPassword} from '../features/auth';

const typeForm = {
  otp: 'otp',
  forgotPass: 'forgotPassword',
};

export const OTPScreen = ({route, navigation}) => {
  const {key} = route.params;
  return (
    <View className="p-5 h-full bg-white justify-center">
      <Text className="font-bold text-black text-xl text-center">
        Enter the OTP received on your email
      </Text>
      {key == typeForm.otp ? <FormOTP /> : <FormVerifyForgotPassword />}
    </View>
  );
};
