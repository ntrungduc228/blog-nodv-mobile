// import { Collapse } from "@mui/material";

import {Text, View} from 'react-native';

import CommentEditorFooter from './CommentEditorFooter';
import CommentEditorInput from './CommentEditorInput';
import {useState} from 'react';

// import CommentEditorFooter from "./CommentEditorFooter";
// import CommentEditorHeader from "./CommentEditorHeader";

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
      {/* <Collapse orientation="vertical" in={isFocused && !hideHeader}>
        <CommentEditorHeader />
      </Collapse> */}
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
      {/* <Collapse orientation="vertical" in={isFocused}> */}
      {
        <CommentEditorFooter
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          disabled={inputValue.trim() === ''}
          isEdit={isEdit}
        />
      }
      {/* </Collapse> */}
    </View>
  );
};

export default CommentEditor;
