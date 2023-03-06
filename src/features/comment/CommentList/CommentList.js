import React from 'react';
import {View} from 'react-native';
import Comment from '../components/Comment/Comment';
import {Spinner} from '../../../components';

export function CommentList({comments, post}) {
  return (
    <View>
      {comments?.length ? (
        comments?.map(comment => (
          <Comment key={comment.id} comment={comment} post={post} />
        ))
      ) : (
        <Spinner />
      )}
    </View>
  );
}

export default CommentList;
