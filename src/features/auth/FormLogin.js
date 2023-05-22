import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {routesScreen} from '../../navigations';

export const FormLogin = () => {
  const navigation = useNavigation();

  return (
    <View className="w-full">
      <View className="gap-5">
        <View className=" border items-center flex-row px-2 rounded-md border-slate-300">
          <IconFontAwesome5 className="" name="envelope" size={22} solid />
          <TextInput className="flex-1 ml-1 " placeholder="Email" />
        </View>
        <View className=" border items-center flex-row px-2 rounded-md border-slate-300">
          <IconFontAwesome5 className="" name="lock" size={22} solid />
          <TextInput className="flex-1 ml-1 " placeholder="Password" />
        </View>
      </View>
      <View className="mt-2 pl-2">
        <TouchableOpacity
          onPress={() => navigation.navigate(routesScreen.PasswordReset)}>
          <Text className="italic text-sm text-emerald-200">
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mt-7">
        <Button mode="contained" className="h-[50px] justify-center">
          Login
        </Button>
      </View>
      <View className="mt-3 justify-center flex-row">
        <Text>Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(routesScreen.SignUp)}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-center mt-5">Or</Text>
      <View className="mt-5">
        <Button
          // eslint-disable-next-line react/no-unstable-nested-components
          icon={() => (
            <IconFontAwesome5 name="google" size={15} color="#db4a39" solid />
          )}
          mode="outlined"
          className="h-[50px] justify-center"
          // onPress={handleLoginByGoogle}
          onPress={() => navigation.navigate(routesScreen.Verify)}>
          <Text className="text-black ml-18"> Login with Google</Text>
        </Button>
      </View>
    </View>
  );
};
