import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useMutation, useQuery} from 'react-query';
import {useDispatch, useSelector} from 'react-redux';
import {createComment, getComment, updateCommentApi} from '../api/commentApi';
import {createNotification} from '../api/notificationApi';
import {updateCountNotifications} from '../api/userApi';
import {NotificationType} from '../config/dataType';
import CommentEditor from '../features/comment/CommentEditor/CommentEditor';
import CommentList from '../features/comment/CommentList/CommentList';
import {
  addComment,
  removeComment,
  setComments,
  updateComment,
} from '../redux/slices/commentSlice';
import {callApiCreateNotification} from '../utils/generationNotification';

const initialComment = {content: ''};
const commentContext = React.createContext({
  editorState: 'create',
  setEditorContent: () => {},
  editorContent: initialComment.content,
});
export const useComment = () => React.useContext(commentContext);
export function CommentScreen({route}) {
  const post = route.params?.post;
  const socket = useSelector(state => state.socket.data);
  const userId = useSelector(state => state.user?.data?.info?.id);

  const rootComments = useSelector(
    state => state.comment.commentsByParentId[null],
  );
  const dispatch = useDispatch();

  //new
  const editorStateType = useRef({
    CREATE: 'create',
    EDIT: 'edit',
    REPLY: 'reply',
  }).current;
  const [editorState, setEditorState] = React.useState(editorStateType.CREATE);
  const [editorComment, setEditorComment] = React.useState(initialComment);
  const isEdit = editorState === editorStateType.EDIT;
  const [newReplyComment, setNewReplyComment] = React.useState('');
  const [newUsernameParent, setNewUsernameParent] = React.useState('');

  useQuery(['comments', post?.id], () => getComment(post.id), {
    enabled: !!post?.id,
    onSuccess: data => {
      dispatch(setComments(data));
    },
  });
  const createNewComment = useMutation(createComment, {
    onSuccess: data => {
      // dispatch(addComment(data));
      let comment = {...data, postUserId: post.userId};
      callApiCreateNotification(
        comment,
        NotificationType.COMMENT,
        createNewNotificationComment,
        userId,
      );
    },
  });

  const updateUserIncreaseNumOfNotification = useMutation(
    updateCountNotifications,
  );

  const createNewNotificationComment = useMutation(createNotification, {
    onSuccess: data => {
      const increase = {isIncrease: true, userId: data.receiverId};
      updateUserIncreaseNumOfNotification.mutate(increase);
    },
  });
  const handleCreateComment = comment => {
    createNewComment.mutate(comment);
  };
  //edit comment
  const updateCommentById = useMutation(updateCommentApi, {
    onSuccess: data => {
      // dispatch(updateComment(data));
    },
  });
  const handleUpdateComment = comment => {
    updateCommentById.mutate(comment);

    //setIsOpenMenu(false);
  };

  //reply cmt
  const getCommentUserId = comment => {
    var parentComment = rootComments.find(
      commentParent => comment.replyId === commentParent.id,
    );
    return parentComment.userId;
  };
  const createNewReplyComment = useMutation(createComment, {
    onSuccess: data => {
      //  dispatch(addComment(data));
      setNewReplyComment(data);
      let comment = {...data, commentParentUserId: getCommentUserId(data)};
      callApiCreateNotification(
        comment,
        NotificationType.REPLYCOMMENT,
        createNewNotificationReplyComment,
        userId,
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
  const handleReplyComment = comment => {
    createNewReplyComment.mutate(comment);
  };

  //realtime
  const updateLocalListComment = updatedComment => {
    dispatch(addComment(updatedComment));
  };
  const handleReceiveCommentSocket = payload => {
    const comment = JSON.parse(payload.body);
    updateLocalListComment(comment);
  };
  const updateLocalComment = updatedComment => {
    dispatch(updateComment(updatedComment));
  };
  const handleReceiveUpdateCommentSocket = payload => {
    const comment = JSON.parse(payload.body);
    updateLocalComment(comment);
  };

  const handleDeleteCommentSocket = payload => {
    dispatch(removeComment(payload.body));
  };

  const updateLocalLikeComment = updatedComment => {
    dispatch(updateComment(updatedComment));
  };
  const handleUpdateLikeCommentSocket = payload => {
    const updatedComment = JSON.parse(payload.body);
    updateLocalLikeComment(updatedComment);
  };

  useEffect(() => {
    const topic = `/topic/posts/${post?.id}/comment`;
    const update = `/topic/posts/${post?.id}/updatecomment`;
    const deleteComment = `/topic/deletecomment`;
    const likeComment = `/topic/likecomment`;
    const unlikeComment = `/topic/unlikecomment`;

    if (socket) {
      socket.subscribe(topic, handleReceiveCommentSocket, {id: topic});
      socket.subscribe(update, handleReceiveUpdateCommentSocket, {
        id: update,
      });
      socket.subscribe(deleteComment, handleDeleteCommentSocket, {
        id: deleteComment,
      });
      socket.subscribe(likeComment, handleUpdateLikeCommentSocket, {
        id: likeComment,
      });
      socket.subscribe(unlikeComment, handleUpdateLikeCommentSocket, {
        id: unlikeComment,
      });
    }
    return () => {
      if (socket) {
        socket.unsubscribe(topic);
        socket.unsubscribe(update);
        socket.unsubscribe(deleteComment);
        socket.unsubscribe(likeComment);
        socket.unsubscribe(unlikeComment);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post?.id, socket]);
  const handleSubmit = comment => {
    switch (editorState) {
      case editorStateType.CREATE:
        handleCreateComment(comment);
        break;
      case editorStateType.EDIT:
        handleUpdateComment(comment);
        break;
      case editorStateType.REPLY:
        handleReplyComment(comment);
        break;
    }
    setEditorState(editorStateType.CREATE);
    setEditorComment(initialComment);
    setNewUsernameParent('');
  };
  return (
    <commentContext.Provider
      value={{
        editorState,
        setEditorState,
        editorComment,
        setEditorComment,
        newReplyComment,
        setNewReplyComment,
        setNewUsernameParent,
        newUsernameParent,
      }}>
      <View className="bg-white h-full">
        <ScrollView>
          <CommentList comments={rootComments} isEdit={isEdit} post={post} />
        </ScrollView>
        <CommentEditor
          initialComment={editorComment}
          onSubmit={handleSubmit}
          post={post}
        />
      </View>
    </commentContext.Provider>
  );
}
