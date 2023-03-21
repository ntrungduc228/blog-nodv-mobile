import React from 'react';
import {Text} from 'react-native-paper';
import {UserList} from '../../../../components/UserList';
import {View} from 'react-native';
import {getAllUsersFollower} from '../../../../api/userApi';
import {useQuery} from 'react-query';
import {useSelector} from 'react-redux';

export const FollowerModal = () => {
  const profileId = useSelector(state => state.profile.data?.id);
  const {data} = useQuery('usersFollower', () =>
    getAllUsersFollower(profileId),
  );

  return (
    <View className="flex justify-center">
      <View className="bg-white mx-4  p-4">
        <Text
          variant="displaySmall"
          className="mb-10 block text-black font-semibold">
          Followers
        </Text>
        {data && <UserList users={data} />}
      </View>
    </View>
  );
};
