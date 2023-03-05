import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native';
import React from 'react';
import {Dialog, Portal} from 'react-native-paper';

const users = [
  {
    id: '1',
    name: 'John',
    avatarUrl:
      'https://firebasestorage.googleapis.com/v0/b/blog-nodv.appspot.com/o/images%2F1669780325902clouds_sky_porous_103701_2560x1600.jpg?alt=media&token=f43cd46a-bd9a-44a9-a70f-d26c86c43f7b',
    bio: 'hihihi',
  },
  {
    id: '2',
    name: 'Vi',
    avatarUrl:
      'https://firebasestorage.googleapis.com/v0/b/blog-nodv.appspot.com/o/images%2F1670292301097sky3.jpg?alt=media&token=faa76cb9-3a53-41ac-ab82-72b069c3bbbc',
    bio: 'student',
  },
  {
    id: '3',
    name: 'John',
    avatarUrl:
      'https://firebasestorage.googleapis.com/v0/b/blog-nodv.appspot.com/o/images%2F1669780325902clouds_sky_porous_103701_2560x1600.jpg?alt=media&token=f43cd46a-bd9a-44a9-a70f-d26c86c43f7b',
    bio: 'hihihi',
  },
  {
    id: '4',
    name: 'Vi',
    avatarUrl:
      'https://firebasestorage.googleapis.com/v0/b/blog-nodv.appspot.com/o/images%2F1670292301097sky3.jpg?alt=media&token=faa76cb9-3a53-41ac-ab82-72b069c3bbbc',
    bio: 'student',
  },
  {
    id: '5',
    name: 'John',
    avatarUrl:
      'https://firebasestorage.googleapis.com/v0/b/blog-nodv.appspot.com/o/images%2F1669780325902clouds_sky_porous_103701_2560x1600.jpg?alt=media&token=f43cd46a-bd9a-44a9-a70f-d26c86c43f7b',
    bio: 'hihihi',
  },
  {
    id: '6',
    name: 'Vi',
    avatarUrl:
      'https://firebasestorage.googleapis.com/v0/b/blog-nodv.appspot.com/o/images%2F1670292301097sky3.jpg?alt=media&token=faa76cb9-3a53-41ac-ab82-72b069c3bbbc',
    bio: 'student',
  },
  {
    id: '7',
    name: 'John',
    avatarUrl:
      'https://firebasestorage.googleapis.com/v0/b/blog-nodv.appspot.com/o/images%2F1669780325902clouds_sky_porous_103701_2560x1600.jpg?alt=media&token=f43cd46a-bd9a-44a9-a70f-d26c86c43f7b',
    bio: 'hihihi',
  },
  {
    id: '8',
    name: 'Vi',
    avatarUrl:
      'https://firebasestorage.googleapis.com/v0/b/blog-nodv.appspot.com/o/images%2F1670292301097sky3.jpg?alt=media&token=faa76cb9-3a53-41ac-ab82-72b069c3bbbc',
    bio: 'student',
  },
  {
    id: '9',
    name: 'John',
    avatarUrl:
      'https://firebasestorage.googleapis.com/v0/b/blog-nodv.appspot.com/o/images%2F1669780325902clouds_sky_porous_103701_2560x1600.jpg?alt=media&token=f43cd46a-bd9a-44a9-a70f-d26c86c43f7b',
    bio: 'hihihi',
  },
  {
    id: '94',
    name: 'John',
    avatarUrl:
      'https://firebasestorage.googleapis.com/v0/b/blog-nodv.appspot.com/o/images%2F1669780325902clouds_sky_porous_103701_2560x1600.jpg?alt=media&token=f43cd46a-bd9a-44a9-a70f-d26c86c43f7b',
    bio: 'hihihi',
  },
  {
    id: '549',
    name: 'John',
    avatarUrl:
      'https://firebasestorage.googleapis.com/v0/b/blog-nodv.appspot.com/o/images%2F1669780325902clouds_sky_porous_103701_2560x1600.jpg?alt=media&token=f43cd46a-bd9a-44a9-a70f-d26c86c43f7b',
    bio: 'hihihi',
  },
];

export const UserList = ({}) => {
  return (
    // <SafeAreaView>
    <View className="flex-col gap-4 h-[300]">
      <ScrollView className="">
        {users?.map(user => (
          <UserComponent user={user} key={user.id}></UserComponent>
        ))}
      </ScrollView>
    </View>
    // </SafeAreaView>
  );
};

const UserComponent = ({user}) => {
  return (
    <View
      className="relative flex flex-1 w-full items-start justify-between mb-4 ml-2"
      key={user.id}>
      <View className="flex-1 flex-row items-center">
        <TouchableOpacity onPress={() => console.log(user.name)}>
          <Image
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/blog-nodv.appspot.com/o/images%2F1677399030007.jpg?alt=media&token=ba20149c-1dbd-4638-a57f-578df11d85c7',
            }}
            className="h-[60px] w-[60px] rounded-full"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log(user.name)}>
          <View className="ml-4 mr-2 block">
            <Text className="break-all text-base font-bold">
              {user.name} {user.id}
            </Text>
            <View className="mt-1 block  break-words">
              <Text className=" color break-all text-sm font-normal line-clamp-2">
                {user?.bio}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
