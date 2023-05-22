import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const FormVerifyForgotPassword = () => {
  return (
    <View>
      <View className="my-2">
        <View className=" border items-center flex-row px-2 rounded-md border-slate-300">
          <TextInput className="flex-1 ml-1 " placeholder="Enter OTP" />
        </View>
      </View>
      <View className="my-2">
        <View className=" border items-center flex-row px-2 rounded-md border-slate-300">
          <IconFontAwesome5 className="" name="lock" size={22} solid />

          <TextInput className="flex-1 ml-1 " placeholder="New Password" />
        </View>
      </View>
      <View className="my-2">
        <View className=" border items-center flex-row px-2 rounded-md border-slate-300">
          <IconFontAwesome5 className="" name="lock" size={22} solid />

          <TextInput
            className="flex-1 ml-1 "
            placeholder="Confirm New Password"
          />
        </View>
      </View>
      <View className="mt-2">
        <Button mode="contained" className="h-[50px] justify-center">
          Verify
        </Button>
      </View>
      <View className="mt-5 justify-center flex-row">
        <Text>Didn't received OTP? </Text>
        <TouchableOpacity
        //   onPress={() => navigation.navigate(routesScreen.Login)}>
        >
          <Text className="text-emerald-200">Resend now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
