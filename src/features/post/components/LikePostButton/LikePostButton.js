import {cloneElement, useState} from 'react';
import {useMutation, useQueryClient} from 'react-query';

import {Chip} from 'react-native-paper';
import {NotificationType} from '../../../../config/dataType';
import {callApiCreateNotification} from '../../../../utils/generationNotification';
import {createNotification} from '../../../../api/notificationApi';
import {updateCountNotifications} from '../../../../api/userApi';
import {useEffect} from 'react';
import {useLikePost} from '../../hooks/useLikePost';
import {useSelector} from 'react-redux';
import {useUnLikePost} from '../../hooks/useUnlikePost';

export const LikePostButton = ({userLikeIds = [], postId, children}) => {
  const queryClient = useQueryClient();
  const userId = useSelector(state => state.user.data.info.id);
  const [liked, setLiked] = useState(userLikeIds?.includes(userId));
  useEffect(() => {
    setLiked(userLikeIds?.includes(userId));
  }, [userId, userLikeIds]);

  const handleUpdateLocalLike = isLiked => {
    let newUserLikeIds = [...userLikeIds];
    if (isLiked) {
      newUserLikeIds.push(userId);
    } else {
      newUserLikeIds = newUserLikeIds.filter(id => id !== userId);
    }
    queryClient.setQueryData(['post', postId], prev => {
      return {
        ...prev,
        userLikeIds: newUserLikeIds,
      };
    });
  };
  const {mutate: likePost} = useLikePost({
    onSuccess: data => {
      setLiked(true);
      handleUpdateLocalLike(true);
      callApiCreateNotification(
        data,
        NotificationType.LIKE,
        createNotificationLikePostMutation,
        userId,
      );
    },
  });
  const {mutate: unLikePost} = useUnLikePost({
    onSuccess: () => {
      handleUpdateLocalLike(false);
      setLiked(false);
    },
  });
  const handleLike = () => {
    if (liked) {
      unLikePost(postId);
    } else {
      likePost(postId);
    }
  };

  // Vi's Code
  const updateUserIncreaseNumOfNotification = useMutation(
    updateCountNotifications,
  );
  const createNotificationLikePostMutation = useMutation(createNotification, {
    onSuccess: data => {
      const Increase = {
        isIncrease: true,
        userId: data.receiverId,
      };
      updateUserIncreaseNumOfNotification.mutate(Increase);
    },
  });

  return children ? (
    typeof children === 'function' ? (
      children({liked, handleLike})
    ) : (
      cloneElement(children, {liked, onPress: handleLike})
    )
  ) : (
    <Chip
      textStyle={{
        color: '#fff',
      }}
      onPress={handleLike}
      className={`rounded-full  h-8 ${
        liked ? ' bg-slate-500' : 'bg-emerald-600'
      }`}>
      {liked ? 'Liked' : 'like'}
    </Chip>
  );
};
