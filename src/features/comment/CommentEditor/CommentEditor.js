import * as ImagePicker from 'react-native-image-picker';

import {
  ActivityIndicator,
  Animated,
  Image,
  PanResponder,
  View,
} from 'react-native';
import {useCallback, useEffect, useState} from 'react';

import CommentEditorInput from './CommentEditorInput';
import Feather from 'react-native-vector-icons/Feather';
import {Text} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage';
import {useComment} from '../../../screens';

const options = {
  title: 'Select Image',
  type: 'library',
  options: {
    selectionLimit: 0,
    mediaType: 'photo',
    includeBase64: false,
  },
};

const CommentEditor = ({focus, post, initialComment = {}, onSubmit}) => {
  const {
    setEditorState,
    editorState,
    setEditorComment,
    setNewReplyComment,
    newUsernameParent,
    setNewUsernameParent,
  } = useComment();
  const [isFocused, setIsFocused] = useState(focus);
  const [image, setImage] = useState(initialComment?.image);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(
    initialComment?.content ? initialComment.content : '',
  );

  useEffect(() => {
    setInputValue(initialComment?.content ? initialComment.content : '');
    setImage(initialComment?.image);
  }, [initialComment]);

  const handleCancel = () => {
    setEditorState('create');
    setEditorComment({content: ''});
    setNewReplyComment(null);
    setNewUsernameParent('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    const comment = {
      id: initialComment?.id,
      content: inputValue,
      replyId: initialComment?.replyId,
      postId: post?.id,
    };
    if (image) {
      if (image === initialComment?.image) {
        return;
      }
      const url = await uploadImage(image);
      comment.image = url;
    } else {
      comment.image = null;
    }

    setInputValue('');
    setImage(null);
    onSubmit(comment);
    setLoading(false);
  };

  const handleUploadImage = useCallback(async () => {
    const res = await ImagePicker.launchImageLibrary(options);
    if (res.didCancel) {
      return;
    }

    setImage(res.assets[0].uri);
  }, []);

  const uploadImage = async imageUri => {
    if (!imageUri) {
      return null;
    }
    try {
      const reference = storage().ref(
        'images/' + new Date().getTime() + '.jpg',
      );
      const response = await fetch(imageUri);
      const blob = await response.blob();

      await reference.put(blob);
      const url = await reference.getDownloadURL();
      return url;
    } catch (error) {
      console.log(error);
    }
  };

  const [swipeAnimation] = useState(new Animated.Value(0));
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (event, gestureState) => {
      swipeAnimation.setValue(gestureState.dx);
    },
    onPanResponderRelease: (event, gestureState) => {
      if (gestureState.dx < -50) {
        // Swipe threshold reached, remove the image
        removeImage();
        swipeAnimation.setValue(0);
      } else {
        // Reset the swipe animation
        Animated.spring(swipeAnimation, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });
  const removeImage = () => {
    setImage(null);
  };

  return (
    <View className="relative">
      <View {...panResponder.panHandlers}>
        {image && (
          <Animated.View
            style={{
              transform: [{translateX: swipeAnimation}],
            }}
            className="bg-white  top-0 shadow w-20 h-20 mb-2 ml-2 left-0 rounded overflow-hidden">
            <Image className="w-20 h-20" source={{uri: image}} />
          </Animated.View>
        )}
      </View>

      {editorState !== 'create' && (
        <View className="flex-row justify-between items-center bg-slate-200 h-7 px-2">
          <Text>
            {editorState === 'edit'
              ? 'Edit comment'
              : `Replying to ${newUsernameParent}`}
          </Text>
          <TouchableOpacity onPress={handleCancel}>
            <Feather name="x" size={20} solid="#A09898" color="black" />
          </TouchableOpacity>
        </View>
      )}

      <View className="flex-row items-center justify-center w-full h-14 py-4 shadow-[0_2px_8px_rgba(0,0,0,0.12)] border-t border-slate-200 pr-2">
        <View className="flex-1">
          <CommentEditorInput
            value={inputValue}
            isFocused={isFocused}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={e => {
              setInputValue(prev => ({...prev, e}.e));
            }}
          />
        </View>

        <TouchableOpacity className="mr-4" onPress={handleUploadImage}>
          <Feather name="image" size={24} solid="#A09898" color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={
            inputValue.trim() === '' && !image && editorState !== 'edit'
          }
          onPress={handleSubmit}>
          {loading ? (
            <ActivityIndicator color="green" />
          ) : (
            <Feather
              name="send"
              size={24}
              solid="#A09898"
              color={inputValue.trim() === '' ? 'gray' : 'green'}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentEditor;
