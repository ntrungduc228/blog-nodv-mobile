import {cloneElement, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFollowUser, useUnFollowUser} from '../../hooks';

import {Chip} from 'react-native-paper';
import {NotificationType} from '../../../../config/dataType';
import {callApiCreateNotification} from '../../../../utils/generationNotification';
import {createNotification} from '../../../../api/notificationApi';
import {updateCountNotifications} from '../../../../api/userApi';
import {updateUser} from '../../../../redux/slices/userSlice';
import {useMutation} from 'react-query';

export const FollowUserButton = ({
  followerId,
  children,
  fullWith,
  primary,
  followerEmail,
}) => {
  const followingIds = useSelector(
    state => state.user.data.info.followingId || [],
  );
  const userId = useSelector(state => state.user.data.info.id);
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

  const createNotificationMutation = useMutation(createNotification, {
    onSuccess: data => {
      console.log('createNotificationMutation', data);
      const Increase = {
        isIncrease: true,
        userId: data.receiverId,
      };
      updateUserIncreaseNumOfNotification.mutate(Increase);
    },
  });

  const updateUserIncreaseNumOfNotification = useMutation(
    updateCountNotifications,
  );
  const {mutate: followUser} = useFollowUser({
    onSuccess: data => {
      setFollowed(true);
      handleUpdateLocalFollowing(true);
      callApiCreateNotification(
        data,
        NotificationType.FOLLOW,
        createNotificationMutation,
        userId,
      );
    },
  });
  const {mutate: unFollowUser} = useUnFollowUser({
    onSuccess: () => {
      handleUpdateLocalFollowing(false);
      setFollowed(false);
    },
  });
  const handleFollow = () => {
    console.log('handleFollow');
    if (followed) {
      unFollowUser(followerId);
    } else {
      followUser(followerId);
    }
  };
  return children ? (
    typeof children === 'function' ? (
      children({followed, handleFollow})
    ) : (
      cloneElement(children, {followed, onPress: handleFollow})
    )
  ) : (
    <Chip
      textStyle={{
        color: followed ? 'black' : 'white',
      }}
      onPress={handleFollow}
      mode={followed ? 'outlined' : 'flat'}
      className={`rounded-full h-8 ${
        followed
          ? 'bg-transparent'
          : `${primary ? 'bg-emerald-700' : 'bg-slate-900'}`
      } ${fullWith ? 'w-full' : ''} items-center`}>
      {followed ? 'Following' : 'Follow'}
    </Chip>
  );
};
