import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {FormForgotPassword} from '../features/auth';
import {useNavigation} from '@react-navigation/native';
import {routesScreen} from '../navigations';

export const ForgotPasswordScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="p-5 h-full bg-white justify-center">
      <FormForgotPassword />
      <View className="mt-5 justify-center flex-row">
        <TouchableOpacity
          onPress={() => navigation.navigate(routesScreen.Login)}>
          <Text className="text-emerald-200">Back Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
