import {likePost} from '../../../api/postApi';
import {useMutation} from 'react-query';

export const useLikePost = (option = {onSuccess: null, onError: null}) => {
  const {onSuccess = null, onError = null} = option;
  return useMutation(postId => likePost(postId), {
    onSuccess: (data, variables) => {
      onSuccess && onSuccess(data, variables);
    },
    onError: (error, variables) => {
      onError && onError(error, variables);
    },
  });
};
