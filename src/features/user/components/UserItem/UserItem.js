import {Text, View} from 'react-native';

import {Avatar} from 'react-native-paper';
import {FollowUserButton} from '../FollowUserButton';
import React from 'react';

export const UserItem = ({user}) => {
  console.log(user);
  return (
    <View className="flex-row justify-between gap-x-3 items-center">
      {user?.avatar ? (
        <Avatar.Image
          size={40}
          source={{
            uri: user?.avatar,
          }}
        />
      ) : (
        <Avatar.Icon size={40} icon="account" />
      )}

      <View className="flex-1 justify-center mr-4">
        <Text className="text-black">{user?.username}</Text>
        {user?.bio && <Text>{user?.bio}</Text>}
      </View>
      <FollowUserButton followerId={user?.id} primary />
    </View>
  );
};
