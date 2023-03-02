const {useMutation} = require('react-query');
const {deletePost} = require('../../../api/postApi');

export const useDeletePost = (option = {onSuccess: null, onError: null}) => {
  const {onSuccess = null, onError = null} = option;
  return useMutation(postId => deletePost(postId), {
    onSuccess: (data, variables) => {
      onSuccess && onSuccess(data, variables);
    },
    onError: (error, variables) => {
      onError && onError(error, variables);
    },
  });
};
