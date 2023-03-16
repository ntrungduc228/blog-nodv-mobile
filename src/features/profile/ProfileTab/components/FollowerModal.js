import {View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import {UserList} from '../../../../components/UserList';
import {useSelector} from 'react-redux';
import {getAllUsersFollower} from '../../../../api/userApi';
import {useQuery} from 'react-query';

export const FollowerModal = () => {
  const profileId = useSelector(state => state.profile.data?.id);
  const {data} = useQuery('usersFollower', () =>
    getAllUsersFollower(profileId),
  );

  return (
    <View className="flex jusitfy-center">
      <View className="bg-white mx-4  p-4">
        <Text
          variant="titleSmalls"
          className="mb-10 block text-black font-semibold">
          Followers
        </Text>
        {data && <UserList users={data} />}
      </View>
    </View>
  );
};
