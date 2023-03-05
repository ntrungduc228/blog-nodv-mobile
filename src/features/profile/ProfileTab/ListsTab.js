import {View, Text} from 'react-native';
import React from 'react';

export const ListsTab = () => {
  return (
    <View className="flex-1 bg-white">
      <View className="mt-20 justify-center">
        <Text className="text-black text-lg text-center break-words mx-10">
          You don't have any public posts.
        </Text>
      </View>
    </View>
  );
};
