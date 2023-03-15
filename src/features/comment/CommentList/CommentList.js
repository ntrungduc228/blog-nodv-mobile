import React from 'react';
import {View, Text} from 'react-native';
import Comment from '../components/Comment/Comment';
import {Spinner} from '../../../components';
import {useComment} from '../../../screens';

export function CommentList({comments, post, isEdit}) {
  const {editorComment} = useComment();
  console.log('object', comments);
  return (
    <View>
      {comments?.length ? (
        comments?.map(comment => {
          const isActiveEdit = isEdit && comment.id === editorComment?.id;
          console.log('ed', comment.id === editorComment?.id);
          console.log('cmt', comment.id);
          console.log('edi', editorComment?.id);
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
