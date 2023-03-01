import {useDispatch, useSelector} from 'react-redux';
import {useFollowUser, useUnFollowUser} from '../../hooks';

import {Chip} from 'react-native-paper';
import {updateUser} from '../../../../redux/slices/userSlice';
import {useState} from 'react';

export const FollowUserButton = ({followerId}) => {
  const followingIds = useSelector(
    state => state.user.data.info.followingId || [],
  );
  const dispatch = useDispatch();
  const [followed, setFollowed] = useState(followingIds?.includes(followerId));
  const handleUpdateLocalFollowing = isFollowed => {
    let newFollowingIds = [...followingIds];
    if (isFollowed) {
      newFollowingIds.push(followerId);
    } else {
      newFollowingIds = newFollowingIds.filter(id => id !== followerId);
    }
    dispatch(updateUser({followingId: newFollowingIds}));
  };
  const {mutate: followUser} = useFollowUser({
    onSuccess: () => {
      setFollowed(true);
      handleUpdateLocalFollowing(true);
    },
  });
  const {mutate: unFollowUser} = useUnFollowUser({
    onSuccess: () => {
      handleUpdateLocalFollowing(false);
      setFollowed(false);
    },
  });
  const handleFollow = () => {
    if (followed) {
      unFollowUser(followerId);
    } else {
      followUser(followerId);
    }
  };
  return (
    <Chip
      textStyle={{
        color: '#fff',
      }}
      onPress={handleFollow}
      className={`rounded-full  h-8 ${
        followed ? ' bg-slate-500' : 'bg-emerald-600'
      }`}>
      {followed ? 'Following' : 'Follow'}
    </Chip>
  );
};
