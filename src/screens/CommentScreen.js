import React from 'react';
import {View} from 'react-native';
import Comment from '../features/comment/components/Comment/Comment';

export function CommentScreen() {
  const userId = 1;
  const comments = [
    {
      id: '1',
      content: ' Hay quá dị trời ơi là trời đỉnh thiệt chứ',
      user: {username: 'Đức Nguyễn'},
      userLikeIds: [1, 2],
      createdDate: '2022-12-28T14:19:44.663+00:00',
    },
    {
      id: '2',
      content: ' Hay quá dị trời ơi là trời đỉnh thiệt chứ',
      user: {username: 'Đức Nguyễnn'},
      userLikeIds: [1, 2],
      createdDate: '2022-12-28T14:19:44.663+00:00',
    },
    {
      id: '3',
      content: ' Hay quá dị trời ơi là trời đỉnh thiệt chứ',
      user: {username: 'Đức Nguyễnnn'},
      userLikeIds: [1, 2],
      createdDate: '2022-12-28T14:19:44.663+00:00',
    },
  ];
  return (
    <View className="bg-white h-screen">
      {comments.map(comment => (
        <Comment key={comment.id} comment={comment} userId={userId} />
      ))}
    </View>
  );
}
