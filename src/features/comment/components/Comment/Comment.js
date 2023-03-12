import {formatRelative} from 'date-fns';
import React, {useMemo, useState, memo} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {useMutation} from 'react-query';
import {useSelector} from 'react-redux';
import {createComment, updateCommentApi} from '../../../../api/commentApi';
import {createNotification} from '../../../../api/notificationApi';
import {updateCountNotifications} from '../../../../api/userApi';
import {NotificationType} from '../../../../config/dataType';
import {callApiCreateNotification} from '../../../../utils/generationNotification';
import CommentEditor from '../../CommentEditor/CommentEditor';
import {CommentList} from '../../CommentList/CommentList';
import CommentFooter from './CommentFooter';
import CommentMenu from './CommentMenu';

function Comment({comment, post}) {
  const user = useSelector(state => state.user.data.info);
  const replyComments = useSelector(
    state => state.comment.commentsByParentId[comment.id],
  );
  const rootComments = useSelector(state => state.comment.list);
  const [isReply, setIsReply] = useState(false);
  const [isShowReply, setIsShowReply] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const getCommentUserId = comment => {
    var parentComment = rootComments.find(
      commentParent => comment.replyId === commentParent.id,
    );
    return parentComment.userId;
  };
  const displayTime = useMemo(() => {
    return formatRelative(new Date(comment.createdDate), new Date());
  }, [comment.createdDate]);
  const createNewReplyComment = useMutation(createComment, {
    onSuccess: data => {
      let comment = {...data, commentParentUserId: getCommentUserId(data)};
      callApiCreateNotification(
        comment,
        NotificationType.REPLYCOMMENT,
        createNewNotificationReplyComment,
        user.id,
      );
    },
  });
  const createNewNotificationReplyComment = useMutation(createNotification, {
    onSuccess: data => {
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
  const handleReply = comment => {
    createNewReplyComment.mutate(comment);
    setIsReply(false);
    setIsShowReply(true);
  };
  const updateCommentById = useMutation(updateCommentApi);
  const handleUpdateComment = comment => {
    updateCommentById.mutate(comment);
    setIsEdit(false);
    setIsOpenMenu(false);
  };
  return (
    <View className="m-3">
      {isEdit ? (
        <CommentEditor
          initialComment={comment}
          onSubmit={handleUpdateComment}
        />
      ) : (
        <>
          <View className="flex-row justify-between items-center">
            <View className="flex-row">
              <Avatar.Image
                size={44}
                source={{
                  uri: comment.user.avatar,
                }}
              />
              <View className="pl-3">
                <Text className="text-base text-black">
                  {comment.user.username}
                </Text>
                <Text>{displayTime}</Text>
              </View>
            </View>
            <View className="relative -z-10">
              <TouchableOpacity
                onPress={() => {
                  setIsOpenMenu(prev => !prev);
                }}>
                <Entypo name="dots-three-vertical" size={20} color="black" />
              </TouchableOpacity>
              {isOpenMenu && (
                <CommentMenu
                  isEdit={isEdit}
                  isUser={comment.userId === user.id ? true : false}
                  setIsEdit={() => {
                    setIsEdit(prev => !prev);
                  }}
                  setIsOpenMenu={setIsOpenMenu}
                  commentId={comment.id}
                />
              )}
            </View>
          </View>
          <View className="-z-10">
            <Text className="text-lg text-black my-6">{comment.content}</Text>
          </View>
          <CommentFooter
            numReplyComments={replyComments?.length}
            onReply={() => {
              setIsReply(prev => !prev);
            }}
            onShowReply={() => setIsShowReply(prev => !prev)}
            isShowReply={isShowReply}
            comment={comment}
          />
        </>
      )}

      {(isShowReply || isReply) && (
        <View className="mb-6 ml-3 border-l-2 border-slate-400">
          {isReply && (
            <CommentEditor
              onCancel={() => {
                setIsReply(false);
              }}
              initialComment={{
                replyId: comment.id,
              }}
              onSubmit={handleReply}
              post={post}
            />
          )}
          {isShowReply && replyComments?.length > 0 && (
            <CommentList comments={replyComments} post={post} />
          )}
        </View>
      )}
    </View>
  );
}

export default Comment;
