import {updatePostToBookmark} from '../../../api/bookmarkApi';
import {useMutation} from 'react-query';

export const useBookmarkPost = (
  options = {
    onSuccess: null,
    onError: null,
  },
) => {
  const {onSuccess = null, onError = null} = options;
  return useMutation(postId => updatePostToBookmark(postId), {
    onSuccess: (data, variables, context) => {
      onSuccess && onSuccess(data, variables, context);
    },
    onError: (error, variables, context) => {
      onError && onError(error, variables, context);
    },
  });
};
