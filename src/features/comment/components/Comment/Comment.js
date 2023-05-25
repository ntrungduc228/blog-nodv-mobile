import {Image, Text, View} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';

import {Avatar} from 'react-native-paper';
import CommentFooter from './CommentFooter';
import {CommentList} from '../../CommentList/CommentList';
import CommentMenu from './CommentMenu';
import {formatRelative} from 'date-fns';
import {useComment} from '../../../../screens';
import {useSelector} from 'react-redux';

function Comment({comment, post, isActiveEdit}) {
  const {
    setEditorState,
    setEditorComment,
    newReplyComment,
    setNewReplyComment,
    setNewUsernameParent,
  } = useComment();
  const user = useSelector(state => state.user.data.info);
  const replyComments = useSelector(
    state => state.comment.commentsByParentId[comment.id],
  );
  const [isShowReply, setIsShowReply] = useState(false);
  useEffect(() => {
    if (!newReplyComment) {
      return;
    }
    if (newReplyComment?.replyId === comment.id) {
      setIsShowReply(true);
      setNewReplyComment(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newReplyComment, comment.id]);

  const displayTime = useMemo(() => {
    return formatRelative(new Date(comment.createdDate), new Date());
  }, [comment.createdDate]);

  return (
    <View className={`${isActiveEdit ? 'bg-slate-100' : ''}  p-3`}>
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
            <CommentMenu
              //  isEdit={isEdit}
              isUser={comment.userId === user.id}
              setIsEdit={() => {
                setEditorState('edit');
                setEditorComment(comment);
              }}
              commentId={comment.id}
            />
          </View>
        </View>
        <View className="-z-10">
          <Text className="text-lg text-black my-6">{comment.content}</Text>
          {comment.image && (
            <Image
              className="bg-gray-100 h-10 rounded-lg mb-4"
              source={{uri: comment.image}}
              style={{width: 200, height: 200}}
            />
          )}
        </View>
        <CommentFooter
          numReplyComments={replyComments?.length}
          onReply={() => {
            setEditorComment({replyId: comment.id});
            setEditorState('reply');
            setNewUsernameParent(comment.user.username);
          }}
          onShowReply={() => setIsShowReply(prev => !prev)}
          isShowReply={isShowReply}
          comment={comment}
        />
      </>
      {isShowReply && (
        <View className="mb-6 ml-3 border-l-2 border-slate-400">
          {isShowReply && replyComments?.length > 0 && (
            <CommentList comments={replyComments} post={post} />
          )}
        </View>
      )}
    </View>
  );
}

export default Comment;
