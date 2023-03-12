import {View, Text} from 'react-native';
import React from 'react';
import {UserList} from '../../../../components/UserList';

export const FollowingModal = () => {
  return (
    <View className="flex jusitfy-center">
      <View className="bg-white mx-4  p-6">
        <Text
          variant="titleSmalls"
          className="mb-10 block text-black font-semibold">
          FollowingModal{' '}
        </Text>
        <UserList />
      </View>
    </View>
  );
};
