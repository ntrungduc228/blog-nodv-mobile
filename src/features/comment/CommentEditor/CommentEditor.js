import {useEffect, useState} from 'react';
import {View} from 'react-native';
import CommentEditorFooter from './CommentEditorFooter';
import CommentEditorInput from './CommentEditorInput';

const CommentEditor = ({
  focus,
  isEdit,
  hideHeader,
  post,
  initialComment = {},
  onCancel = () => {},
  onSubmit,
}) => {
  const [isFocused, setIsFocused] = useState(focus);
  const [inputValue, setInputValue] = useState(
    initialComment?.content ? initialComment.content : '',
  );
  useEffect(() => {
    setInputValue(initialComment?.content ? initialComment.content : '');
  }, [initialComment]);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleCancel = () => {
    setIsFocused(false);
    onCancel();
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
    <View className="mx-6 rounded py-4 shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
      <View onClick={handleFocus}>
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
      {
        <CommentEditorFooter
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          disabled={inputValue.trim() === ''}
          isEdit={isEdit}
        />
      }
    </View>
  );
};

export default CommentEditor;
