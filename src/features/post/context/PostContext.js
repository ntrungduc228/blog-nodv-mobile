import {createContext, useContext} from 'react';
import {
  deletePost,
  hidePost,
  publishPost,
  unHidePost,
  unPublishPost,
} from '../../../api/postApi';
import {useDispatch, useSelector} from 'react-redux';

import {updatePostToBookmark} from '../../../api/bookmarkApi';
import {updateUser} from '../../../redux/slices/userSlice';
import {useMemo} from 'react';
import {useMutation} from 'react-query';

const PostContext = createContext({
  post: {},
  deletePost: () => {},
  publishPost: () => {},
  unPublishPost: () => {},
  updateBookmark: () => {},
  hidePost: () => {},
  unHidePost: () => {},
});

export default PostContext;

export const usePost = () => {
  return useContext(PostContext);
};

export const PostProvider = ({
  post = {},
  onDeletePost = () => {},
  onUpdatePost = () => {},
  onUpdateBookmark,
  onUpdatePublish,
  children,
}) => {
  const dispatch = useDispatch();
  const bookmarkIds = useSelector(
    state => state?.user?.data?.info?.bookmarkIds || [],
  );

  const currentUserId = useSelector(state => state?.user?.data?.info?.id);
  const isBookmarked = useMemo(() => {
    return bookmarkIds.includes(post.id);
  }, [bookmarkIds, post.id]);

  const isAuthor = useMemo(() => {
    return post?.user?.id === currentUserId;
  }, [currentUserId, post?.user?.id]);

  const deletePostMutation = useMutation(deletePost, {
    onSuccess: () => {
      onDeletePost(post);
    },
  });

  const publishPostMutation = useMutation(publishPost, {
    onSuccess: () => {
      onUpdatePost({...post, isPublish: true});
      onUpdatePublish && onUpdatePublish(post);
    },
  });

  const unPublishPostMutation = useMutation(unPublishPost, {
    onSuccess: () => {
      onUpdatePost({...post, isPublish: false});
      onUpdatePublish && onUpdatePublish(post);
    },
  });

  const updateBookmarkMutation = useMutation(updatePostToBookmark);
  const hidePostMutation = useMutation(hidePost);
  const unHidePostMutation = useMutation(unHidePost);

  return (
    <>
      <PostContext.Provider
        value={{
          post: {...post, isBookmarked, isAuthor},
          deletePost: () => deletePostMutation.mutate(post.id),
          publishPost: () => publishPostMutation.mutate(post.id),
          unPublishPost: () => unPublishPostMutation.mutate(post.id),
          updateBookmark: () => {
            onUpdateBookmark && onUpdateBookmark(post);
            let newBookmarkIds = [...bookmarkIds];
            if (isBookmarked) {
              newBookmarkIds = newBookmarkIds.filter(id => id !== post.id);
            } else {
              newBookmarkIds.push(post.id);
            }
            dispatch(updateUser({bookmarkIds: newBookmarkIds}));
            updateBookmarkMutation.mutate(post.id);
          },
          hidePost: () => {
            hidePostMutation.mutate(post.id);
            onUpdatePost({
              ...post,
              isHide: true,
            });
          },
          unHidePost: () => {
            unHidePostMutation.mutate(post.id);
            onUpdatePost({
              ...post,
              isHide: false,
            });
          },
        }}>
        {children}
      </PostContext.Provider>
    </>
  );
};
