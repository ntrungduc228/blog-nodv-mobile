import {View} from 'react-native';
import React from 'react';
import {Text} from 'react-native-paper';
import {UserList} from '../../../../components/UserList';
import {useSelector} from 'react-redux';
import {getAllUsersFollowing} from '../../../../api/userApi';
import {useQuery} from 'react-query';

export const FollowingModal = () => {
  const profileId = useSelector(state => state.profile.data?.id);
  const {data} = useQuery('usersFollowing', () =>
    getAllUsersFollowing(profileId),
  );

  return (
    <View className="flex jusitfy-center">
      <View className="bg-white mx-4  p-6">
        <Text
          variant="titleSmalls"
          className="mb-10 block text-black font-semibold">
          Following
        </Text>
        {data && <UserList users={data} />}
      </View>
    </View>
  );
};
