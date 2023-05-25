import {Toast} from 'react-native-toast-message/lib/src/Toast';

const {useMutation} = require('react-query');
const {deletePost} = require('../../../api/postApi');

export const useDeletePost = (option = {onSuccess: null, onError: null}) => {
  const {onSuccess = null, onError = null} = option;
  return useMutation(postId => deletePost(postId), {
    onSuccess: (data, variables) => {
      onSuccess && onSuccess(data, variables);
      Toast.show({
        type: 'success',
        text1: 'Delete post successfully',
        visibilityTime: 3000,
      });
    },
    onError: (error, variables) => {
      onError && onError(error, variables);
    },
  });
};
