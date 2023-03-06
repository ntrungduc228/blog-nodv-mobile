import {View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import {UserList} from '../../../../components/UserList';

export const FollowerModal = () => {
  return (
    <View className="flex jusitfy-center">
      <View className="bg-white mx-4  p-6">
        <Text
          variant="titleSmalls"
          className="mb-10 block text-black font-semibold">
          Followers
        </Text>
        <UserList />
      </View>
    </View>
  );
};
