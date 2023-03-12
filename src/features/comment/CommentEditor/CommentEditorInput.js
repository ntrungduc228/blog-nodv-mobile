import React, {useEffect, useRef} from 'react';
import {Text, View} from 'react-native';
import {TextInput} from 'react-native-paper';

const CommentEditorInput = ({isFocused, onChange, value, onFocus, onBlur}) => {
  const inputRef = useRef();
  useEffect(() => {
    if (inputRef?.current) {
      if (isFocused) inputRef.current.rows = 4;
      else {
        inputRef.current.rows = 1;
        inputRef.current.value = '';
      }
    }
  }, [isFocused, inputRef]);
  return (
    <TextInput
      onFocus={onFocus}
      onBlur={onBlur}
      className="bg-white border-b-1 h-11 mt-5"
      activeUnderlineColor="#000"
      ref={inputRef}
      value={value}
      onChangeText={onChange}
      placeholder="What are you thoughts?"
    />
  );
};

export default CommentEditorInput;
