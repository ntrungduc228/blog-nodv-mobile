import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CommentEditorInput from './CommentEditorInput';
import Feather from 'react-native-vector-icons/Feather';
import {Text} from 'react-native-paper';
import {useComment} from '../../../screens';

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
  const [inputValue, setInputValue] = useState(
    initialComment?.content ? initialComment.content : '',
  );
  useEffect(() => {
    setInputValue(initialComment?.content ? initialComment.content : '');
  }, [initialComment]);

  const handleCancel = () => {
    setEditorState('create');
    setEditorComment({content: ''});
    setNewReplyComment(null);
    setNewUsernameParent('');
  };

  const handleSubmit = () => {
    const comment = {
      id: initialComment?.id,
      content: inputValue,
      replyId: initialComment?.replyId,
      postId: post?.id,
    };

    setInputValue('');
    onSubmit(comment);
  };
  return (
    <>
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

        <TouchableOpacity
          disabled={!!(inputValue.trim() === '')}
          onPress={handleSubmit}>
          <Feather
            name="send"
            size={24}
            solid="#A09898"
            color={!!(inputValue.trim() === '') ? 'gray' : 'green'}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CommentEditor;
