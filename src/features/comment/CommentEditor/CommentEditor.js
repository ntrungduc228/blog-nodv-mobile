// import { Collapse } from "@mui/material";
import {useState} from 'react';
import {View} from 'react-native';
import CommentEditorFooter from './CommentEditorFooter';
// import CommentEditorFooter from "./CommentEditorFooter";
// import CommentEditorHeader from "./CommentEditorHeader";
import CommentEditorInput from './CommentEditorInput';
import Feather from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
    <View className=" flex-row items-center justify-center w-full h-14 py-4 shadow-[0_2px_8px_rgba(0,0,0,0.12)] border-t border-slate-200 pr-2">
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
        disabled={inputValue.trim() === ''}
        onPress={handleSubmit}>
        <Feather
          name="send"
          size={24}
          solid="#A09898"
          color={inputValue.trim() === '' ? 'gray' : 'green'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CommentEditor;
{
  /* <Collapse orientation="vertical" in={isFocused}> */
}
{
  /* {
        <CommentEditorFooter
          onCancel={handleCancel}
          // onSubmit={handleSubmit}
          // 
          isEdit={isEdit}
        />
      } */
}
{
  /* </Collapse> */
}
