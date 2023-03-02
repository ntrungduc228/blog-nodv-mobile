import {cloneElement, useState} from 'react';

import {Chip} from 'react-native-paper';
import {useLikePost} from '../../hooks/useLikePost';
import {useQueryClient} from 'react-query';
import {useSelector} from 'react-redux';
import {useUnLikePost} from '../../hooks/useUnlikePost';

export const LikePostButton = ({userLikeIds = [], postId, children}) => {
  const queryClient = useQueryClient();
  const userId = useSelector(state => state.user.data.info.id);
  const [liked, setLiked] = useState(userLikeIds?.includes(userId));
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
    onSuccess: () => {
      setLiked(true);
      handleUpdateLocalLike(true);
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
