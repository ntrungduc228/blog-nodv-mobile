import React from 'react';
import {useEffect} from 'react';
import {memo} from 'react';

const initialCmt = {
  id: 1,
  content: 'hello',
};

const cmtContext = React.createContext({
  editorState: 'create',
  setEditorContent: () => {},
  editorContent: initialCmt,
});

export const useCmt = () => React.useContext(cmtContext);
export const CommentScreen = () => {
  const [editorState, setEditorState] = React.useState('create');
  const [editorContent, setEditorContent] = React.useState(initialCmt);
  const isEdit = editorState === 'edit';
  const [newComment, setNewComment] = React.useState('');
  return (
    <cmtContext.Provider
      value={{
        editorState,
        setEditorState,
        editorContent,
        setEditorContent,
      }}>
      {[1, 2, 3].map((cmt, index) => {
        const isActiveEdit = isEdit && editorContent.id === index;

        return (
          <Comment
            isEdit={isActiveEdit}
            key={index}
            cmt={{
              id: index,
              content: index,
            }}
          />
        );
      })}

      <Editor />
    </cmtContext.Provider>
  );
};

const Comment = ({cmt, isEdit}) => {
  const {setEditorState, setEditorContent, newComment, setNewComment} =
    useCmt();
  const [showReply, setShowReply] = React.useState(false);
  const handleEdit = () => {
    setEditorState('edit');
    setEditorContent(cmt);
  };

  useEffect(() => {
    if (!newComment) return;
    if (newComment.parentId === cmt.id) {
      setShowReply(true);
      setNewComment(null);
    }
  }, [newComment]);

  return (
    <div className={isEdit ? 'bg-yellow-400' : ''}>
      <span>{cmt.content}</span>
      <div onClick={handleEdit}>edit</div>
    </div>
  );
};

const Editor = () => {
  const {editorState, editorContent} = useCmt();

  return <input value={editorContent.content} />;
};
