import {View, Text} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';

export const AboutDescription = ({onPress, userBio, isOwnProfile}) => {
  return (
    <View className="p-4 flex-1 justify-between">
      <Text className="text-black text-lg">{userBio}</Text>
      <View className="justify-center flex-row px-5">
        {isOwnProfile && (
          <Button mode="text" className="" onPress={onPress}>
            <Text className="text-teal-500 uppercase">EDIT</Text>
          </Button>
        )}
      </View>
    </View>
  );
};
