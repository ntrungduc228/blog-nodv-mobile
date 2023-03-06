import {formatRelative} from 'date-fns';
import React, {useCallback, useMemo, useState} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Avatar} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Commenta from './Commenta';

function Comment({comment, userId}) {
  const [isReply, setIsReply] = useState(false);
  const [countLike, setCountLike] = useState(0);
  const handleShowReply = useCallback(() => {
    setIsReply(prev => !prev);
  }, []);
  const displayTime = useMemo(() => {
    return formatRelative(new Date(comment.createdDate), new Date());
  }, [comment.createdDate]);

  return (
    <View className="m-3 border-l border-slate-200">
      <View className="flex-row justify-between items-center">
        <View className="flex-row">
          <Avatar.Image
            size={44}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/blog-nodv.appspot.com/o/images%2F1666836545615avt.jpg?alt=media&token=f3715525-f6d8-42f5-a341-5f9b8d135978',
            }}
          />
          <View className="pl-3">
            <Text className="text-base text-black">
              {comment.user.username}
            </Text>
            <Text>{displayTime}</Text>
          </View>
        </View>
        <Entypo
          name="dots-three-vertical"
          size={20}
          color="black"
          className="relative"
        />
      </View>
      <View>
        <Text className="text-lg text-black my-6">{comment.content}</Text>
      </View>
      <View className="flex-row justify-between">
        <View className="flex-row justify-between">
          <TouchableOpacity
            className="flex-row"
            onPress={() => setCountLike(prev => ++prev)}>
            <MaterialCommunityIcons name="hand-clap" size={20} color="black" />
            <Text className="text-base pr-3">
              {' '}
              {comment?.userLikeIds ? comment.userLikeIds.length : 0}
            </Text>
          </TouchableOpacity>

          <Text className="pl-3 text-base" onPress={handleShowReply}>
            <FontAwesome name="comment-o" size={20} color="black" />{' '}
            {isReply ? `1 Reply` : `Hide Reply`}
          </Text>
        </View>
        <Text className="text-base" onPress={handleShowReply}>
          Reply
        </Text>
      </View>
      {/* <Commenta className="absolute bg-white border-2 border-black z-1" /> */}
    </View>
  );
}

export default Comment;
