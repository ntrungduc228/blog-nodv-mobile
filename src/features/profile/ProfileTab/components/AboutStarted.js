import {View} from 'react-native';
import React from 'react';
import {Text, Button} from 'react-native-paper';

export const AboutStarted = ({onPress}) => {
  return (
    <View className="flex justify-center pb-7 mt-14">
      <View className="flex flex-col items-center justify-center px-4">
        <Text variant="titleMedium" className="font-semibold">
          Tell the world about yourself
        </Text>
        <Text className="my-5 text-sm text-[#757575]">
          Here’s where you can share more about yourself: your history, work
          experience, accomplishments, interests, dreams, and more. You can even
          add images and use rich text to personalize your bio.
        </Text>
        <Button
          className="mt-2"
          buttonColor="#4caf50"
          textColor="#fff"
          mode="contained"
          onPress={onPress}>
          Get started
        </Button>
      </View>
    </View>
  );
};
