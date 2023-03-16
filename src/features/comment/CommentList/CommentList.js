import React from 'react';
import {Text, View} from 'react-native';
import {useComment} from '../../../screens';
import Comment from '../components/Comment/Comment';

export function CommentList({comments, post, isEdit}) {
  const {editorComment} = useComment();
  return (
    <View>
      {comments?.length ? (
        comments?.map(comment => {
          const isActiveEdit = isEdit && comment.id === editorComment?.id;
          return (
            <Comment
              key={comment.id}
              comment={comment}
              post={post}
              isActiveEdit={isActiveEdit}
            />
          );
        })
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
