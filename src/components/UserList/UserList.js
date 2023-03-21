import {Dialog, Portal} from 'react-native-paper';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';

import {FollowUserButton} from '../../features/user';
import React from 'react';

export const UserList = ({users}) => {
  return (
    // <SafeAreaView>
    <View className="flex-col gap-4 h-[300]">
      <ScrollView className="">
        {users?.map(user => (
          <UserComponent user={user} key={user.id} />
        ))}
      </ScrollView>
    </View>
    // </SafeAreaView>
  );
};

const UserComponent = ({user}) => {
  return (
    <View
      className=" flex-1 flex-row items-start justify-between mb-4 ml-2"
      key={user.id}>
      <View className="flex-row items-center flex-1">
        <TouchableOpacity onPress={() => console.log(user.name)}>
          <Image
            source={{
              uri:
                user?.avatar ||
                'https://firebasestorage.googleapis.com/v0/b/blog-nodv.appspot.com/o/images%2F1677399030007.jpg?alt=media&token=ba20149c-1dbd-4638-a57f-578df11d85c7',
            }}
            className="h-[60px] w-[60px] rounded-full"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log(user.username)}>
          <View className="ml-4 mr-2 block">
            <Text className="break-words text-base font-bold">
              {user.username}
            </Text>
            <View className="mt-1 block break-words">
              <Text className=" color break-all text-sm font-normal line-clamp-2">
                {user?.bio}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <FollowUserButton className="" fullWith followerId={user?.id} />
      </View>
    </View>
  );
};
