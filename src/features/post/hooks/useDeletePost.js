import Toast from 'react-native-toast-message';

const {useMutation} = require('react-query');
const {deletePost} = require('../../../api/postApi');

export const useDeletePost = (option = {onSuccess: null, onError: null}) => {
  const {onSuccess = null, onError = null} = option;
  return useMutation(postId => deletePost(postId), {
    onSuccess: (data, variables) => {
      Toast.show({
        type: 'success',
        text1: 'Deleted post',
        visibilityTime: 5000,
        position: 'bottom',
        bottomOffset: 70,
      });
      onSuccess && onSuccess(data, variables);
    },
    onError: (error, variables) => {
      onError && onError(error, variables);
    },
  });
};
