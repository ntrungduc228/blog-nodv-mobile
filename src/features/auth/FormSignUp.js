import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import IconFontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Button, RadioButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {routesScreen} from '../../navigations';

export const FormSignUp = () => {
  const navigation = useNavigation();

  return (
    <View className="w-full ">
      <View className="gap-5">
        <View className=" border items-center flex-row px-2 rounded-md border-slate-300">
          <IconFontAwesome5 className="" name="envelope" size={22} solid />
          <TextInput className="flex-1 ml-1 " placeholder="Email" />
        </View>
        <View className=" border items-center flex-row px-2 rounded-md border-slate-300">
          <IconFontAwesome5 className="" name="user" size={22} solid />
          <TextInput className="flex-1 ml-1 " placeholder="Username" />
        </View>
        <View>
          <RadioButton.Group value={true}>
            <View className="flex-row gap-3">
              <View className="flex-row items-center">
                <RadioButton value={true} />
                <Text>Male</Text>
              </View>
              <View className="flex-row items-center">
                <RadioButton value={false} />
                <Text>Female</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>
        <View className=" border items-center flex-row px-2 rounded-md border-slate-300">
          <IconFontAwesome5 className="" name="lock" size={22} solid />
          <TextInput className="flex-1 ml-1 " placeholder="Password" />
        </View>
        <View className=" border items-center flex-row px-2 rounded-md border-slate-300">
          <IconFontAwesome5 className="" name="lock" size={22} solid />
          <TextInput className="flex-1 ml-1 " placeholder="Confirm Password" />
        </View>
      </View>

      <View className="mt-7">
        <Button mode="contained" className="h-[50px] justify-center">
          Sign Up
        </Button>
      </View>
      <View className="mt-5 justify-center flex-row">
        <Text>If you have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(routesScreen.Login)}>
          <Text>Login now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
