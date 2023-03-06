import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useMutation} from 'react-query';
import {useDispatch, useSelector} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, View} from 'react-native';
import {likeComment, unlikeComment} from '../../../../api/commentApi';
import {createNotification} from '../../../../api/notificationApi';
import {updateCountNotifications} from '../../../../api/userApi';
import {NotificationType} from '../../../../config/dataType';
import {updateComment} from '../../../../redux/slices/commentSlice';
import {callApiCreateNotification} from '../../../../utils/generationNotification';

function CommentFooter({
  onReply,
  onShowReply,
  numReplyComments = 0,
  isShowReply,
  comment,
}) {
  const userId = useSelector(state => state.user?.data?.info?.id);
  const isLiked = comment?.userLikeIds?.includes(userId);
  const dispatch = useDispatch();

  const likeCommentMutation = useMutation(likeComment, {
    onSuccess: data => {
      console.log(data);
      dispatch(updateComment(data));
      callApiCreateNotification(
        data,
        NotificationType.LIKECOMMENT,
        createNotificationMutation,
        userId,
      );
    },
    onError: data => {
      console.log(data);
    },
  });
  const createNotificationMutation = useMutation(createNotification, {
    onSuccess: () => {
      const Increase = {
        isIncrease: true,
        userId: comment.userId,
      };
      updateUserIncreaseNumOfNotification.mutate(Increase);
    },
  });
  const unlikeCommentMutation = useMutation(
    unlikeComment,
    //   , {
    //   onSuccess: (data) => {
    //     dispatch(updateComment(data));
    //   },
    // }
  );
  const updateUserIncreaseNumOfNotification = useMutation(
    updateCountNotifications,
  );

  const handleLike = () => {
    if (!isLiked) {
      likeCommentMutation.mutate(comment.id);
    } else {
      console.log(comment.id);
      unlikeCommentMutation.mutate(comment.id);
    }
  };
  return (
    <View className="flex-row justify-between">
      <View className="flex-row justify-between">
        <TouchableOpacity className="flex-row" onPress={handleLike}>
          <MaterialCommunityIcons name="hand-clap" size={20} color="black" />
          <Text className="text-base pr-3">
            {' '}
            {comment?.userLikeIds ? comment.userLikeIds.length : 0}
          </Text>
        </TouchableOpacity>

        <Text className="pl-3 text-base" onPress={onShowReply}>
          <FontAwesome name="comment-o" size={20} color="black" />{' '}
          {isShowReply ? `Hide Reply` : numReplyComments + ` Reply`}
        </Text>
      </View>
      <TouchableOpacity className="text-base" onPress={onReply} onP>
        <Text>Reply</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CommentFooter;
