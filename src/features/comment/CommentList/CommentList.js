import React from 'react';
import {View} from 'react-native';
import Comment from '../components/Comment/Comment';

function CommentList({comments, post}) {
  return (
    <View>
      {comments?.map(comment => (
        <Comment key={comment.id} comment={comment} post={post} />
      ))}
    </View>
  );
}

export default CommentList;
