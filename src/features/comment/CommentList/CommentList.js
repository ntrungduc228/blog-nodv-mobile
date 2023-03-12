import React from 'react';
import {View, Text} from 'react-native';
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
        // <Spinner />
        <View className="flex-1 items-center justify-center">
          <Text className="mt-4 text-black font-bold text-lg">
            No Comment yet!
          </Text>
        </View>
      )}
    </View>
  );
}

export default CommentList;
